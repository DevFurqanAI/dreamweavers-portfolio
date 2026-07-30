import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { consumeContactAttempt } from "@/lib/security/contact-rate-limit";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
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

function json(message: string, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: { ...responseHeaders, ...extraHeaders },
    },
  );
}

function clientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function isAllowedRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const configuredOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowed = new Set([siteConfig.url.origin, new URL(request.url).origin, ...configuredOrigins]);
  return allowed.has(origin);
}

function safeWebhookUrl() {
  const value = process.env.CONTACT_WEBHOOK_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    return url;
  } catch {
    return null;
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

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (!Number.isFinite(contentLength) || contentLength > 12_000) {
    return json("The submission is too large.", 413);
  }

  const rateLimit = consumeContactAttempt(clientKey(request));
  if (!rateLimit.allowed) {
    return json("Too many attempts. Please wait before trying again.", 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json("Invalid request body.", 400);
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return json("Please check the form fields and try again.", 400);
  }

  if (parsed.data.website) {
    return json("Your inquiry has been received.");
  }

  const webhook = safeWebhookUrl();
  if (!webhook) {
    return json(`Form delivery is not configured yet. Please email ${siteConfig.email}.`, 503);
  }

  const { website: _honeypot, privacyConsent: _privacyConsent, ...inquiry } = parsed.data;
  void _honeypot;
  void _privacyConsent;

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "DreamWeavers-Portfolio/1.0",
      },
      body: JSON.stringify({
        source: "dreamweavers-portfolio",
        submittedAt: new Date().toISOString(),
        inquiry,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    return json("Thank you. Your inquiry has been sent.");
  } catch {
    return json(`Delivery is temporarily unavailable. Please email ${siteConfig.email}.`, 502);
  }
}
