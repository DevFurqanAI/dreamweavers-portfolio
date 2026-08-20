import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AppLink as Link } from '@/components/ui/AppLink';
import { services } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { Marquee } from '@/components/ui/Marquee';
import { site } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Our Services',
  description:
    'Ten services from Dream Weavers — AI apps and integration, database management, digital marketing, ERP/CRM, lead generation, mobile apps, Shopify, software and web development.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="What we do"
        title={
          <>
            Our <span>Services</span>
          </>
        }
        lead="Two specialised teams covering the whole path from a storefront to the systems behind it."
        action={
          <Link href="/contact" className="btn btn-outline-primary">
            Book a Call
          </Link>
        }
      >
        {/* The full index, in the first screen. The card grid below is the
            browsing view; this is the jump list, so arriving with a service
            already in mind does not cost a scroll. Same ten links, same
            order, so the two never disagree. */}
        <nav className="hero-index" aria-label="All services">
          <p className="hero-index-head">All ten services</p>
          <ol>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <span className="hero-index-icon" aria-hidden="true">
                    <i className={service.icon} />
                  </span>
                  <span className="hero-index-label">{service.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <section className="section-our-services section-margin" id="services">
        <div className="container">
          <div className="section-our-services-list row">
            {services.map((service, i) => {
              const [first, ...rest] = service.title.split(' ');
              return (
                <div
                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                  key={service.slug}
                >
                  {/* No aria-label — same reason as the homepage grid:
                      "<title> services" does not contain the card's visible
                      text, so it replaced a longer visible label with a shorter
                      accessible name (WCAG 2.5.3, Label in Name). */}
                  <Link href={`/services/${service.slug}`}>
                    <Reveal
                      as="figure"
                      className="service-box"
                      duration={1.6}
                      delay={0.2 + (i % 4) * 0.12}
                    >
                      <div className="service-box-wrap">
                        <span className="service-box-icon" aria-hidden="true">
                          <i className={service.icon} style={{ fontSize: '3rem' }} />
                        </span>
                        <h2 className="service-box-heading h6">
                          <span>{first}</span>
                          <span>{rest.join(' ')}</span>
                        </h2>
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
        </div>
      </section>

      <Marquee rows={site.marqueeRows} />
    </>
  );
}
