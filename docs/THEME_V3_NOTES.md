# Theme V3 — Viewport, Industry Modes and Atmosphere

## Fixes

- The full-screen navigation now begins below the fixed header, uses viewport-height-aware type sizing and can scroll safely on short screens.
- Every anchored section uses a header-aware scroll margin.
- The hero now uses the actual dynamic viewport height instead of forcing a 760px minimum.
- Hero typography scales against both viewport width and viewport height, keeping the primary calls to action inside the visible browser area.

## Industry Modes

The previous pill cloud has been replaced with an interactive industry console:

- Ten selectable industry modes
- Accessible pressed-state buttons
- Animated system readout
- Scanning mesh, orbit rings, signals and focus areas
- Pointer-responsive lighting
- Mobile horizontal mode selector
- Reduced-motion fallbacks

Selecting an industry dispatches a `dw:industry` event that reconfigures the Three.js accent and motion state.

## Background Experience

The persistent canvas now includes:

- Procedural animated shader strands
- Pointer-responsive flow field
- Stage-aware colour and energy states
- Subtle camera movement
- More detailed woven geometry
- Animated signal arcs, satellites and halos
- Increased particle depth with deterministic placement
- Responsive performance limits and existing WebGL fallback

No new npm dependency is required for this update.
