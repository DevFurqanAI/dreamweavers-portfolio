# V8 Rich-Motion Performance Pass

This release restores the full V5/V6 visual direction and optimizes how it runs instead of replacing it with a static experience.

## Main changes

- React Three Fiber now uses `frameloop="demand"`.
- Rendering runs in short high-frame-rate bursts during scroll, pointer movement, stage changes, and industry changes.
- The scene drops to a lower idle frame rate when the user is not interacting.
- Device capability determines DPR, ribbon geometry, particles, guide lines, shader octaves, and pointer strength.
- Battery mode downgrades one quality tier instead of disabling WebGL.
- The `@react-three/drei` dependency was removed; guide lines now use native Three.js geometry and materials.
- GSAP remains, but expensive blur reveals and clip-path scrubbing were removed.
- Service cards use one-time entrance animation while the project showcase retains scroll-linked motion.
- Section-to-WebGL stage detection now uses `IntersectionObserver`.
- Magnetic buttons cache geometry on pointer entry and use `gsap.quickTo`, eliminating layout reads on every pointer move.
- Industry pointer lighting caches its bounding box and batches CSS-variable writes with `requestAnimationFrame`.
- The custom cursor no longer runs a permanent animation loop after it has settled.
- Three.js and GSAP are still lazy-loaded after initial content or immediately after user intent.
- Image optimization cache lifetime was increased.

## Validation commands

```bash
npm install
npm run audit:prod
npm run lint
npm run typecheck
npm run build
npm run analyze
```

`npm run analyze` uses the Next.js Turbopack analyzer to trace large chunks and import chains.

## Expected behavior

- High-capability desktops retain five ribbons and richer shader detail.
- Normal laptops use four ribbons and a balanced shader profile.
- Phones retain an animated three-ribbon WebGL scene at a lower DPR and frame budget.
- Reduced-motion and severely constrained connections still receive the CSS fallback.
