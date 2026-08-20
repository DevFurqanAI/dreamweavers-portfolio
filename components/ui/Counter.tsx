'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * Outline numerals that swap to the solid heavy cut on hover — a weight
 * change, not a colour change.
 *
 * DOM matches the source: figure.web-counter > span.web-counter-value +
 * div.web-counter-text.
 *
 * Counts up when revealed, but under reduced motion the final value renders
 * immediately. The number is content, not decoration, so it must never
 * depend on an animation having run.
 */
export function Counter({
  value,
  suffix = '',
  label,
  duration = 1600,
}: {
  value: string;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const target = Number(value);
  const isNumeric = !Number.isNaN(target);
  const { ref, revealed } = useReveal<HTMLElement>();
  /**
   * `null` until the count-up actually starts, and the final value renders
   * until then. That inverts the old default — the state used to be seeded
   * with the target and then reset to 0 — so no code path has to remember to
   * put the real number back. Reduced motion simply never starts the
   * animation and the figure is already correct.
   */
  const [counted, setCounted] = useState<number | null>(null);

  useEffect(() => {
    if (!revealed || !isNumeric) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    const start = performance.now();
    // Every write happens inside the frame callback. The old code seeded 0
    // synchronously from the effect body, which is the extra pre-paint render
    // the lint rule is about; the first tick lands on ~0 anyway.
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out-quart, matching --ease-out
      setCounted(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [revealed, target, isNumeric, duration]);

  const shown = counted ?? target;

  return (
    <figure className="web-counter" ref={ref}>
      <span className="web-counter-value">
        {isNumeric ? shown.toLocaleString('en-US') : value}
        {suffix}
      </span>
      <div className="web-counter-text">{label}</div>
    </figure>
  );
}
