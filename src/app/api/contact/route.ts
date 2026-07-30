import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import {
  consumeContactAttempt,
  type ContactRateLimit,
} from "@/lib/security/contact-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  company: z.string().trim().max(100).optional().default(""),
  projectType: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(20).max(2000),
  privacyConsent: z.literal("on"),
  website: z.string().max(200).optional().default(""),
});

const responseHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function rateLimitHeaders(rateLimit: ContactRateLimit) {
  return {
    "RateLimit-Limit": String(rateLimit.limit),
    "RateLimit-Remaining": String(rateLimit.remaining),
    "RateLimit-Reset": String(
      Math.max(0, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
    ),
    ...(rateLimit.retryAfterSeconds > 0
      ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
      : {}),
  };
}

function json(
  message: string,
  status = 200,
  extraHeaders?: Record<string, string>,
  reference?: string,
) {
  return NextResponse.json(
    { message, ...(reference ? { reference } : {}) },
    {
      status,
      headers: { ...responseHeaders, ...extraHeaders },
    },
  );
}

function clientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return createHash("sha256").update(`${address}|${userAgent}`).digest("hex");
}

function configuredOrigins() {
  return (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .flatMap((value) => {
      try {
        const url = new URL(value);
        return [url.origin];
      } catch {
        return [];
      }
    });
}

function isAllowedRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowed = new Set([
    siteConfig.url.origin,
    new URL(request.url).origin,
    ...configuredOrigins(),
  ]);
  return allowed.has(origin);
}

function safeWebhookUrl() {
  const value = process.env.CONTACT_WEBHOOK_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") return null;
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (url.username || url.password) return null;
    return url;
  } catch {
    return null;
  }
}

function webhookAuthorizationValue() {
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (!secret || secret.length > 500 || /[\r\n]/.test(secret)) return null;
  return `Bearer ${secret}`;
}

async function readJsonBody(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return { ok: false as const, status: 413, message: "The submission is too large." };
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return { ok: false as const, status: 413, message: "The submission is too large." };
  }

  try {
    return { ok: true as const, body: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false as const, status: 400, message: "Invalid request body." };
  }
}

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request)) {
    return json("This request origin is not allowed.", 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json("Unsupported request format.", 415);
  }

  const rateLimit = consumeContactAttempt(clientKey(request));
  const limitHeaders = rateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return json(
      "Too many attempts. Please wait before trying again.",
      429,
      limitHeaders,
    );
  }

  const bodyResult = await readJsonBody(request);
  if (!bodyResult.ok) {
    return json(bodyResult.message, bodyResult.status, limitHeaders);
  }

  const parsed = inquirySchema.safeParse(bodyResult.body);
  if (!parsed.success) {
    return json("Please check the form fields and try again.", 400, limitHeaders);
  }

  if (parsed.data.website) {
    return json("Your inquiry has been received.", 200, limitHeaders);
  }

  const webhook = safeWebhookUrl();
  if (!webhook) {
    return json(
      `Form delivery is not configured yet. Please email ${siteConfig.email}.`,
      503,
      limitHeaders,
    );
  }

  const { website: _honeypot, privacyConsent: _privacyConsent, ...inquiry } = parsed.data;
  void _honeypot;
  void _privacyConsent;

  const submissionId = randomUUID();

  try {
    const webhookHeaders = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "DreamWeavers-Portfolio/1.0",
      "X-DreamWeavers-Submission-Id": submissionId,
    });

    const authorization = webhookAuthorizationValue();
    if (authorization) webhookHeaders.set("Authorization", authorization);

    const response = await fetch(webhook, {
      method: "POST",
      headers: webhookHeaders,
      body: JSON.stringify({
        source: "dreamweavers-portfolio",
        submissionId,
        submittedAt: new Date().toISOString(),
        inquiry,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    return json("Thank you. Your inquiry has been sent.", 200, limitHeaders, submissionId);
  } catch {
    return json(
      `Delivery is temporarily unavailable. Please email ${siteConfig.email}.`,
      502,
      limitHeaders,
    );
  }
}
