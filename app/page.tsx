import UploadZone from "@/components/UploadZone";
import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <Logo size={56} showLabel className="mb-8" />
      <div className="text-center mb-12 max-w-2xl">
        <div className="inline-block mb-4 px-3 py-1 bg-teal-900/50 border border-teal-700 rounded-full text-teal-400 text-xs tracking-widest uppercase">
          Sensory-Inclusive Architecture
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          DeafSpace <span className="text-teal-400">Floor Plan</span> Analyzer
        </h1>
        <p className="text-white/50 text-base leading-relaxed">
          Upload an architectural floor plan and receive an AI-powered evaluation
          across 10 DeafSpace design parameters — with specific observations and
          recommendations for each.
        </p>
      </div>

      <UploadZone />

      <div className="mt-16 max-w-2xl w-full">
        <p className="text-white/30 text-xs uppercase tracking-widest text-center mb-6">
          Evaluates 10 parameters
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
          {[
            "Visual Sightlines",
            "Corridor Width",
            "Blind Corners",
            "Seating Layout",
            "Transparency",
            "Lighting Design",
            "Gathering Spaces",
            "Emergency Access",
            "Wayfinding",
            "Acoustic Zones",
          ].map((p) => (
            <div
              key={p}
              className="px-2 py-2 bg-white/5 rounded-lg text-white/40 text-xs"
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-16 text-white/20 text-xs text-center max-w-md">
        Based on DeafSpace Design Guidelines (Gallaudet University) and
        sensory-inclusive architectural research.
      </p>
    </main>
  );
}
