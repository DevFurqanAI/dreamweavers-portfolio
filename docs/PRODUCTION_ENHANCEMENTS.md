# Production Enhancements

This phase starts from the deployed GitHub baseline and intentionally leaves the visual and animation system unchanged.

## Implemented

### SEO and metadata

- Robust canonical URL resolution
- Updated title and description
- Open Graph and Twitter metadata
- Organization, WebSite and WebPage JSON-LD
- Service offer catalogue in structured data
- Preview and local no-index protection
- Privacy-page indexing gated behind explicit approval
- Sitemap excludes the draft privacy page until approval
- Complete web-manifest icon set, including a maskable icon
- Apple touch icon

### Security

- Static-compatible Content Security Policy
- Inline script attributes blocked with `script-src-attr 'none'`
- HSTS on production responses
- Clickjacking, MIME-sniffing, referrer and permissions protections
- Contact payload limit enforced against actual UTF-8 body size
- Contact client identifiers hashed before in-memory rate limiting
- Rate-limit response headers
- Optional authenticated webhook delivery
- Validated webhook URL and timeout
- Public RFC 9116-style `security.txt`

### Performance and operations

- 31-day minimum optimized-image cache lifetime
- Longer cache lifetime for version-controlled public brand assets
- Safe Core Web Vitals endpoint validation
- Reproducible `npm ci` recovery script
- `npm run verify` command
- Lockfile is preserved instead of regenerated

## Vercel environment values

### Preview

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=false
NEXT_PUBLIC_SITE_URL=https://dreamweaversoffice.com
```

### Production before launch approval

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=false
NEXT_PUBLIC_SITE_URL=https://dreamweaversoffice.com
```

### Production after approval

```env
NEXT_PUBLIC_ALLOW_INDEXING=true
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true
NEXT_PUBLIC_SITE_URL=https://dreamweaversoffice.com
```

Environment changes require a new deployment.

## Contact route limitation

The included rate limiter is intentionally lightweight and stored in process memory. It is useful against basic repeated submissions, but it is not a globally consistent limit across all serverless instances. For campaigns or high traffic, add a durable rate-limiting store or a Vercel firewall rule.

## Launch checks

```powershell
npm ci
npm run verify
```

After Preview deployment, test:

- `/`
- `/privacy`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/opengraph-image`
- `/.well-known/security.txt`
- Contact success and failure paths
- Security headers
- Mobile and reduced-motion behavior

Do not enable indexing while placeholder project content or unapproved legal text remains.
