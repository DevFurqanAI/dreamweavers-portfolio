# Performance V7

This release changes the rendering strategy from "maximum animation everywhere" to a tiered, performance-first experience.

## Runtime tiers

- **Balanced desktop:** WebGL at DPR 1 and a capped 24 FPS.
- **Static mode:** phones, coarse pointers, reduced-motion users, Save-Data/slow connections, devices with 4 GB memory or less, devices with 4 CPU threads or less, and supported browsers reporting that the laptop is running on battery.
- **Hidden tab:** the WebGL frame loop stops entirely.

## Major reductions

- Five shader ribbons reduced to two.
- Ribbon geometry reduced from 96×12 segments to 48×5.
- Particle count reduced from 420 to 120.
- Full-screen shader FBM reduced from five octaves to three.
- WebGL DPR capped at 1.
- Canvas frame rate capped at 24 FPS.
- GSAP scrub timelines removed and replaced with IntersectionObserver.
- Permanent custom-cursor RAF removed.
- Full-screen CSS masks, filters, noise blend layer and backdrop blurs removed.
- Offscreen sections use `content-visibility: auto`.
- Most perpetual CSS decorative animations are disabled.

## Testing

Always compare the production server, not only development mode:

```bash
npm run build
npm start
```

Use Chrome DevTools Performance and test with CPU throttling, plus an actual Android phone.

## Dependency cleanup

The runtime no longer imports GSAP, `@gsap/react`, or Drei. They were removed from `package.json`; run `npm install` once after applying the patch so npm can prune them and update the lockfile.
