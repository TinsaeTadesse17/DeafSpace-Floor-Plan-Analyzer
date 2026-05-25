/** Vercel serverless functions reject request bodies above ~4.5 MB. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const MAX_UPLOAD_LABEL = "4MB";

export function isFileTooLarge(size: number): boolean {
  return size > MAX_UPLOAD_BYTES;
}
