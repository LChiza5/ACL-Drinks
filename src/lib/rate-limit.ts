import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

interface Bucket {
  count: number;
  resetAt: number;
}

// In-memory sliding-window limiter, scoped per server instance. No external
// dependency (Redis/Upstash) is provisioned for this project, and Vercel
// keeps serverless instances warm between requests in practice, so this
// gives real protection against basic brute-force/spam without new infra.
const buckets = new Map<string, Bucket>();

// Periodic cleanup so the map doesn't grow unbounded over a long-lived instance.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}, 5 * 60 * 1000).unref?.();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;

  bucket.count++;
  return true;
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function rateLimitResponse(): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    { success: false, error: "Demasiados intentos. Esperá un momento y volvé a intentar." },
    { status: 429 }
  );
}
