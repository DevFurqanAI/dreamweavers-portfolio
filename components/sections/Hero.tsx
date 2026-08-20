import { AppLink as Link } from '@/components/ui/AppLink';
import Image from 'next/image';

/**
 * Full-viewport hero, matching the reference design's structure exactly:
 *
 *   small uppercase kicker  ->  large brand-colour headline  ->  one outline
 *   button, with an illustration on the right, the starfield backdrop, and an
 *   animated scroll cue centred below.
 *
 * The h1 is a two-part lockup: the base text is the small kicker (--step-2)
 * and the <span> is the large statement (--step-6, display:block).
 */
export function Hero() {
  return (
    <section id="hero" className="hero-section hero-section--has-image">
      <div className="hero-section-wrap">
        <div className="container">
          <div className="hero-section--middle">
            <div className="hero-copy">
              <h1 className="h1">
                Ideas that ship
                <span>E-commerce &amp; Software</span>
              </h1>

              <p className="text-left">
                <Link href="/contact" className="btn btn-outline-primary">
                  Book a Call
                </Link>
              </p>
            </div>

            <div className="hero-visual">
              <Image
                className="hero-visual__img"
                src="/img/hero-visual.webp"
                alt="Line illustration of a website, a shopping cart and a CRM system"
                width={920}
                height={660}
                priority
                fetchPriority="high"
              />
            </div>
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
      </div>

      <div className="scroll-more" id="scrollMore">
        {/* The inner bar animates its height, so the cue reads as a scroll
            gesture rather than a static icon.

            The animation is CSS, not SVG SMIL. A <animate repeatCount=
            "indefinite"> element ignores prefers-reduced-motion entirely —
            the media query cannot reach it — so the cue kept moving for users
            who had asked the system for stillness. Driving the same geometry
            from CSS puts it back under §6's reduced-motion block. */}
        <svg width="39" height="61" viewBox="0 0 39 61" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="38" y="55" width="37" height="54" rx="18.5" transform="rotate(-180 38 55)" stroke="var(--accent)" strokeWidth="2" />
          <rect className="scroll-cue-bar" x="21" y="58" width="3" height="40" rx="1.5" transform="rotate(-180 21 61)" fill="var(--accent)" />
          <circle cx="19.5" cy="11.5" r="3.5" transform="rotate(-180 19.5 11.5)" fill="var(--accent)" />
        </svg>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
