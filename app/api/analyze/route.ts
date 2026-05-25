import { NextRequest, NextResponse } from "next/server";
import { analyzeFloorPlan } from "@/lib/analyzeFloorPlan";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/uploadLimits";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File must be JPG, PNG, WEBP, or PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `File size must be under ${MAX_UPLOAD_LABEL}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const result = await analyzeFloorPlan(base64, file.type);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);

    if (error instanceof Error && error.message.includes("429")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Analysis failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
