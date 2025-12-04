import type { MarketAnalysisResult } from "./scraperClient";
import type { DeviceAnalysisResult } from "./geminiClient";

export interface ValuationResult {
  estimateMin: number;
  estimateMax: number;
  estimateMedian: number;
  estimateAverage: number;
}

export function calculateValuation(
  marketData: MarketAnalysisResult,
  conditionData: DeviceAnalysisResult
): ValuationResult {
  const { priceStats } = marketData;
  const { conditionScore } = conditionData;

  const conditionMultiplier = getConditionMultiplier(conditionScore);

  const adjustedMedian = Math.round(priceStats.median * conditionMultiplier);
  const adjustedAverage = Math.round(priceStats.average * conditionMultiplier);
  
  const priceVariance = (priceStats.max - priceStats.min) / priceStats.median;
  const rangeBuffer = Math.max(0.1, Math.min(0.25, priceVariance * 0.5));
  
  const adjustedMin = Math.round(adjustedMedian * (1 - rangeBuffer));
  const adjustedMax = Math.round(adjustedMedian * (1 + rangeBuffer));

  return {
    estimateMin: adjustedMin,
    estimateMax: adjustedMax,
    estimateMedian: adjustedMedian,
    estimateAverage: adjustedAverage,
  };
}

function getConditionMultiplier(conditionScore: number): number {
  if (conditionScore >= 95) return 1.1;
  if (conditionScore >= 90) return 1.05;
  if (conditionScore >= 80) return 1.0;
  if (conditionScore >= 70) return 0.92;
  if (conditionScore >= 60) return 0.85;
  if (conditionScore >= 50) return 0.78;
  if (conditionScore >= 40) return 0.70;
  if (conditionScore >= 30) return 0.60;
  return 0.50;
}
