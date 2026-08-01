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

// The per-key bucket is identified by a hash of (IP, user-agent), both of
// which an attacker can rotate freely. This global bucket caps total
// submissions per window regardless of identity, so rotating the key can't
// turn into an unbounded flood of the outbound webhook.
const GLOBAL_KEY = "*";
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX_REQUESTS = 60;

function cleanupExpiredBuckets(now: number) {
  requestsSinceCleanup += 1;
  if (requestsSinceCleanup < 100 && buckets.size <= 500) return;

  requestsSinceCleanup = 0;
  for (const [bucketKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(bucketKey);
  }
}

function consume(key: string, windowMs: number, maxRequests: number, now: number): ContactRateLimit {
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetAt,
      retryAfterSeconds: 0,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, maxRequests - existing.count);
  const allowed = existing.count <= maxRequests;

  return {
    allowed,
    limit: maxRequests,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function consumeContactAttempt(key: string): ContactRateLimit {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const perKey = consume(key, WINDOW_MS, MAX_REQUESTS, now);
  const global = consume(GLOBAL_KEY, GLOBAL_WINDOW_MS, GLOBAL_MAX_REQUESTS, now);

  if (!global.allowed) {
    return { ...perKey, allowed: false, retryAfterSeconds: global.retryAfterSeconds || perKey.retryAfterSeconds };
  }

  return perKey;
}
