# Dreamweavers Immersive Portfolio

A production-oriented, animation-first Next.js portfolio prototype for Dreamweavers.

## Included in this milestone

- Next.js App Router and strict TypeScript structure
- Persistent React Three Fiber canvas
- Interactive Three.js Dream Core
- GSAP and ScrollTrigger scene synchronization
- Cinematic intro transition
- Responsive animated navigation
- Semantic SEO-friendly homepage content
- Services, work placeholders, clients, process, industries, team and contact sections
- Real team names, roles, photographs and supplied client logos
- Reduced-motion, touch and WebGL fallbacks
- Server-side contact validation with an optional webhook
- Sitemap, robots, web manifest and draft privacy route
- Security headers and dependency overrides

## Install

This project was prepared without a generated `package-lock.json`. On your computer, run:

```powershell
cd "D:\Internship Projects\Company Portfolio V1\dreamweavers-portfolio"
npm install
```

Then verify the dependency tree:

```powershell
npm ls next react react-dom postcss sharp three @react-three/fiber @react-three/drei gsap
npm audit --omit=dev
```

Do not run `npm audit fix --force`.


### Recovering from a damaged npm install

If ESLint reports a missing internal `hermes-parser` file after `npm audit fix`, rebuild the dependency tree instead of forcing upgrades:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
```

The project now declares `@types/three@0.185.1` directly and uses React Three Fiber `9.6.1` so Three.js and JSX types are resolved consistently.

The included helper performs the same clean reset and validation sequence:

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\reset-and-verify.ps1
```

## Development

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Required checks

```powershell
npm run lint
npm run typecheck
npm run build
```

## Contact delivery

Copy `.env.example` to `.env.local` and set `CONTACT_WEBHOOK_URL` to a private server-side endpoint that accepts JSON POST requests.

```env
CONTACT_WEBHOOK_URL=https://your-secure-endpoint.example/inquiries
NEXT_PUBLIC_SITE_URL=https://dreamweaversoffice.com
```

Without this variable, the form intentionally displays a clear configuration message rather than pretending an inquiry was delivered.

## Content editing

Edit `src/content/site.ts`.

Only these legacy items were treated as verified in the supplied prototype:

- Team names and roles
- Team photographs
- Client logos and names

Project case studies and performance claims remain placeholders until the client supplies approved information.

## Deployment to Vercel

1. Push the parent repository to GitHub.
2. Import it into Vercel.
3. Set **Root Directory** to `dreamweavers-portfolio`.
4. Add environment variables for Preview and Production.
5. Run a Preview deployment first.
6. Test WebGL, reduced motion, mobile layout and contact delivery before connecting the production domain.

For commercial use, select a Vercel plan appropriate for the company website.

## Production hardening

SEO, metadata, performance and security controls are documented in:

```text
docs/PRODUCTION_HARDENING.md
```

Before a public launch, copy `.env.example` to `.env.local` for local testing and configure the same variables in Vercel. Keep indexing disabled on preview deployments.

Validation commands:

```powershell
npm run audit:prod
npm run check
```
