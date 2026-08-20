/**
 * WCAG 2.1 contrast maths.
 *
 * Used by tests as a guard on the brand palette. Dream Weavers' teal is dark
 * where the source design's amber was light, which inverts the foreground
 * that brand-filled surfaces need — see styles/theme.css, "BRAND CONTRAST
 * OVERRIDE". These functions are what prove that override is still required.
 */

/** sRGB channel (0-255) to linear-light value. */
export function srgbToLinear(channel: number): number {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a #rrggbb colour. Range 0-1. */
export function relativeLuminance(hex: string): number {
  const h = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(h)) {
    throw new Error(`Expected #rrggbb, got "${hex}"`);
  }
  const r = srgbToLinear(parseInt(h.slice(0, 2), 16));
  const g = srgbToLinear(parseInt(h.slice(2, 4), 16));
  const b = srgbToLinear(parseInt(h.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two #rrggbb colours. Range 1-21. */
export function contrastRatio(fg: string, bg: string): number {
  const a = relativeLuminance(fg);
  const b = relativeLuminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}
