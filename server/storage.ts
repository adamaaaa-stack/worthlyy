import { 
  type User, 
  type InsertUser, 
  type Valuation, 
  type InsertValuation,
  type UploadedImage,
  type InsertUploadedImage,
  type UsageLog,
  type InsertUsageLog,
  users,
  valuations,
  uploadedImages,
  usageLogs
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createValuation(valuation: InsertValuation): Promise<Valuation>;
  getValuation(id: string): Promise<Valuation | undefined>;
  getValuationsBySession(sessionId: string): Promise<Valuation[]>;
  updateValuation(id: string, updates: Partial<Valuation>): Promise<Valuation | undefined>;
  
  createUploadedImage(image: InsertUploadedImage): Promise<UploadedImage>;
  getImagesByValuation(valuationId: string): Promise<UploadedImage[]>;
  
  createUsageLog(log: InsertUsageLog): Promise<UsageLog>;
  getMonthlyUsage(sessionId: string): Promise<number>;
  getUsageStats(sessionId: string): Promise<{
    totalValuations: number;
    monthlyUsage: number;
    averageValue: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createValuation(valuation: InsertValuation): Promise<Valuation> {
    const [created] = await db.insert(valuations).values(valuation).returning();
    return created;
  }

  async getValuation(id: string): Promise<Valuation | undefined> {
    const [valuation] = await db.select().from(valuations).where(eq(valuations.id, id));
    return valuation;
  }

  async getValuationsBySession(sessionId: string): Promise<Valuation[]> {
    return db.select()
      .from(valuations)
      .where(eq(valuations.sessionId, sessionId))
      .orderBy(desc(valuations.createdAt));
  }

  async updateValuation(id: string, updates: Partial<Valuation>): Promise<Valuation | undefined> {
    const [updated] = await db
      .update(valuations)
      .set(updates)
      .where(eq(valuations.id, id))
      .returning();
    return updated;
  }

  async createUploadedImage(image: InsertUploadedImage): Promise<UploadedImage> {
    const [created] = await db.insert(uploadedImages).values(image).returning();
    return created;
  }

  async getImagesByValuation(valuationId: string): Promise<UploadedImage[]> {
    return db.select().from(uploadedImages).where(eq(uploadedImages.valuationId, valuationId));
  }

  async createUsageLog(log: InsertUsageLog): Promise<UsageLog> {
    const [created] = await db.insert(usageLogs).values(log).returning();
    return created;
  }

  async getMonthlyUsage(sessionId: string): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(valuations)
      .where(
        and(
          eq(valuations.sessionId, sessionId),
          gte(valuations.createdAt, startOfMonth)
        )
      );
    
    return Number(result[0]?.count || 0);
  }

  async getUsageStats(sessionId: string): Promise<{
    totalValuations: number;
    monthlyUsage: number;
    averageValue: number;
  }> {
    const allValuations = await this.getValuationsBySession(sessionId);
    const monthlyUsage = await this.getMonthlyUsage(sessionId);
    
    const completedValuations = allValuations.filter(v => 
      v.status === "completed" && v.estimateMedian
    );
    
    const totalValue = completedValuations.reduce((sum, v) => {
      return sum + parseFloat(v.estimateMedian?.toString() || "0");
    }, 0);
    
    const averageValue = completedValuations.length > 0 
      ? totalValue / completedValuations.length 
      : 0;

    return {
      totalValuations: allValuations.length,
      monthlyUsage,
      averageValue,
    };
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private valuationsMap: Map<string, Valuation>;
  private imagesMap: Map<string, UploadedImage>;
  private logsMap: Map<string, UsageLog>;

  constructor() {
    this.users = new Map();
    this.valuationsMap = new Map();
    this.imagesMap = new Map();
    this.logsMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      isPro: false,
      monthlyValuations: 0,
      lastValuationReset: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createValuation(valuation: InsertValuation): Promise<Valuation> {
    const id = randomUUID();
    const created: Valuation = {
      id,
      userId: valuation.userId || null,
      sessionId: valuation.sessionId,
      deviceModel: valuation.deviceModel,
      deviceCategory: valuation.deviceCategory,
      conditionScore: valuation.conditionScore || null,
      conditionDetails: valuation.conditionDetails || null,
      estimateMin: valuation.estimateMin || null,
      estimateMax: valuation.estimateMax || null,
      estimateMedian: valuation.estimateMedian || null,
      estimateAverage: valuation.estimateAverage || null,
      listingsAnalyzed: valuation.listingsAnalyzed || null,
      comparableListings: valuation.comparableListings || null,
      priceDistribution: valuation.priceDistribution || null,
      status: valuation.status || "pending",
      createdAt: new Date(),
    };
    this.valuationsMap.set(id, created);
    return created;
  }

  async getValuation(id: string): Promise<Valuation | undefined> {
    return this.valuationsMap.get(id);
  }

  async getValuationsBySession(sessionId: string): Promise<Valuation[]> {
    return Array.from(this.valuationsMap.values())
      .filter(v => v.sessionId === sessionId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async updateValuation(id: string, updates: Partial<Valuation>): Promise<Valuation | undefined> {
    const existing = this.valuationsMap.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.valuationsMap.set(id, updated);
    return updated;
  }

  async createUploadedImage(image: InsertUploadedImage): Promise<UploadedImage> {
    const id = randomUUID();
    const created: UploadedImage = {
      id,
      valuationId: image.valuationId,
      imageUrl: image.imageUrl,
      analysisResult: image.analysisResult || null,
      createdAt: new Date(),
    };
    this.imagesMap.set(id, created);
    return created;
  }

  async getImagesByValuation(valuationId: string): Promise<UploadedImage[]> {
    return Array.from(this.imagesMap.values())
      .filter(img => img.valuationId === valuationId);
  }

  async createUsageLog(log: InsertUsageLog): Promise<UsageLog> {
    const id = randomUUID();
    const created: UsageLog = {
      id,
      sessionId: log.sessionId,
      userId: log.userId || null,
      action: log.action,
      details: log.details || null,
      createdAt: new Date(),
    };
    this.logsMap.set(id, created);
    return created;
  }

  async getMonthlyUsage(sessionId: string): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return Array.from(this.valuationsMap.values())
      .filter(v => 
        v.sessionId === sessionId && 
        v.createdAt && 
        new Date(v.createdAt) >= startOfMonth
      ).length;
  }

  async getUsageStats(sessionId: string): Promise<{
    totalValuations: number;
    monthlyUsage: number;
    averageValue: number;
  }> {
    const allValuations = await this.getValuationsBySession(sessionId);
    const monthlyUsage = await this.getMonthlyUsage(sessionId);
    
    const completedValuations = allValuations.filter(v => 
      v.status === "completed" && v.estimateMedian
    );
    
    const totalValue = completedValuations.reduce((sum, v) => {
      return sum + parseFloat(v.estimateMedian?.toString() || "0");
    }, 0);
    
    const averageValue = completedValuations.length > 0 
      ? totalValue / completedValuations.length 
      : 0;

    return {
      totalValuations: allValuations.length,
      monthlyUsage,
      averageValue,
    };
  }
}

export const storage = new DatabaseStorage();
