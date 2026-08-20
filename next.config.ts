import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Static export disables the Next.js Image Optimizer. Every raster asset is
  // pre-sized to its delivered dimensions by scripts/fetch-media.mjs, so this
  // is the correct setting rather than a workaround.
  images: { unoptimized: true },
  // Emits out/about/index.html rather than out/about.html, so the export
  // serves correctly from any static host without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
