# GitHub baseline restoration

This codebase was restored from the public `main` branch of:

`https://github.com/DevFurqanAI/dreamweavers-portfolio`

## Animation freeze

The animation and visual experience were intentionally preserved from the GitHub baseline.
No changes were made to:

- `src/experience/**`
- `src/components/ExperienceShell.tsx`
- `src/components/IntroGate.tsx`
- `src/components/MotionController.tsx`
- `src/components/MotionShell.tsx`
- `src/components/CustomCursor.tsx`
- `src/app/globals.css`
- Homepage animation markup and section structure

## Reapplied non-visual fixes

- Fixed the manifest icon `purpose` typing by declaring `any` and `maskable` separately.
- Rebuilt the generated Open Graph image using CSS supported by `ImageResponse`.
- Removed the unused `absoluteUrl` import from the root layout.
- Increased the Next.js image optimization cache lifetime.
- Made Webpack the default local development bundler for reliability.
- Kept Turbopack available through `npm run dev:turbo`.
- Restored the bundle analyzer command.
- Added an explicit modern-browser baseline.

## Commands

```bash
npm run dev
npm run dev:turbo
npm run check
npm run analyze
```

`npm run dev` now uses Webpack. This does not change the production build or website animation; it only avoids a development-only Turbopack incompatibility when one occurs.
