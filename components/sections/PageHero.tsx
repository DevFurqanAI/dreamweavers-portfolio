import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The masthead for interior index pages (About, Team, Portfolio, Services,
 * Contact).
 *
 * Those pages opened with a bare title and a single line of copy on flat
 * white — correct, and completely undesigned next to the home page, which
 * layers a starfield, a soft brand glow and a drifting planet behind its
 * headline. This carries that same vocabulary at the scale of a short band
 * rather than a full viewport: the home hero keeps its 100vh treatment, its
 * illustration and its scroll cue, and stays the loudest thing on the site.
 *
 * The kicker is a navigational label, not a claim. Nothing here states a fact
 * about the business, so no page can drift out of sync with content/.
 */
export function PageHero({
  kicker,
  title,
  lead,
  action,
  children,
}: {
  /** Short uppercase label above the title, e.g. 'What we do'. */
  kicker: string;
  /** Usually a two-tone lockup: `Our <span>Services</span>`. */
  title: ReactNode;
  lead?: ReactNode;
  /** A call to action under the lead, as the home hero carries Book a Call. */
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero page-hero--figured section-margin">
      {/* Decorative only: the starfield and the glow carry no meaning and are
          painted by CSS on this element so the markup stays one empty div. */}
      <div className="page-hero-backdrop" aria-hidden="true" />

      <div className="container">
        {/* Two columns only when a page supplies something for the second
            one. Without that the copy would be stranded in the left half of
            a full-height band, which is the fault this hero was rebuilt to
            fix in the first place. */}
        <div className={children ? 'page-hero-grid' : undefined}>
          <div className="page-hero-copy">
            <Reveal className="page-hero-kicker" duration={1.2} delay={0.1}>
              <span className="page-hero-kicker-rule" aria-hidden="true" />
              {kicker}
            </Reveal>
            <Reveal as="h1" className="h1" duration={1.5} delay={0.2}>
              {title}
            </Reveal>
            {lead ? (
              <Reveal as="p" className="max-para page-hero-lead" duration={1.5} delay={0.35}>
                {lead}
              </Reveal>
            ) : null}
            {action ? (
              <Reveal className="page-hero-action" duration={1.5} delay={0.45}>
                {action}
              </Reveal>
            ) : null}
          </div>
          {children ? <div className="page-hero-aside">{children}</div> : null}
        </div>
      </div>

      <Image
        className="obj-planet"
        src="/img/planet.svg"
        alt=""
        width={146}
        height={144}
        loading="lazy"
      />
    </section>
  );
}
