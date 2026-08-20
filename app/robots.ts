import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static export requires metadata routes to be explicitly static;
// without this Next 16 fails the build rather than guessing.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Crawling stays ALLOWED on staging on purpose: facebookexternalhit — the
  // crawler WhatsApp shares with — honours robots.txt, so a blanket Disallow
  // would suppress the very share card this needs to serve. Staging is kept
  // out of search by the `noindex` in app/layout.tsx instead.
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
