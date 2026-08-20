/**
 * Builds every brand icon from the one source mark.
 *
 * The icons this replaces were made by hand and were CROPPED, not merely
 * tight: the mark had been scaled until it overflowed a square canvas, so the
 * D's left stroke and the W's right stroke were sliced flat against the edges.
 * Measured against public/img/logo-mark.webp, about 23% of the mark's width
 * was gone — roughly 12% off each side. At favicon size that reads as a
 * slightly wrong logo rather than an obviously broken one, which is why it
 * survived so long.
 *
 * There was no script; that is the reason the crop was never caught. Every
 * size now derives from a single 512px master, so the geometry cannot drift
 * between them and a change is one edit here plus a re-run.
 *
 *   node scripts/make-icons.mjs   (or: npm run icons:brand)
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * The only source. The mark's own colours ship as they are — the brand teal
 * and black, unaltered. This script changes geometry, never colour.
 *
 * Note for anyone tempted: half the mark is pure black and measures about
 * 1.3:1 against dark browser chrome, so it is close to invisible there. A
 * prefers-color-scheme variant was tried and explicitly rejected — the icon
 * is to stay one colourway. Fix that by changing the mark itself, if ever,
 * not by swapping in a different one per scheme.
 */
const SOURCE = join(root, 'public/img/logo-mark.webp');

/**
 * Margin on each side, as a fraction of the canvas.
 *
 * 4% restores the whole mark with a little air while keeping it close to the
 * size it renders at today — the fix reads as a nudge, not a redesign. The
 * mark is much wider than it is tall (480x312), so fitting it by WIDTH is what
 * decides the scale; the leftover vertical space is the honest consequence of
 * that aspect ratio, not padding chosen for its own sake.
 */
const INSET = 0.04;

/** The master every other size is reduced from. */
const MASTER = 512;

/** Apple touch icons must not be transparent — iOS composites them on black. */
const APPLE_BACKGROUND = '#ffffff';

/** Square canvas holding the full mark, centred, inset by INSET. */
async function master(background) {
  const markWidth = Math.round(MASTER * (1 - INSET * 2));
  const mark = await sharp(SOURCE).resize({ width: markWidth }).toBuffer();
  const { height } = await sharp(mark).metadata();

  return sharp({
    create: {
      width: MASTER,
      height: MASTER,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: mark,
        top: Math.round((MASTER - height) / 2),
        left: Math.round((MASTER - markWidth) / 2),
      },
    ])
    .png()
    .toBuffer();
}

const transparent = await master(null);
const opaque = await master(APPLE_BACKGROUND);

/** Reduce the master with a good kernel; never enlarge. */
const at = (source, size) =>
  sharp(source)
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();

/**
 * ICO container wrapping PNG frames.
 *
 * Written by hand because sharp cannot emit .ico and this needs no more than a
 * 6-byte header, one 16-byte directory entry per frame, then the frames.
 * PNG-in-ICO is understood by every browser in the support range.
 */
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(frames.length, 4);

  const directory = Buffer.alloc(16 * frames.length);
  let offset = header.length + directory.length;

  frames.forEach(({ size, data }, i) => {
    const o = i * 16;
    // 0 means 256 in this field; nothing here is that large, but be correct.
    directory[o] = size >= 256 ? 0 : size;
    directory[o + 1] = size >= 256 ? 0 : size;
    directory[o + 2] = 0; // palette entries
    directory[o + 3] = 0; // reserved
    directory.writeUInt16LE(1, o + 4); // colour planes
    directory.writeUInt16LE(32, o + 6); // bits per pixel
    directory.writeUInt32LE(data.length, o + 8);
    directory.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...frames.map((f) => f.data)]);
}

const written = [];
const write = async (relative, data) => {
  await writeFile(join(root, relative), data);
  written.push(`${relative} (${(data.length / 1024).toFixed(1)} KB)`);
};

// Transparent PNGs. The layout declares 16/32/192/512; 48 and 96 are shipped
// for Windows tiles and Android, and media.test.ts pins all six.
for (const size of [16, 32, 48, 96, 192, 512]) {
  await write(`public/img/icon-${size}.png`, await at(transparent, size));
}
await write('app/icon.png', await at(transparent, 512));

// Opaque, for the platforms that composite rather than respect alpha.
await write('app/apple-icon.png', await at(opaque, 180));
await write('public/img/apple-touch-icon.png', await at(opaque, 180));

// Matches the frame set the previous .ico carried.
await write(
  'app/favicon.ico',
  ico([
    { size: 16, data: await at(transparent, 16) },
    { size: 32, data: await at(transparent, 32) },
  ]),
);

console.log(`icons written at ${INSET * 100}% inset:`);
for (const line of written) console.log(`  ${line}`);
