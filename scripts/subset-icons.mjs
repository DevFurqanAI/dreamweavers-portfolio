/**
 * Subsets the Font Awesome webfonts down to the glyphs this site actually maps.
 *
 * WHY. icons.css was already purged to the rules we need, but the FONT FILES
 * were still the complete shipped faces: fa-solid-900 at 117 KB and
 * fa-brands-400 at 113 KB, both downloaded in full on every page, to render
 * sixteen icons. That was 230 KB of the ~300 KB font budget.
 *
 * SOURCE OF TRUTH. The codepoint list is read out of styles/icons.css rather
 * than hardcoded here, so adding an icon is still a one-line CSS change: add
 * the `content: "\fXXX"` rule, re-run `npm run icons`, done. Nothing can drift
 * between the stylesheet and the fonts.
 *
 * Every codepoint is offered to every face. A face that does not contain a
 * given glyph simply drops it, which is what sorts solid from brands without
 * us having to track which is which.
 *
 * Font Awesome Free's fonts are SIL OFL 1.1, which expressly permits subsetting
 * and redistribution of the modified font. The reserved-name clause does not
 * apply — OFL 1.1 §5 only restricts the name when a Reserved Font Name is
 * declared, and Font Awesome Free declares none.
 *
 * Sourced from the pinned @fortawesome/fontawesome-free devDependency, so the
 * output is reproducible from a clean checkout.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts');
const OUT = path.join(root, 'public', 'webfonts');

const FACES = ['fa-solid-900.woff2', 'fa-brands-400.woff2', 'fa-regular-400.woff2'];

const css = await readFile(path.join(root, 'styles', 'icons.css'), 'utf8');

// Every `content: "\fXXX"` in the purged stylesheet. These are the only glyphs
// any markup on this site can reach.
const codepoints = [...new Set(css.match(/content:\s*"\\([0-9a-f]{4,5})"/gi) ?? [])].map((m) =>
  parseInt(m.match(/\\([0-9a-f]{4,5})/i)[1], 16),
);

if (codepoints.length === 0) {
  throw new Error('No icon codepoints found in styles/icons.css — refusing to write empty fonts.');
}

const text = codepoints.map((c) => String.fromCodePoint(c)).join('');
console.log(`Subsetting to ${codepoints.length} glyphs from styles/icons.css\n`);

let before = 0;
let after = 0;

for (const face of FACES) {
  const src = await readFile(path.join(SRC, face));
  const out = await subsetFont(src, text, { targetFormat: 'woff2' });

  // A subset that kept nothing but the notdef glyph means the mapping and the
  // face disagree; shipping it would silently blank the icons.
  if (out.length < 200) {
    throw new Error(`${face} subsetted to ${out.length} bytes — refusing to write.`);
  }

  await writeFile(path.join(OUT, face), out);

  const prev = await stat(path.join(SRC, face));
  before += prev.size;
  after += out.length;

  const pct = ((1 - out.length / prev.size) * 100).toFixed(1);
  console.log(
    `  ${face.padEnd(22)} ${(prev.size / 1024).toFixed(1).padStart(6)} KB -> ` +
      `${(out.length / 1024).toFixed(1).padStart(5)} KB  (-${pct}%)`,
  );
}

console.log(
  `\nTotal ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB ` +
    `(saved ${((before - after) / 1024).toFixed(1)} KB per page load)`,
);
