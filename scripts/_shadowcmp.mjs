import sharp from 'sharp';
import path from 'node:path';

const SP = 'C:/Users/arsha/AppData/Local/Temp/claude/D--Internship-Projects-Company-Portfolio-V2/930a01f0-b719-4373-8cf1-379bd6faf4f7/scratchpad';
const src = 'public/img/shadow-bg.webp';
const DISPLAY = 792; // 55% of a 1440px viewport, per theme.css .hero-section

// Original, resampled to display size — the reference.
const a = await sharp(src).resize({ width: DISPLAY }).png().toBuffer();

// Candidate: stored at 1/4 size, then upscaled back to display size the way a
// browser would when painting background-size: 55% auto.
const small = await sharp(src).resize({ width: 360 }).webp({ quality: 60, alphaQuality: 60, effort: 6 }).toBuffer();
const b = await sharp(small).resize({ width: DISPLAY }).png().toBuffer();

// Flatten both onto white (they are painted over a white hero) and diff.
const flat = (buf) => sharp(buf).flatten({ background: '#fff' }).raw().toBuffer();
const [ra, rb] = [await flat(a), await flat(b)];

let max = 0, sum = 0;
for (let i = 0; i < ra.length; i++) {
  const d = Math.abs(ra[i] - rb[i]);
  if (d > max) max = d;
  sum += d;
}
console.log(`stored small: ${(small.length / 1024).toFixed(1)}KB`);
console.log(`max channel delta: ${max}/255   mean delta: ${(sum / ra.length).toFixed(3)}/255`);

await sharp(a).toFile(path.join(SP, 'shadow-a-orig.png'));
await sharp(b).toFile(path.join(SP, 'shadow-b-small.png'));
