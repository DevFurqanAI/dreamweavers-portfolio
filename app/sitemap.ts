import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { services } from '@/content/services';
import { projects } from '@/content/portfolio';

// Static export requires metadata routes to be explicitly static;
// without this Next 16 fails the build rather than guessing.
export const dynamic = 'force-static';

/**
 * Enumerates the static routes plus the 20 generated ones. Static export
 * writes this to out/sitemap.xml at build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.9 },
    { path: '/portfolio', priority: 0.9 },
    { path: '/team', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
  ];

  // NO lastModified. Every URL previously carried the build timestamp, which
  // told crawlers that all 26 pages changed on every deploy — a claim that was
  // false and that devalues the signal. The content model records no genuine
  // modification dates, so the correct move is to omit the field rather than
  // manufacture one. Emit real dates here if the model ever gains them.
  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Placeholder projects are noindex (see app/portfolio/[slug]/page.tsx), and
    // listing a noindex URL in a sitemap sends contradictory signals. They
    // return here automatically once isPlaceholder flips to false.
    ...projects
      .filter((p) => !p.isPlaceholder)
      .map((p) => ({
        url: absoluteUrl(`/portfolio/${p.slug}`),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  ];
}
