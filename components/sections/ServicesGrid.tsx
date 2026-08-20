import { AppLink as Link } from '@/components/ui/AppLink';
import { services } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Four service cards: icon top-left, title bottom-left, description clipped
 * to max-height 0 at rest.
 *
 * On hover the card fills with the brand colour, grows past its own bounds
 * and re-centres on itself while the description unclips — absolutely
 * positioned inside a fixed-height shell so siblings never shift. That is
 * one of the six ★ effects and lives entirely in the ported stylesheet.
 */
export function ServicesGrid({ limit = 4 }: { limit?: number }) {
  return (
    <section id="services" className="section-our-services section-margin">
      <div className="container">
        {/* This section's heading, so h2. It was an h6 to get the small
            uppercase treatment, which .h6 supplies on its own. */}
        <Reveal as="h2" className="h6" duration={2} delay={0.5}>
          <span>
            <strong>Our Services</strong>
          </span>
        </Reveal>

        <div className="section-our-services-list row">
          {services.slice(0, limit).map((service, i) => {
            const [first, ...rest] = service.title.split(' ');
            return (
              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                key={service.slug}
              >
                {/* No aria-label. It read "<title> services", which does not
                    contain the card's visible text (the heading plus its list
                    of highlights) and so replaced a longer visible label with a
                    shorter name — WCAG 2.5.3, Label in Name. Letting the card's
                    own content name the link keeps the two in agreement, and
                    the name still begins with the service title. */}
                <Link href={`/services/${service.slug}`}>
                  <Reveal
                    as="figure"
                    className="service-box"
                    duration={2}
                    delay={0.5 + i * 0.15}
                  >
                    <div className="service-box-wrap">
                      <span className="service-box-icon" aria-hidden="true">
                        <i className={service.icon} style={{ fontSize: '3rem' }} />
                      </span>
                      {/* A card under this section's h2 — h3, not h6. */}
                      {/* The space between the two spans is deliberate. They
                          render as separate lines, so it is invisible — but
                          without it the heading's text content concatenates to
                          "AIApps & Integration", which no longer contains the
                          link's accessible name and trips WCAG 2.5.3 (Label in
                          Name). */}
                      <h3 className="service-box-heading">
                        <span>{first}</span>{' '}
                        <span>{rest.join(' ')}</span>
                      </h3>
                      <figcaption className="service-box-figcaption">
                        <ol>
                          {service.highlights.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ol>
                      </figcaption>
                    </div>
                  </Reveal>
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center">
          <Link href="/services" className="link-primary">
            view all services
          </Link>
        </p>
      </div>
    </section>
  );
}
