/**
 * Imports Dream Weavers' own media from their live site and emits WebP at
 * delivered sizes into public/img/.
 *
 * These are the client's own assets, so unlike the design this build is
 * ported from, there is no licensing problem here.
 *
 * Static export disables the Next.js Image Optimizer, which is why sizing
 * happens at build time rather than on request. Every <Image> therefore needs
 * explicit width/height.
 *
 * Run: npm run media
 *
 * Failures are reported and exit non-zero. A missing asset must surface —
 * never substitute a placeholder silently.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const BASE = 'https://dreamweaversoffice.com/wp-content/uploads/';
const OUT = join(process.cwd(), 'public', 'img');

/** @type {[source: string, output: string, width: number][]} */
const MANIFEST = [
  // --- service heroes -----------------------------------------------------
  ['2025/09/AI-APPS-1024x645.webp', 'services/ai-apps-integration.webp', 1024],
  ['2025/09/Data-Management-1024x576.jpg', 'services/database-management.webp', 1024],
  ['2025/09/digital-marketing-1024x576.png', 'services/digital-marketing.webp', 1024],
  ['2025/08/1000_F_1203973308_36uyZkpY1sFD4BSL6ZrEPwzTUluSZ2oa.jpg', 'services/erp-crm-software.webp', 1024],
  ['2025/09/Lead-Generation-1-1024x741.jpg', 'services/lead-generation.webp', 1024],
  ['2025/09/App-Development-1024x683.jpg', 'services/mobile-app-development.webp', 1024],
  ['2025/09/Shopify.jpg', 'services/shopify-store-development.webp', 1024],
  ['2025/08/representation-user-experience-interface-design-1024x740.jpg', 'services/software-development.webp', 1024],
  ['2025/08/Web-Development-Promotion-Instagram-Post-1024x1024.png', 'services/web-development.webp', 1024],
  ['2025/08/coffee.jpg', 'services/ecommerce-investment-plans.webp', 1024],

  // --- portfolio ----------------------------------------------------------
  ['2025/08/foober-2.png', 'work/agro-chemicals.webp', 900],
  ['2025/08/Privyr-Logoo-768x768.jpg', 'work/crm-erp-system.webp', 900],
  ['2024/04/khan-texttlie.jpg', 'work/ecommerce.webp', 900],
  ['2025/08/Prism.png', 'work/real-estate.webp', 900],
  ['2025/08/real.png', 'work/realtix-erp.webp', 900],
  ['2025/08/compressed_b6af76aeb352ae013746cdfd91dd80a8.webp', 'work/automotive-manufacturing.webp', 900],
  ['2024/04/benefits-of-mobile-app-for-business-1024x576.webp', 'work/mobile-application-development.webp', 900],
  ['2024/04/Bin-Qasim-1024x1024.jpg', 'work/health-care.webp', 900],
  ['2024/04/logo5-1024x1024.png', 'work/enterprises.webp', 900],
  ['2024/04/fin.jpg', 'work/fintech.webp', 900],

  // --- team ---------------------------------------------------------------
  // hassanJ is only linked as Elementor thumbnails on the live
  // site; these are the full-size -scaled originals behind them.
  ['2025/08/hassanJ-scaled.jpg', 'team/hassan.webp', 600],
  ['2025/08/Mohsin.jpg', 'team/mohsin.webp', 600],
  ['2025/08/Hasnain.jpg', 'team/hasnain.webp', 600],
  ['2025/08/Urwa.jpg', 'team/urwa.webp', 600],
];

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // WordPress serves a 404 HTML page with a 200 for some missing uploads.
  if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length} bytes)`);
  return buf;
}

let bytesIn = 0;
let bytesOut = 0;
const failed = [];

for (const [src, out, width] of MANIFEST) {
  const dest = join(OUT, out);
  try {
    const buf = await fetchBuffer(BASE + src);
    await mkdir(dirname(dest), { recursive: true });
    const info = await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    bytesIn += buf.length;
    bytesOut += info.size;
    console.log(
      `  ok   ${out.padEnd(46)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ` +
        `${(buf.length / 1024).toFixed(0).padStart(5)}KB -> ${(info.size / 1024).toFixed(0).padStart(4)}KB`,
    );
  } catch (err) {
    failed.push([out, err.message]);
    console.error(`  FAIL ${out.padEnd(46)} ${err.message}`);
  }
}

// The logo ships from the client-supplied file in the repo root, which is
// cleaner than the copy served on their site.
try {
  const logoSrc = join(process.cwd(), '..', 'dreamweavers-logo-source-Photoroom.png');
  const info = await sharp(logoSrc).resize({ width: 420 }).webp({ quality: 92 }).toFile(join(OUT, 'logo.webp'));
  console.log(`  ok   ${'logo.webp'.padEnd(46)} ${info.width}x${info.height}`);
} catch (err) {
  failed.push(['logo.webp', err.message]);
  console.error(`  FAIL logo.webp  ${err.message}`);
}

const ok = MANIFEST.length - failed.length;
console.log(
  `\n${ok}/${MANIFEST.length} images written to public/img/  ` +
    `(${(bytesIn / 1024 / 1024).toFixed(1)}MB source -> ${(bytesOut / 1024 / 1024).toFixed(1)}MB webp)`,
);

if (failed.length) {
  console.error(`\n${failed.length} failed — source a replacement from the client:`);
  for (const [name, msg] of failed) console.error(`  ${name}: ${msg}`);
  process.exitCode = 1;
}
