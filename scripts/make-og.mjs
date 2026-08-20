/**
 * Builds the 1200x630 Open Graph / Twitter card.
 *
 * The previous build advertised public/img/logo.webp (420x320) while declaring
 * `summary_large_image`, so consumers letterboxed or rejected it.
 *
 * The card is deliberately just the existing brand mark on the site's own dark
 * surface token. It states nothing the site does not already state — no
 * strapline, no claim, no metric — because the social card is not a place to
 * introduce copy that appears nowhere else on the site.
 *
 *   node scripts/make-og.mjs   (or: npm run og)
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const WIDTH = 1200;
const HEIGHT = 630;
/** --surface-dark from styles/tokens.css. */
const BACKGROUND = '#141b1e';
/** --accent from styles/tokens.css, for the baseline rule. */
const ACCENT = '#417284';

const MARK = join(root, 'public/img/logo-mark-white.webp');
const OUT = join(root, 'public/img/og-cover.png');

// The mark is 480x311. Held to ~46% of the card width it sits comfortably
// inside the safe area every consumer crops to.
const markWidth = Math.round(WIDTH * 0.46);

const mark = await sharp(MARK).resize({ width: markWidth }).toBuffer();
const markMeta = await sharp(mark).metadata();

// A thin accent rule under the mark, echoing the site's own use of the colour.
const rule = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(markWidth * 0.5)}" height="4">
     <rect width="100%" height="100%" rx="2" fill="${ACCENT}"/>
   </svg>`,
);

const markTop = Math.round((HEIGHT - markMeta.height) / 2) - 26;

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BACKGROUND,
  },
})
  .composite([
    { input: mark, top: markTop, left: Math.round((WIDTH - markWidth) / 2) },
    {
      input: rule,
      top: markTop + markMeta.height + 44,
      left: Math.round((WIDTH - markWidth * 0.5) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const { size } = await stat(OUT);
console.log(`og-cover.png written: ${WIDTH}x${HEIGHT}, ${(size / 1024).toFixed(1)} KB`);
