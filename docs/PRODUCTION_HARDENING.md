# Production Hardening — SEO, Metadata, Performance and Security

This phase prepares the immersive portfolio for a controlled production deployment. It does not replace a legal review, penetration test, real-user performance monitoring or final content approval.

## SEO and metadata

Implemented:

- Centralized site identity in `src/config/site.ts`
- Canonical URL handling through `NEXT_PUBLIC_SITE_URL`
- Search-safe preview behavior through `NEXT_PUBLIC_ALLOW_INDEXING`
- Rich root metadata: title template, description, keywords, publisher, creator and category
- Open Graph and Twitter metadata
- Dynamic Open Graph image
- Search-engine verification environment variables
- Environment-aware `robots.txt`
- Environment-aware `sitemap.xml`
- Web app manifest and icons
- Organization and WebSite JSON-LD
- Sanitized JSON-LD serialization
- Canonical privacy-page metadata

### Indexing safety

The site deliberately defaults to `NEXT_PUBLIC_ALLOW_INDEXING=false`.

Set this to `true` only in the Vercel **Production** environment after:

1. The final production domain is connected.
2. All placeholder claims and project concepts are approved or removed.
3. The privacy notice is approved.
4. Google Search Console and Bing Webmaster Tools verification values are added.
5. The production deployment has been checked for canonical URLs, robots and sitemap output.

Vercel preview deployments remain non-indexable even if the environment variable is accidentally copied.

## Performance

Implemented:

- WebGL remains dynamically imported and outside server-rendered SEO content.
- The WebGL canvas mounts after initial rendering using `requestIdleCallback` where available.
- WebGL is skipped for reduced-motion users, data-saver connections, 2G connections and devices reporting 2 GB memory or less.
- Canvas rendering stops when the browser tab is hidden.
- Canvas DPR is capped at 1.25 and can adapt downward.
- Antialiasing and stencil buffers are disabled for the decorative canvas.
- Unnecessary Three.js preload work was removed.
- Ribbon geometry, guide-line points, particle count and node geometry were reduced.
- GSAP is now lazy-loaded after the main content is usable.
- The cinematic intro is shortened and shown once per browser session.
- `next/image` continues to serve modern image formats.
- Static brand, client and team assets receive bounded CDN caching.
- `useReportWebVitals` reports LCP, CLS, INP and related metrics to an optional endpoint.

### Performance verification

Run a production build, not only the development server:

```powershell
npm run check
npm run start
```

Then test in Chrome Incognito using Lighthouse for mobile and desktop. Pair Lighthouse with field data after deployment. Pay special attention to:

- LCP: hero text and intro duration
- INP: menu, industry selector and WebGL pointer work
- CLS: images, header and dynamic canvas mount
- JS execution: GSAP and Three.js chunks
- GPU load and battery usage on mid-range mobile devices

## Security

Implemented:

- Framework-identifying `X-Powered-By` header disabled
- Content Security Policy compatible with the statically rendered Next.js experience
- Clickjacking protection with `frame-ancestors 'none'` and `X-Frame-Options: DENY`
- MIME sniffing protection
- Strict referrer policy
- Restricted browser permissions
- Object, frame, base and form destinations restricted through CSP
- HSTS on production responses
- Cross-origin opener/resource protections
- Production source maps disabled
- Contact endpoint accepts JSON only and limits request size
- Same-origin and allowed-origin checks on contact submissions
- Honeypot field and server-side Zod validation
- Required privacy consent
- Best-effort per-instance rate limiting
- Webhook URL validation and HTTPS enforcement in production
- Contact responses use `no-store` and `X-Robots-Tag`
- `/.well-known/security.txt` security contact
- Secrets remain server-only

### Important rate-limit limitation

The included rate limiter is intentionally described as **best effort**. Vercel functions can run across multiple instances, so an in-memory map is not a complete distributed abuse-control system.

Before a public campaign or high-volume launch, add one of the following:

- Vercel Firewall rate limiting
- A durable Redis-backed limiter
- A managed form provider with bot and abuse protection
- Cloudflare Turnstile or another approved challenge layer

### CSP trade-off

This is a static portfolio, so it uses a header-based CSP that keeps static optimization and CDN caching. It currently permits inline scripts and styles required by the generated Next.js output and existing styling architecture.

A strict per-request nonce CSP is stronger, but it opts pages into dynamic rendering and reduces the caching/performance benefits of a static portfolio. Revisit nonce or SRI-based CSP if the threat model changes or third-party scripts are introduced.

## Required production environment variables

See `.env.example`.

Minimum production configuration:

```text
NEXT_PUBLIC_SITE_URL=https://dreamweaversoffice.com
NEXT_PUBLIC_ALLOW_INDEXING=true
CONTACT_WEBHOOK_URL=https://...
CONTACT_ALLOWED_ORIGINS=https://dreamweaversoffice.com
```

Optional:

```text
GOOGLE_SITE_VERIFICATION=...
BING_SITE_VERIFICATION=...
NEXT_PUBLIC_SOCIAL_URLS=https://...
NEXT_PUBLIC_WEB_VITALS_ENDPOINT=https://...
```

## Deployment verification

After deploying to Vercel, verify:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/opengraph-image`
- `/.well-known/security.txt`
- `/privacy`
- `/api/contact` rejects cross-site and oversized requests
- Security response headers on `/`
- Social preview rendering
- Structured data validation
- Production Core Web Vitals
