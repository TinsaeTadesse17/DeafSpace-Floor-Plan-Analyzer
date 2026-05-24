export type ScoreLevel = "excellent" | "good" | "needs_improvement" | "critical";

export interface Parameter {
  id: string;
  name: string;
  score: ScoreLevel;
  score_value: number; // 1–10
  observation: string; // What the AI saw in the floor plan
  recommendation: string; // What to fix or maintain
  priority: "high" | "medium" | "low";
}

export interface AnalysisResult {
  building_summary: string; // 2–3 sentence overview
  overall_score: number; // Average 1–10
  parameters: Parameter[]; // Always 10 items
  top_priority_fix: string; // Single most important change
  analyzed_at: string; // ISO timestamp
}
