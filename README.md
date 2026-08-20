# Dream Weavers — Portfolio Site

A static-exported Next.js 16 site for [Dream Weavers](https://dreamweaversoffice.com),
built by porting a re-engineered design system and rebranding it to the client's
teal identity.

**Spec:** `../docs/specs/2026-08-06-dreamweavers-portfolio-design.md`
**Plan:** `../docs/plans/2026-08-06-dreamweavers-portfolio.md`

---

## Run it

```bash
npm install
npm run media     # imports client images -> public/img (needs network)
npm run dev       # http://localhost:3000
```

```bash
npm run verify    # typecheck -> unit -> build -> e2e
npm run build     # emits out/ — deploy that folder anywhere
```

There is **no server**. Contact is WhatsApp + email, and there is no chat widget,
so the whole site is a static export that runs on any host.

## Layout

| Path | What it is |
|---|---|
| `content/` | ★ **All copy lives here.** Edit these to change the site's text |
| `styles/tokens.css` | ★ **The rebrand file** — every colour, font and motion curve |
| `styles/theme.css` | The ported design system. Class names are load-bearing |
| `styles/enhancements.css` | Hand-authored layer: reveals, a11y, and port fixes |
| `components/` | `layout/` chrome · `ui/` primitives · `sections/` page sections |
| `scripts/fetch-media.mjs` | Imports client media and emits WebP at delivered sizes |

To re-skin for a different client, edit `content/` and `styles/tokens.css`.
Nothing downstream holds a raw hex or a font name.

---

## Verified

Measured on 2026-08-07, not asserted:

| Check | Result |
|---|---|
| TypeScript | clean |
| Unit tests | 67 passed |
| E2E tests | 105 passed |
| Static export | 29 HTML pages (6 static + 20 generated + 404) |
| Broken links | 0 across 1,418 local references |
| WCAG 2.1 A/AA (axe) | 0 violations across all 8 route templates |
| Horizontal overflow | none at 320 / 375 / 768 / 834 / 1024 / 1440 / 1920 px |
| Keyboard | mega menu opens, traps focus, Escape restores focus |
| Reduced motion | marquee, reveals and counters all respect it |
| Payload (gzip) | CSS 16.4 KB · JS 187.5 KB · home HTML 14.8 KB |
| Images | 26 imported, 6.0 MB → 0.9 MB as WebP |

**Not verified:** Lighthouse has not been run — it needs a deployed URL rather
than a local static server to give a meaningful score.

---

## What the client still owes

These are real gaps, deliberately visible rather than papered over:

1. **Testimonials.** `dreamweaversoffice.com/testimonials/` is a live page that
   publishes no client quotes — checked directly, not assumed. The testimonial
   section renders an explicitly labelled placeholder.
   **No client quote has been invented.** Replace it in `content/team.ts`.

2. **Case studies.** The client publishes no descriptions, client names, or
   results for any of the ten projects. Every project detail page shows a
   "case study in preparation" notice. Fill `body` in `content/portfolio.ts` and
   set `isPlaceholder: false`.

3. **Team biographies.** None are published, so none were written.

Guarded by tests: `content.test.ts` fails if a project has an empty body without
`isPlaceholder`, and rejects invented prices, guarantees, or percentage claims
anywhere in service copy.

---

## Notable decisions

**The root font-size drives the type scale.** The source design ratcheted
`html { font-size }` across 15 breakpoints (6px at ≤425px up to 40px), which
overrode user font-size preferences and was non-monotonic — 1024px got a 12px
root but 1366px dropped back to 10px, so the design shrank as the screen grew.
That is replaced by one smooth `em`-based clamp, which respects user preference
and reproduces the source's headline size at its anchors (47px at 768px, 75px at
1920px). Every `rem` value in `theme.css` keeps its designed proportion.

**Teal is dark where the source's amber was light.** Black on `#417284` is
3.96:1 and fails AA; white is 5.30:1. Every brand-filled surface therefore forces
a white foreground, including descendants — the source styled card children
separately and at higher specificity, which is where the last contrast failures
hid.

**Never mute text with `opacity`.** Reduced alpha drops contrast below 4.5:1.
`--fg-muted` and `--fg-muted-dark` are explicit, measured colours.

**Fonts.** Gilmer (the source's face) is commercially licensed and is not
shipped. Clash Display + Switzer are self-hosted variable fonts, free for
commercial use, 103 KB for the full weight range.

## Licensing

Client media and copy come from dreamweaversoffice.com and belong to Dream
Weavers. Font Awesome Free is CC BY 4.0 / SIL OFL 1.1 / MIT. Clash Display and
Switzer are licensed by Fontshare for commercial use. `theme.css` structure is
derived from a re-engineering exercise — fine as a base for this client project,
not for resale as a theme.
