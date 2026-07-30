import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${siteConfig.email}`,
    `Expires: ${expires}`,
    `Canonical: ${new URL("/.well-known/security.txt", siteConfig.url).toString()}`,
    "Preferred-Languages: en, ur",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
