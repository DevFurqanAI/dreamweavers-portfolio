import { absoluteUrl, configuredSameAs, siteConfig } from "@/config/site";

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData() {
  const organizationId = `${siteConfig.url.toString()}#organization`;
  const websiteId = `${siteConfig.url.toString()}#website`;
  const webpageId = `${siteConfig.url.toString()}#webpage`;
  const sameAs = configuredSameAs();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url.toString(),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.png"),
          width: 512,
          height: 512,
        },
        image: absoluteUrl("/opengraph-image"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          ...siteConfig.address,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          availableLanguage: ["English", "Urdu"],
        },
        knowsAbout: siteConfig.services,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital services",
          itemListElement: siteConfig.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service,
              provider: { "@id": organizationId },
            },
          })),
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url.toString(),
        name: siteConfig.name,
        description: siteConfig.shortDescription,
        inLanguage: siteConfig.language,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteConfig.url.toString(),
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}
