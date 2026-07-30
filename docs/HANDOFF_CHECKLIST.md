# Local Handoff Checklist

Run these commands after copying the project to your existing folder:

```powershell
npm install
npm ls next react react-dom postcss sharp three @react-three/fiber gsap
npm audit --omit=dev
npm run lint
npm run typecheck
npm run build
npm run dev
```

Manual checks:

- Intro disappears and does not block interaction.
- Header menu opens, closes and responds to Escape.
- Dream Core follows the pointer on desktop.
- Dream Core moves between sections while scrolling.
- All team photographs load.
- All 14 client logos load.
- Keyboard focus is visible.
- Reduced-motion mode shows all content without long animation.
- Mobile layout does not use sticky project cards.
- Contact form reports that delivery is not configured until a webhook is added.
- Browser console has no runtime or WebGL errors.
