import { AnalysisResult } from "@/types/analysis";
import AnalysisCard from "./AnalysisCard";

export default function ParameterGrid({ result }: { result: AnalysisResult }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {result.parameters.map((param) => (
        <AnalysisCard key={param.id} param={param} />
      ))}
    </div>
  );
}
