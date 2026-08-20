import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * `next/link` with prefetching off by default.
 *
 * WHY THIS EXISTS. This site is `output: 'export'`, and a static export emits
 * no RSC payloads. But <Link> still prefetches them on viewport entry, so every
 * link in the footer fired a request for a `.txt` flight payload that does not
 * exist, took a 404, and then fell back to downloading the linked page's ENTIRE
 * HTML document.
 *
 * The footer lists every service and appears on every page, so each page load
 * dragged down the whole service catalogue unasked. Measured against the built
 * export: 374 KB of waste on /, 430 KB on /contact/, 747 KB on /services/, plus
 * four to five hard 404s per page.
 *
 * In the App Router `prefetch={false}` suppresses prefetch on viewport entry
 * AND on hover (this differs from the Pages Router, where it only stops the
 * viewport prefetch). Navigation still works — the target is fetched on click.
 * Since the prefetch could never have produced a cache hit here, nothing is
 * traded away.
 *
 * Callers may still pass `prefetch` explicitly to override. Import it aliased,
 * so the JSX at call sites reads exactly as it did with next/link:
 *
 *   import { AppLink as Link } from '@/components/ui/AppLink';
 */
export function AppLink({ prefetch = false, ...rest }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...rest} />;
}
