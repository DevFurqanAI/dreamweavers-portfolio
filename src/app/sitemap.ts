import type { MetadataRoute } from "next";
import { allowIndexing, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return [];

  return [
    {
      url: siteConfig.url.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/privacy", siteConfig.url).toString(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
