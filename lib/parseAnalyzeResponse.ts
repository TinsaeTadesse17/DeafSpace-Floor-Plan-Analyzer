export async function parseAnalyzeResponse(
  res: Response
): Promise<{ data?: Record<string, unknown>; error: string }> {
  const contentType = res.headers.get("content-type") ?? "";

  if (res.status === 413) {
    return {
      error:
        "File is too large for the server. Please use a file under 4MB (compress the image or export a smaller PDF).",
    };
  }

  if (!contentType.includes("application/json")) {
    const text = (await res.text()).trim();
    if (res.status >= 500) {
      return { error: "Server error. Please try again in a moment." };
    }
    return {
      error:
        text ||
        `Upload failed (${res.status}). Try a smaller file (under 4MB).`,
    };
  }

  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    return {
      error:
        typeof data.error === "string"
          ? data.error
          : `Analysis failed (${res.status})`,
    };
  }

  return { data, error: "" };
}
