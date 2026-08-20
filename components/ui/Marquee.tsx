'use client';

/**
 * Three infinite rows of outline type, middle row reversed — one of the six
 * effects that carry this design's personality.
 *
 * Each word is ONE span. The source stacked a second solid copy behind the
 * outline and revealed it on hover, offset 5px — but `-webkit-text-stroke`
 * adds to glyph width, so the stroked copy and the unstroked one had
 * different widths (797px vs 823px on one word) and the reveal rendered as
 * an illegible smear rather than an echo. Filling the word itself gives the
 * same outline-to-solid read with nothing to misalign.
 *
 * Clash Display has no outline cut, so `u-outline-fallback` renders the
 * outline with -webkit-text-stroke (enhancements.css §3).
 *
 * Rows are duplicated so the 10s linear loop has no seam. The whole band is
 * decorative and hidden from assistive tech; reduced motion stops it.
 */
export function Marquee({ rows }: { rows: string[][] }) {
  return (
    <section className="section-marquee" id="marquee">
      <div className="section-marquee-wrap">
        {rows.map((row, i) => (
          <div className="section-marquee-item" key={i}>
            <div className="marquee">
              <div
                className="marquee-inner"
                aria-hidden="true"
                style={i % 2 === 1 ? { animationDirection: 'reverse' } : undefined}
              >
                {/* Two copies for a seamless loop. */}
                {[0, 1].flatMap((copy) =>
                  row.flatMap((word, w) => [
                    <div key={`${copy}-${w}-word`}>
                      <span className="marquee-text u-outline-fallback">{word}</span>
                    </div>,
                    <div key={`${copy}-${w}-sep`} aria-hidden="true">
                      <span className="marquee-text u-outline-fallback"> - </span>
                    </div>,
                  ]),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
