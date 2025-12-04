import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeDeviceImages } from "./geminiClient";
import { scrapeEbayListings } from "./scraperClient";
import { calculateValuation } from "./priceEngine";
import { objectStorageService, ObjectNotFoundError } from "./objectStorage";
import multer from "multer";
import { randomUUID } from "crypto";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

function getSessionId(req: Request): string {
  if (!req.session) {
    (req as any).session = {};
  }
  if (!(req.session as any).id) {
    (req.session as any).id = randomUUID();
  }
  return (req.session as any).id;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error getting object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.post("/api/valuations", upload.array("images", 6), async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const { deviceModel, deviceCategory } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!deviceModel || !deviceCategory) {
        return res.status(400).json({ message: "Device model and category are required" });
      }

      if (!files || files.length < 4) {
        return res.status(400).json({ message: "At least 4 images are required" });
      }

      const valuation = await storage.createValuation({
        sessionId,
        deviceModel,
        deviceCategory,
        status: "processing",
      });

      const imageUrls: string[] = [];
      for (const file of files) {
        try {
          const imageUrl = await objectStorageService.uploadBuffer(
            file.buffer,
            file.originalname,
            file.mimetype
          );
          imageUrls.push(imageUrl);
          await storage.createUploadedImage({
            valuationId: valuation.id,
            imageUrl,
          });
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
        }
      }

      await storage.createUsageLog({
        sessionId,
        action: "valuation_started",
        details: { valuationId: valuation.id, deviceModel, deviceCategory },
      });

      processValuation(valuation.id, files, deviceModel, deviceCategory);

      res.json({ id: valuation.id, status: "processing" });
    } catch (error) {
      console.error("Create valuation error:", error);
      res.status(500).json({ message: "Failed to create valuation" });
    }
  });

  app.get("/api/valuations", async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const valuations = await storage.getValuationsBySession(sessionId);
      res.json(valuations);
    } catch (error) {
      console.error("Get valuations error:", error);
      res.status(500).json({ message: "Failed to get valuations" });
    }
  });

  app.get("/api/valuations/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const valuation = await storage.getValuation(id);
      
      if (!valuation) {
        return res.status(404).json({ message: "Valuation not found" });
      }

      res.json(valuation);
    } catch (error) {
      console.error("Get valuation error:", error);
      res.status(500).json({ message: "Failed to get valuation" });
    }
  });

  app.get("/api/usage/stats", async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const stats = await storage.getUsageStats(sessionId);
      res.json(stats);
    } catch (error) {
      console.error("Get usage stats error:", error);
      res.status(500).json({ message: "Failed to get usage stats" });
    }
  });

  app.post("/api/scrape", async (req: Request, res: Response) => {
    try {
      const { deviceModel, deviceCategory } = req.body;
      
      if (!deviceModel) {
        return res.status(400).json({ message: "Device model is required" });
      }

      const marketData = await scrapeEbayListings(deviceModel, deviceCategory || "");
      res.json(marketData);
    } catch (error) {
      console.error("Scrape error:", error);
      res.status(500).json({ message: "Failed to scrape market data" });
    }
  });

  app.post("/api/estimate", upload.array("images", 6), async (req: Request, res: Response) => {
    try {
      const { deviceModel } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!deviceModel) {
        return res.status(400).json({ message: "Device model is required" });
      }

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
      }

      const imageBuffers = files.map(f => f.buffer);
      const analysisResult = await analyzeDeviceImages(imageBuffers, deviceModel);
      
      res.json(analysisResult);
    } catch (error) {
      console.error("Estimate error:", error);
      res.status(500).json({ message: "Failed to estimate condition" });
    }
  });

  return httpServer;
}

async function processValuation(
  valuationId: string,
  files: Express.Multer.File[],
  deviceModel: string,
  deviceCategory: string
) {
  try {
    const imageBuffers = files.map(f => f.buffer);
    
    const [conditionResult, marketResult] = await Promise.all([
      analyzeDeviceImages(imageBuffers, deviceModel),
      scrapeEbayListings(deviceModel, deviceCategory),
    ]);

    const valuationResult = calculateValuation(marketResult, conditionResult);

    await storage.updateValuation(valuationId, {
      status: "completed",
      conditionScore: conditionResult.conditionScore,
      conditionDetails: conditionResult.conditionDetails,
      estimateMin: valuationResult.estimateMin.toString(),
      estimateMax: valuationResult.estimateMax.toString(),
      estimateMedian: valuationResult.estimateMedian.toString(),
      estimateAverage: valuationResult.estimateAverage.toString(),
      listingsAnalyzed: marketResult.listingsAnalyzed,
      comparableListings: marketResult.listings,
      priceDistribution: marketResult.priceDistribution,
    });

  } catch (error) {
    console.error("Process valuation error:", error);
    await storage.updateValuation(valuationId, {
      status: "failed",
    });
  }
}
