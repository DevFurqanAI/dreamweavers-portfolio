import type { MetadataRoute } from "next";
import {
  allowIndexing,
  privacyPolicyApproved,
  siteConfig,
} from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return [];

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  if (privacyPolicyApproved) {
    routes.push({
      url: new URL("/privacy", siteConfig.url).toString(),
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return routes;
}
