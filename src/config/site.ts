const fallbackUrl = "https://dreamweaversoffice.com";

function toSiteUrl(value: string | undefined) {
  if (!value?.trim()) return null;

  try {
    const candidate = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.pathname = '/';
    url.search = '';
    url.hash = '';
    return url;
  } catch {
    return null;
  }
}

function resolveSiteUrl() {
  return (
    toSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    toSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    new URL(fallbackUrl)
  );
}

export const siteConfig = {
  name: "Dream Weavers",
  legalName: "Dream Weavers",
  shortName: "Dreamweavers",
  url: resolveSiteUrl(),
  locale: "en_PK",
  language: "en-PK",
  title: "Dream Weavers | Software, AI & E-commerce Solutions",
  titleTemplate: "%s | Dream Weavers",
  description:
    "Dream Weavers builds custom software, ERP and CRM systems, Shopify stores, AI integrations, mobile apps, websites and digital growth solutions in Pakistan.",
  shortDescription:
    "Connected software, e-commerce, AI, web, mobile and growth systems designed to work as one.",
  email: "info@dreamweaversoffice.com",
  phone: "+923136784511",
  displayPhone: "+92 313 6784511",
  address: {
    streetAddress: "Innovista, DHA",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  keywords: [
    "Dream Weavers",
    "software development company Pakistan",
    "custom software development",
    "ERP CRM software",
    "Shopify development",
    "e-commerce development",
    "AI app integration",
    "mobile app development",
    "web development Multan",
    "database management",
    "digital marketing",
    "lead generation",
  ],
  services: [
    "AI Apps & Integration",
    "Database Management & Administration",
    "Digital Marketing",
    "ERP/CRM Software",
    "Lead Generation",
    "Mobile App Development",
    "Shopify Store Development",
    "Software Development",
    "Web Development",
  ],
} as const;

const vercelEnvironment = process.env.VERCEL_ENV;
const explicitIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const allowIndexing = explicitIndexing && vercelEnvironment !== "preview";
export const privacyPolicyApproved =
  process.env.NEXT_PUBLIC_PRIVACY_POLICY_APPROVED === "true";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function configuredSameAs() {
  return Array.from(
    new Set(
      (process.env.NEXT_PUBLIC_SOCIAL_URLS || "")
        .split(",")
        .map((value) => value.trim())
        .filter((value) => {
          try {
            return new URL(value).protocol === "https:";
          } catch {
            return false;
          }
        }),
    ),
  );
}
