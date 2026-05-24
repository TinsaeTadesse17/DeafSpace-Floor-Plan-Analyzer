import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "@/types/analysis";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SYSTEM_INSTRUCTION = `You are an expert architectural analyst specializing in DeafSpace design principles and sensory-inclusive architecture.

DeafSpace is a design framework developed at Gallaudet University that prioritizes the spatial, visual, and tactile needs of Deaf individuals. It emphasizes:
- Clear sightlines for visual communication and sign language
- Wide corridors (minimum 1.8m) allowing side-by-side walking while signing
- Curved or open spatial configurations instead of sharp blind corners
- Soft diffuse lighting without glare that obscures facial expressions
- Transparent or glass elements for visual connectivity between spaces
- Round or horseshoe seating arrangements for group communication
- Visual alert systems instead of audio-only emergency systems
- Acoustic separation to minimize echo and background noise for hearing aid users
- Gathering spaces with 360-degree visibility
- Tactile and visual wayfinding cues

You analyze architectural floor plans and evaluate them against 10 DeafSpace parameters. You ALWAYS return valid JSON only. No markdown, no extra text — just the raw JSON object.`;

const ANALYSIS_PROMPT = `Analyze this floor plan image for DeafSpace and sensory-inclusive design compliance.

Evaluate exactly these 10 parameters in this exact order:

1. Visual Connectivity & Sightlines — Can users see across key spaces? Are there long clear sightlines for visual communication?
2. Corridor Width & Signing Clearance — Are corridors wide enough (min 1.8m) for two people to walk and sign simultaneously?
3. Blind Corner Risk — Are there sharp corners or hidden intersections that could cause surprise collisions?
4. Seating Arrangement Quality — Are seating layouts round or horseshoe shaped for group communication, or problematic linear rows?
5. Transparency & Visual Openness — Is glass or open-plan used to create visual connections between spaces?
6. Lighting Design for Visual Communication — Is the layout configured for diffuse even lighting without backlighting speakers or signers?
7. Gathering Space Quality — Are there dedicated communal spaces with good visibility and communication-friendly layouts?
8. Emergency Visual Accessibility — Are there positions in the plan suited for visual alert systems such as strobes and visual paging?
9. Wayfinding & Spatial Legibility — Is the space easy to navigate visually? Are there clear visual landmarks and intuitive paths?
10. Acoustic Comfort Zones — Are noisy and quiet functions separated in the plan to reduce background noise for hearing device users?

Return ONLY this exact JSON structure with no other text before or after it:

{
  "building_summary": "2-3 sentence description of what kind of building this appears to be and its general spatial organization",
  "overall_score": <number 1-10>,
  "parameters": [
    {
      "id": "visual_connectivity",
      "name": "Visual Connectivity & Sightlines",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "What you specifically observed in this floor plan about this parameter",
      "recommendation": "Specific actionable change to improve or maintain this aspect",
      "priority": "<high|medium|low>"
    },
    {
      "id": "corridor_width",
      "name": "Corridor Width & Signing Clearance",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "blind_corners",
      "name": "Blind Corner Risk",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "seating_arrangement",
      "name": "Seating Arrangement Quality",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "transparency",
      "name": "Transparency & Visual Openness",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "lighting_design",
      "name": "Lighting Design for Visual Communication",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "gathering_spaces",
      "name": "Gathering Space Quality",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "emergency_access",
      "name": "Emergency Visual Accessibility",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "wayfinding",
      "name": "Wayfinding & Spatial Legibility",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    },
    {
      "id": "acoustic_zones",
      "name": "Acoustic Comfort Zones",
      "score": "<excellent|good|needs_improvement|critical>",
      "score_value": <1-10>,
      "observation": "...",
      "recommendation": "...",
      "priority": "<high|medium|low>"
    }
  ],
  "top_priority_fix": "The single most important change this architect should make for Deaf user accessibility"
}

If the image is unclear or not a floor plan, still return the JSON but note the limitation in building_summary and give score_value of 5 with honest observations.`;

export async function analyzeFloorPlan(
  imageBase64: string,
  mimeType: string
): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64,
            },
          },
          {
            text: ANALYSIS_PROMPT,
          },
        ],
      },
    ],
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const result: AnalysisResult = JSON.parse(cleaned);
  result.analyzed_at = new Date().toISOString();

  if (!result.parameters || result.parameters.length !== 10) {
    throw new Error("Incomplete analysis returned — please try again");
  }

  return result;
}
