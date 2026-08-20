'use client';

import { useEffect } from 'react';

/**
 * Replaces app.js §3.
 *
 * Past a third of the viewport the header goes fixed and collapses; the CSS
 * hangs off `body.sticky-header`. Scroll progress is written to
 * `--menu-progress`, which the menu button paints as a conic-gradient ring.
 *
 * Reads are batched into a rAF so scrolling stays cheap.
 */
export function useScrollProgress() {
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;

      document.body.classList.toggle('sticky-header', y > window.innerHeight / 3);
      document.documentElement.style.setProperty('--menu-progress', `${pct}%`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      document.body.classList.remove('sticky-header');
    };
  }, []);
}
