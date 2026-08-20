'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Replaces Owl Carousel 2.
 *
 * The emitted DOM is a contract, not an implementation detail: the ported
 * stylesheet targets `.owl-stage-outer > .owl-stage > .owl-item` and
 * `.owl-dots > .owl-dot > span` directly. Changing this structure silently
 * unstyles the carousel.
 *
 *   mode="fade"  -> one item, cross-dissolve (hero text, testimonial)
 *   mode="cards" -> native scroll-snap strip, column count owned by CSS
 *
 * CARDS MODE IS MEASURED, NOT ASSUMED. The previous implementation translated
 * the stage by a hard-coded `100% / 3` while the stylesheet switched
 * `grid-auto-columns` to `100%` under 1024px. The two disagreed on every
 * viewport below that breakpoint, so a dot press moved a third of a card. It
 * also rendered one dot per item, letting a six-item/three-up desktop scroll
 * three columns past the end into blank space.
 *
 * The fix is to stop duplicating layout in JS. CSS scrolls the strip; this
 * component reads the resulting geometry back (stride = distance between two
 * cells) and derives both how many cards are visible and how many start
 * positions actually exist. Layout has exactly one owner.
 */
export function Carousel({
  mode,
  items,
  interval = 5000,
  className = '',
  id,
  label,
}: {
  mode: 'fade' | 'cards';
  items: ReactNode[];
  interval?: number;
  className?: string;
  id?: string;
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const reducedRef = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const cards = mode === 'cards';

  useEffect(() => {
    reducedRef.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /**
   * Distance from one cell's left edge to the next, i.e. column width + gap.
   * Read from the DOM rather than recomputed from the stylesheet's formula so
   * a CSS change cannot desynchronise the two.
   */
  const stride = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return 0;
    const cells = Array.from(stage.children) as HTMLElement[];
    if (cells.length === 0) return 0;
    if (cells.length > 1) return cells[1].offsetLeft - cells[0].offsetLeft;
    return cells[0].offsetWidth;
  }, []);

  // How many whole cards fit. Rounding absorbs the trailing gap that the last
  // visible column does not carry.
  useEffect(() => {
    if (!cards) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const measure = () => {
      const step = stride();
      const next =
        step > 0
          ? Math.min(Math.max(1, Math.round(scroller.clientWidth / step)), items.length)
          : 1;
      setVisibleCount(next);
    };

    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [cards, items.length, stride]);

  // Valid start positions only. Six cards three-up yields four dots, not six,
  // so no dot can park the strip on trailing emptiness.
  const pageCount = cards ? Math.max(1, items.length - visibleCount + 1) : items.length;

  // Clamped during render, not corrected in an effect: a resize can shrink the
  // range out from under the stored index, and deriving the visible value here
  // avoids a second render pass (and the setState-in-effect it would need).
  const activeIndex = Math.min(active, pageCount - 1);

  // Track the strip's real scroll position so dots stay truthful when the user
  // swipes or flings rather than pressing a dot.
  useEffect(() => {
    if (!cards) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const step = stride();
        if (step <= 0) return;
        const index = Math.round(scroller.scrollLeft / step);
        setActive(Math.min(Math.max(index, 0), pageCount - 1));
      });
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cards, pageCount, stride]);

  useEffect(() => {
    if (mode !== 'fade' || items.length < 2 || paused || reducedRef.current) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [mode, items.length, interval, paused]);

  const goTo = useCallback(
    (index: number) => {
      if (!cards) {
        setActive(((index % items.length) + items.length) % items.length);
        return;
      }
      const target = Math.min(Math.max(index, 0), pageCount - 1);
      const scroller = scrollerRef.current;
      const step = stride();
      if (!scroller || step <= 0) {
        setActive(target);
        return;
      }
      // The scroll handler writes `active` back once the strip settles.
      scroller.scrollTo({
        left: target * step,
        behavior: reducedRef.current ? 'auto' : 'smooth',
      });
    },
    [cards, items.length, pageCount, stride],
  );

  const go = (delta: number) => goTo(activeIndex + delta);

  return (
    <div
      className={`owl-carousel owl-theme ${className}`.trim()}
      data-owl-mode={mode}
      id={id}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div className="owl-stage-outer" ref={scrollerRef}>
        <div className="owl-stage" ref={stageRef}>
          {items.map((item, i) => {
            // In fade mode only the active slide is real content; the rest
            // must leave the tab order and the accessibility tree. Cards mode
            // is a native scroll container, where every card is legitimately
            // reachable and the browser scrolls a focused card into view.
            const hidden = mode === 'fade' && i !== activeIndex;
            return (
              <div
                key={i}
                className={`owl-item${i === activeIndex ? ' active' : ''}`}
                aria-hidden={hidden || undefined}
                inert={hidden}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="owl-dots">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`owl-dot${i === activeIndex ? ' active' : ''}`}
              aria-label={`Go to slide ${i + 1} of ${pageCount}`}
              aria-current={i === activeIndex || undefined}
              onClick={() => goTo(i)}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
