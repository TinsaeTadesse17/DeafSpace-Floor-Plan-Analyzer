"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Analysis failed");
        }

        sessionStorage.setItem("analysisResult", JSON.stringify(data));
        router.push("/results");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setIsLoading(false);
      }
    },
    [router]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        htmlFor="file-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
          flex flex-col items-center justify-center w-full h-72
          border-2 border-dashed rounded-2xl cursor-pointer
          transition-all duration-200
          ${
            isDragging
              ? "border-teal-400 bg-teal-950/30 scale-[1.02]"
              : "border-teal-700/50 bg-teal-950/10 hover:border-teal-500 hover:bg-teal-950/20"
          }
          ${isLoading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-teal-300 text-sm font-medium">
              Analyzing floor plan for DeafSpace compliance...
            </p>
            <p className="text-teal-600 text-xs">This takes 15–30 seconds</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-teal-900/50 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt=""
                width={32}
                height={32}
                aria-hidden
              />
            </div>
            <p className="text-teal-200 font-semibold text-lg">
              Drop your floor plan here
            </p>
            <p className="text-teal-500 text-sm">
              JPG, PNG, WEBP or PDF · Max 15MB
            </p>
            <span className="mt-2 px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white text-sm rounded-lg transition-colors">
              Choose File
            </span>
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={onInputChange}
          disabled={isLoading}
        />
      </label>

      {error && (
        <div className="mt-4 p-3 bg-red-950/50 border border-red-700 rounded-lg text-red-300 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
