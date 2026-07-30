# Animation System

The motion language follows five recurring actions:

1. **Weave** — lines cross, connect and form systems.
2. **Form** — particles and surfaces assemble into usable objects.
3. **Transform** — visual states become the next section instead of merely fading.
4. **Travel** — the camera moves through the digital environment.
5. **Release** — objects separate and return to threads or particles.

## Architecture

- `ExperienceCanvas.tsx` owns the persistent canvas and WebGL detection.
- `LoomField.tsx` owns the procedural WebGL ribbons, guide lines, nodes and particles.
- `MotionController.tsx` owns DOM reveals, parallax, marquee motion and section-stage events.
- Sections expose a `data-stage` attribute.
- The canvas listens to `dw:stage` browser events and changes its target position, rotation and scale.

## Performance rules

- Device pixel ratio is capped at `1.5`.
- Drei `AdaptiveDpr` can reduce visual cost under load.
- Important content remains in HTML.
- WebGL failure displays a CSS fallback.
- Reduced-motion mode hides the canvas and disables pinned/looping effects.
- Mobile removes sticky project stacking and simplifies layout.

## Future expansion

- Replace concept project surfaces with approved images/video textures.
- Add individual SEO case-study routes.
- Add a scene quality manager for low/medium/high modes.
- Add route transitions only after browser back/forward behavior is tested.
- Keep post-processing subtle and disabled on mobile by default.
