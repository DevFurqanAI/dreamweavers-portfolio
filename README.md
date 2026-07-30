# Dreamweavers Immersive Portfolio

A production-oriented, animation-first Next.js portfolio for Dream Weavers.

## Current baseline

- Next.js App Router and strict TypeScript
- Persistent React Three Fiber / Three.js experience
- GSAP and ScrollTrigger motion system
- Responsive navigation, reduced-motion handling and WebGL fallbacks
- Semantic homepage content and structured metadata
- Contact route with server-side validation, honeypot protection and rate limiting
- Robots, sitemap, web manifest, Open Graph image and security headers

The animation and visual files are intentionally frozen during the current production-hardening phase. See `docs/ANIMATION_FREEZE_SHA256.md`.

## Install

The repository includes `package-lock.json`. Use the exact locked dependency tree:

```powershell
npm ci
```

Do not run `npm audit fix --force`. The production dependency audit is the relevant deployment check:

```powershell
npm run audit:prod
```

## Development

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Required checks

```powershell
npm run check
```

For the full production verification sequence:

```powershell
npm run verify
```

The included PowerShell helper performs a clean locked install and runs the same checks:

```powershell
PowerShell -ExecutionPolicy Bypass -File .\scripts\reset-and-verify.ps1
```

## Environment variables

Copy `.env.example` to `.env.local` for local testing. Configure the equivalent values in Vercel for Preview and Production.

Important launch controls:

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=false
```

Keep both values `false` on Preview deployments. Enable indexing on Production only after the final domain, content and privacy notice are approved.

## Contact delivery

Set a private server-side webhook endpoint:

```env
CONTACT_WEBHOOK_URL=https://your-secure-endpoint.example/inquiries
CONTACT_WEBHOOK_SECRET=replace-with-a-private-secret
CONTACT_ALLOWED_ORIGINS=https://dreamweaversoffice.com
```

`CONTACT_WEBHOOK_SECRET` is sent as a Bearer token to the configured webhook. Never prefix server-only secrets with `NEXT_PUBLIC_`.

Without a valid webhook URL, the form displays the company email rather than pretending a submission was delivered.

## Content editing

Edit `src/content/site.ts`.

Only team names, roles, photographs, and supplied client logos were treated as verified from the original prototype. Project case studies, results and performance claims remain placeholders until the client approves them.

## Vercel deployment

- Framework preset: Next.js
- Production branch: `main`
- Preview branch for this work: `production-enhancements`
- Keep Preview indexing disabled
- Add sensitive server variables using Vercel Environment Variables
- Run `npm run verify` before merging to `main`

See `docs/PRODUCTION_ENHANCEMENTS.md` for the complete launch checklist and security notes.
