import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

function safeConnectOrigin(value: string | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? ` ${url.origin}` : "";
  } catch {
    return "";
  }
}

const webVitalsOrigin = safeConnectOrigin(process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT);
const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" && process.env.VERCEL_ENV !== "preview";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${webVitalsOrigin}${isDevelopment ? " ws: wss:" : ""}`,
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  ...(!allowIndexing ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : []),
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ].join(", "),
  },
  ...(!isDevelopment
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000",
        },
      ]
    : []),
];

const publicAssetCache = "public, max-age=2592000, stale-while-revalidate=31536000";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_678_400,
    qualities: [60, 70, 75, 80, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: publicAssetCache }],
      },
      {
        source: "/clients/:path*",
        headers: [{ key: "Cache-Control", value: publicAssetCache }],
      },
      {
        source: "/team/:path*",
        headers: [{ key: "Cache-Control", value: publicAssetCache }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: publicAssetCache }],
      },
    ];
  },
};

export default nextConfig;
