import { GoogleGenAI } from "@google/genai";
import type { ConditionDetails } from "@shared/schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface DeviceAnalysisResult {
  conditionScore: number;
  conditionDetails: ConditionDetails;
  detectedModel?: string;
}

export async function analyzeDeviceImages(
  imageBuffers: Buffer[],
  deviceModel: string
): Promise<DeviceAnalysisResult> {
  const parts: any[] = [];

  for (const buffer of imageBuffers) {
    parts.push({
      inlineData: {
        data: buffer.toString("base64"),
        mimeType: "image/jpeg",
      },
    });
  }

  parts.push({
    text: `You are an expert device appraiser analyzing photos of a ${deviceModel}. 
Carefully examine all provided images and provide a detailed condition assessment.

IMPORTANT: Look closely at each image. Look for:
- Any visible scratches on the screen or body
- Dents, dings, or deformations in the frame/body  
- Cracks in the screen or back glass
- Signs of wear like fading, discoloration, or worn edges
- Overall cleanliness and cosmetic condition

Analyze the following aspects based on what you ACTUALLY SEE in the images:
1. **Scratches**: Rate as "none", "minor", "moderate", or "heavy"
2. **Dents**: Rate as "none", "minor", "moderate", or "heavy"
3. **Cracks**: Rate as "none", "hairline", "visible", or "severe"
4. **Screen Condition**: Rate as "perfect", "minor scratches", "visible damage", or "cracked"
5. **Body Condition**: Rate as "excellent", "good", "fair", or "poor"
6. **Wear Level**: Rate as "like new", "light wear", "moderate wear", or "heavy wear"
7. **Color**: Identify the device color if visible

Based on your visual analysis, provide:
- An overall condition score from 0-100 (100 being perfect/new condition)
- A brief overall assessment summary describing what you observed

Be specific about any damage or wear you see. If the device looks pristine, score it high (90+). If it has visible damage, score appropriately lower.

Respond with JSON in this exact format:
{
  "conditionScore": <number 0-100>,
  "scratches": "<none|minor|moderate|heavy>",
  "dents": "<none|minor|moderate|heavy>",
  "cracks": "<none|hairline|visible|severe>",
  "screenCondition": "<perfect|minor scratches|visible damage|cracked>",
  "bodyCondition": "<excellent|good|fair|poor>",
  "wearLevel": "<like new|light wear|moderate wear|heavy wear>",
  "color": "<detected color>",
  "overallAssessment": "<brief 1-2 sentence summary describing what you observed in the images>"
}`
  });

  const contents = [
    {
      role: "user",
      parts: parts,
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: contents,
    });

    const rawJson = response.text;
    
    console.log("Gemini raw response:", rawJson);
    
    if (!rawJson) {
      throw new Error("Empty response from Gemini");
    }

    const cleanedJson = rawJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedJson);
    
    console.log("Parsed condition score:", parsed.conditionScore);
    
    return {
      conditionScore: Math.max(0, Math.min(100, parsed.conditionScore || 50)),
      conditionDetails: {
        scratches: parsed.scratches || "unknown",
        dents: parsed.dents || "unknown",
        cracks: parsed.cracks || "unknown",
        screenCondition: parsed.screenCondition || "unknown",
        bodyCondition: parsed.bodyCondition || "unknown",
        wearLevel: parsed.wearLevel || "unknown",
        color: parsed.color || "unknown",
        overallAssessment: parsed.overallAssessment || "Condition analysis completed.",
      },
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      conditionScore: 70,
      conditionDetails: {
        scratches: "minor",
        dents: "none",
        cracks: "none",
        screenCondition: "minor scratches",
        bodyCondition: "good",
        wearLevel: "light wear",
        overallAssessment: "Unable to perform detailed analysis. Default condition applied.",
      },
    };
  }
}
