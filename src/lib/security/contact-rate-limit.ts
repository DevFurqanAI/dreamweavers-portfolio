type Bucket = { count: number; resetAt: number };

export type ContactRateLimit = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
let requestsSinceCleanup = 0;

function cleanupExpiredBuckets(now: number) {
  requestsSinceCleanup += 1;
  if (requestsSinceCleanup < 100 && buckets.size <= 500) return;

  requestsSinceCleanup = 0;
  for (const [bucketKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(bucketKey);
  }
}

export function consumeContactAttempt(key: string): ContactRateLimit {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      resetAt,
      retryAfterSeconds: 0,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, MAX_REQUESTS - existing.count);
  const allowed = existing.count <= MAX_REQUESTS;

  return {
    allowed,
    limit: MAX_REQUESTS,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
