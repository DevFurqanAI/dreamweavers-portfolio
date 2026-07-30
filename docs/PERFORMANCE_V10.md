# V10 — Hero continuity and cursor reliability

## Immediate hero visual

The deferred WebGL strategy remains in place, but the blank/circle fallback has been replaced by a lightweight animated SVG loom. It is visible on the first paint, resembles the final ribbon composition, and cross-fades only after the real canvas has created and painted its first frames.

The SVG also remains as the animated low-cost experience when WebGL is intentionally skipped because of reduced motion, data saver, a very slow connection, or a very low-memory device.

## Cursor reliability

The browser cursor is no longer hidden merely because a fine pointer exists. The native cursor remains visible until the custom cursor has received a real pointer coordinate and is ready to render. Mouse events are included as a fallback alongside Pointer Events, and the custom layer is restored after re-entering the window.

## Loading sequence

1. Semantic hero HTML renders.
2. Animated SVG loom is immediately visible.
3. GSAP and WebGL remain separately deferred.
4. The first real WebGL frames are painted.
5. The SVG loom fades out over 750 ms.
