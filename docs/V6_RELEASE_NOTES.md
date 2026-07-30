# V6 — Production Hardening

This release keeps the V5 visual experience and focuses on four launch-critical areas:

1. SEO and metadata
2. Performance and Core Web Vitals
3. Security headers and form hardening
4. Deployment safety for Vercel previews and production

## Highlights

- Centralized site identity and canonical URL configuration
- Environment-aware indexing, robots and sitemap behavior
- Organization and WebSite JSON-LD
- Search-engine verification environment variables
- Improved Open Graph metadata and social image copy
- Deferred Three.js and GSAP initialization
- WebGL disabled for reduced-motion, data-saver, 2G and very low-memory devices
- Lower WebGL geometry and DPR cost
- Rendering pauses in hidden tabs
- Optional Web Vitals reporting
- CSP and additional security response headers
- Contact origin checks, request-size controls, rate limiting and HTTPS webhook validation
- Privacy consent and security.txt endpoint

Read `PRODUCTION_HARDENING.md` before deploying.
