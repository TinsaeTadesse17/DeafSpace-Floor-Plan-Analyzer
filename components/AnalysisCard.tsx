import { Parameter } from "@/types/analysis";

const scoreStyles: Record<string, string> = {
  excellent: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
  good: "text-teal-400 bg-teal-950/40 border-teal-800",
  needs_improvement: "text-amber-400 bg-amber-950/40 border-amber-800",
  critical: "text-red-400 bg-red-950/40 border-red-800",
};

const scoreBarColor: Record<string, string> = {
  excellent: "bg-emerald-400",
  good: "bg-teal-400",
  needs_improvement: "bg-amber-400",
  critical: "bg-red-400",
};

const priorityStyles: Record<string, string> = {
  high: "bg-red-900/50 text-red-300",
  medium: "bg-amber-900/50 text-amber-300",
  low: "bg-teal-900/50 text-teal-300",
};

export default function AnalysisCard({ param }: { param: Parameter }) {
  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-3 ${scoreStyles[param.score]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm leading-tight text-white">
          {param.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[param.priority]}`}
          >
            {param.priority}
          </span>
          <span className="text-xl font-bold tabular-nums">
            {param.score_value}/10
          </span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${scoreBarColor[param.score]}`}
          style={{ width: `${param.score_value * 10}%` }}
        />
      </div>

      <div>
        <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
          Observation
        </p>
        <p className="text-xs text-white/80 leading-relaxed">
          {param.observation}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
          Recommendation
        </p>
        <p className="text-xs text-white/80 leading-relaxed">
          {param.recommendation}
        </p>
      </div>
    </div>
  );
}
