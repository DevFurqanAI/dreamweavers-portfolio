# V9 Rich-Motion Runtime Optimization

This pass preserves the full WebGL/GSAP visual direction while reducing the work that continues after the page has loaded.

## Bundle analysis conclusion

- Three.js and React Three Fiber remain isolated behind `ExperienceShell` and load through the async `ExperienceCanvas` boundary.
- GSAP and ScrollTrigger remain isolated behind `MotionShell` and load through the async `MotionController` boundary.
- The analyzer does not show duplicate Three.js copies; the two Three.js boxes are module graph entries in the same async chain.
- The remaining priority is runtime scheduling and compositing rather than removing the visual libraries.

## Changes

- WebGL waits until the first paint and browser idle period, while user intent can activate it immediately.
- GSAP loads separately and earlier than WebGL, avoiding both large async systems starting at the same moment.
- The demand-render scheduler no longer runs a permanent 60 Hz `requestAnimationFrame` loop.
- Idle animation rates are reduced to 12/10/8 FPS while active interaction remains 45/36/28 FPS.
- The decorative canvas no longer intercepts mouse or touch scrolling.
- Global pointer coordinates are written once per animation frame through `PointerDriver`.
- Five independent ribbon `useFrame` callbacks were merged into one parent update loop.
- Ribbon shader time is maintained locally rather than reading the deprecated R3F Clock API.
- Node geometry is reused.
- Work-section scrub animations use one timeline/ScrollTrigger per project rather than three.
- Mobile work animations are one-time entrances rather than continuous scrub timelines.
- Service-card entrances use ScrollTrigger batching.
- The client marquee now runs as a compositor CSS animation and pauses outside the client section.
- Decorative CSS loops pause whenever their section is inactive.
- Full-screen CSS masks, filters, turbulence blending, and large blur filters were removed from the WebGL layer.
- Large glass panels use opaque layered surfaces instead of live backdrop filters where practical.

## Local verification

Run:

```bash
npm install
npm run check
npm run build
npm start
```

Test performance against the production server, not only `next dev`.

The `THREE.Clock` deprecation warning can still appear because React Three Fiber currently creates the Clock internally. The project no longer directly reads `state.clock`; the remaining warning is upstream and does not indicate a runtime failure.
