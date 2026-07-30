# Theme V5 — WebGL Loom Field

## Purpose

The hero no longer uses the oversized torus-knot sculpture. It now uses a custom persistent WebGL ribbon field built with React Three Fiber and Three.js shader materials.

## Visual direction

- Five procedural silk-like ribbons weave through one another.
- Each ribbon uses a vertex shader for deformation and a fragment shader for fibres, sheen and moving light.
- A restrained fluid backdrop replaces the heavy contour-line background.
- The scene sits lower and farther right in the hero so it does not overpower the headline.
- The same WebGL scene changes position, energy, spread and colour as the user moves through the site.
- The Industry Modes selector continues to affect the WebGL accent and deformation.

## Inspiration

The implementation is original, but its interaction language draws from premium animated-component patterns such as fluid morph backgrounds, twisting ribbons, light-line systems, mesh gradients and pointer-reactive WebGL scenes.

## Files

- `src/experience/LoomField.tsx` — procedural ribbons, guide lines, nodes and particles
- `src/experience/SceneBackdrop.tsx` — fluid mesh-gradient and light-line shader
- `src/experience/ExperienceCanvas.tsx` — persistent scene composition
- `src/app/globals.css` — stage masks and hero balancing

## Performance

- No new dependency was added.
- Geometry and uniforms are allocated once.
- High-frequency animation mutates Three.js refs rather than React state.
- Device-pixel ratio remains capped by the existing Canvas configuration.
- Mobile and reduced-motion masking reduces visual intensity.
