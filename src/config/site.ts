const fallbackUrl = "https://dreamweaversoffice.com";

function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim() || fallbackUrl;
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  const url = new URL(withProtocol);
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

export const siteConfig = {
  name: "Dream Weavers",
  legalName: "Dream Weavers",
  shortName: "Dreamweavers",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en_PK",
  language: "en",
  title: "Dream Weavers — Software, E-commerce, AI & Digital Growth",
  titleTemplate: "%s | Dream Weavers",
  description:
    "Dream Weavers builds custom software, ERP and CRM systems, e-commerce platforms, AI integrations, mobile apps, websites and digital growth solutions.",
  shortDescription:
    "Custom software, e-commerce, AI, web, mobile and growth systems built as one connected digital experience.",
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

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function configuredSameAs() {
  return (process.env.NEXT_PUBLIC_SOCIAL_URLS || "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    });
}
