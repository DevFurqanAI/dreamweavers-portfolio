'use client';

/**
 * The back-to-top control. Its two "arms" splay while a fill panel slides
 * down, on the deliberately overshooting --ease-bounce curve — one of the
 * six effects that carry this design's personality.
 *
 * DOM matches the source: a.goto-top > span.arrow-up > left-arm, right-arm,
 * arrow-slide. It lives in the footer's bottom row rather than floating.
 */
export function BackToTop() {
  return (
    <a
      href="#top"
      className="goto-top"
      id="gotoTop"
      onClick={(e) => {
        e.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }}
    >
      Goto Top
      <span className="arrow-up" aria-hidden="true">
        <span className="left-arm" />
        <span className="right-arm" />
        <span className="arrow-slide" />
      </span>
    </a>
  );
}
