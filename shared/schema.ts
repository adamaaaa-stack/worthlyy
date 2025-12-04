import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  isPro: boolean("is_pro").default(false),
  monthlyValuations: integer("monthly_valuations").default(0),
  lastValuationReset: timestamp("last_valuation_reset").defaultNow(),
});

export const valuations = pgTable("valuations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  sessionId: varchar("session_id").notNull(),
  deviceModel: text("device_model").notNull(),
  deviceCategory: text("device_category").notNull(),
  conditionScore: integer("condition_score"),
  conditionDetails: jsonb("condition_details"),
  estimateMin: decimal("estimate_min", { precision: 10, scale: 2 }),
  estimateMax: decimal("estimate_max", { precision: 10, scale: 2 }),
  estimateMedian: decimal("estimate_median", { precision: 10, scale: 2 }),
  estimateAverage: decimal("estimate_average", { precision: 10, scale: 2 }),
  listingsAnalyzed: integer("listings_analyzed"),
  comparableListings: jsonb("comparable_listings"),
  priceDistribution: jsonb("price_distribution"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const uploadedImages = pgTable("uploaded_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  valuationId: varchar("valuation_id").notNull(),
  imageUrl: text("image_url").notNull(),
  analysisResult: jsonb("analysis_result"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usageLogs = pgTable("usage_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertValuationSchema = createInsertSchema(valuations).omit({
  id: true,
  createdAt: true,
});

export const insertUploadedImageSchema = createInsertSchema(uploadedImages).omit({
  id: true,
  createdAt: true,
});

export const insertUsageLogSchema = createInsertSchema(usageLogs).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertValuation = z.infer<typeof insertValuationSchema>;
export type Valuation = typeof valuations.$inferSelect;

export type InsertUploadedImage = z.infer<typeof insertUploadedImageSchema>;
export type UploadedImage = typeof uploadedImages.$inferSelect;

export type InsertUsageLog = z.infer<typeof insertUsageLogSchema>;
export type UsageLog = typeof usageLogs.$inferSelect;

export const conditionDetailsSchema = z.object({
  scratches: z.string().optional(),
  dents: z.string().optional(),
  cracks: z.string().optional(),
  screenCondition: z.string().optional(),
  bodyCondition: z.string().optional(),
  wearLevel: z.string().optional(),
  color: z.string().optional(),
  overallAssessment: z.string().optional(),
});

export type ConditionDetails = z.infer<typeof conditionDetailsSchema>;

export const comparableListingSchema = z.object({
  title: z.string(),
  price: z.number(),
  condition: z.string(),
  url: z.string().optional(),
});

export type ComparableListing = z.infer<typeof comparableListingSchema>;

export const priceDistributionSchema = z.object({
  ranges: z.array(z.object({
    min: z.number(),
    max: z.number(),
    count: z.number(),
  })),
});

export type PriceDistribution = z.infer<typeof priceDistributionSchema>;

export const deviceCategories = [
  "smartphone",
  "laptop",
  "tablet",
  "gaming-console",
  "smartwatch",
  "camera",
  "audio",
  "other",
] as const;

export type DeviceCategory = typeof deviceCategories[number];
