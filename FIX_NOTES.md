# Install and TypeScript Fixes

This revision addresses the reported Windows installation errors.

## Changes

- Added direct `@types/three@0.185.1` development dependency.
- Updated React Three Fiber from `9.5.0` to stable `9.6.1`.
- Explicitly loads React Three Fiber's React 19 JSX augmentation during TypeScript checks.
- Reworked `DreamCore` to use typed Three.js imports and reusable vectors.
- Added pointer-event types and body-class cleanup.
- Pinned ESLint and TypeScript versions used by the project.
- Added `scripts/reset-and-verify.ps1` for a clean Windows reinstall.

## Why a clean reinstall is required

The missing `hermes-parser/dist/traverse/SimpleTraverser` module indicates an inconsistent or incomplete incremental `node_modules` tree. Do not repair that tree with `npm audit fix --force`; delete it and install from the corrected `package.json` instead.

The nine remaining audit findings are development-tooling findings. The required production check is:

```powershell
npm audit --omit=dev
```

It should report zero production vulnerabilities before deployment.

## ESLint follow-up fixes

- Replaced internal `<a href="/">` navigation with `next/link` in the 404 and privacy routes.
- Deferred reduced-motion intro dismissal to `requestAnimationFrame` so state is not changed synchronously inside an effect.
- Deferred WebGL support state initialization to `requestAnimationFrame` and added cleanup.
