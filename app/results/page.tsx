"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalysisResult } from "@/types/analysis";
import ParameterGrid from "@/components/ParameterGrid";
import Logo from "@/components/Logo";

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (!stored) {
      router.push("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, [router]);

  if (!result) return null;

  const scoreColor =
    result.overall_score >= 8
      ? "text-emerald-400"
      : result.overall_score >= 6
        ? "text-teal-400"
        : result.overall_score >= 4
          ? "text-amber-400"
          : "text-red-400";

  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <Logo size={36} showLabel className="mb-6" />
      <button
        onClick={() => router.push("/")}
        className="mb-8 text-teal-500 hover:text-teal-300 text-sm flex items-center gap-2 transition-colors"
      >
        ← Analyze Another Floor Plan
      </button>

      <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-white">
            DeafSpace Analysis Report
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm">Overall Score</span>
            <span className={`text-4xl font-bold tabular-nums ${scoreColor}`}>
              {result.overall_score}/10
            </span>
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {result.building_summary}
        </p>
        <div className="p-4 bg-teal-950/50 border border-teal-800 rounded-xl">
          <p className="text-xs font-medium text-teal-400 uppercase tracking-wider mb-1">
            Top Priority Fix
          </p>
          <p className="text-white/80 text-sm">{result.top_priority_fix}</p>
        </div>
      </div>

      <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">
        10 Parameter Evaluation
      </h2>
      <ParameterGrid result={result} />

      <p className="mt-10 text-white/20 text-xs text-center">
        Analyzed at {new Date(result.analyzed_at).toLocaleString()} · Based on
        Bridging Silence
      </p>
    </main>
  );
}
