import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { services } from '@/content/services';
import { site } from '@/content/site';
import {
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  ORGANIZATION_ID,
  pageMetadata,
  SITE_URL,
} from '@/lib/seo';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<'/services/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === slug);
  const next = services[(index + 1) % services.length];

  const faqItems: AccordionItem[] = service.faqs.map((f, i) => ({
    id: `faq-${i}`,
    label: f.question,
    content: <p>{f.answer}</p>,
  }));

  return (
    <>
      {/* FAQPage structured data, generated from the service's own FAQs. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      {/* Service schema. Every field mirrors something rendered on this page —
          the heading, the lead paragraph and the hero image — and `provider`
          points at the Organization node in the root layout by @id rather than
          restating the company as a second, unlinked entity. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.shortDescription,
            url: absoluteUrl(`/services/${service.slug}`),
            image: `${SITE_URL}${service.heroImage}`,
            provider: { '@id': ORGANIZATION_ID },
          }),
        }}
      />

      {/* Mirrors the visible breadcrumb nav below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Our Services', path: '/services' },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      {/* Hero and picture are one unit. They used to be two stacked sections:
          216px of empty band, then a title in the left 40% with the right half
          blank, then the image marooned in its own row below. Paired in a grid
          they fill the width, and the ask arrives at the top of the page
          instead of only at the very bottom. */}
      <section className="page-hero section-service-hero">
        <div className="container">
          {/* The route back to the listing was a plain underlined word in a
              muted 14px line, which is not a control anyone finds on a first
              visit. It is the only way back other than the mega-menu, so it
              gets the shape of a button and says where it goes. */}
          <nav aria-label="Breadcrumb" className="breadcrumb-nav">
            <Link href="/services" className="breadcrumb-back">
              <span className="breadcrumb-back-arrow" aria-hidden="true">
                &larr;
              </span>
              All services
            </Link>
            <span className="breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="breadcrumb-current" aria-current="page">
              {service.title}
            </span>
          </nav>

          <div className="service-hero-grid">
            <div className="service-hero-copy">
              {/* The same mark the listing card carries, so arriving here reads
                  as continuing from the card you clicked. */}
              <p className="service-hero-eyebrow">
                <span className="service-hero-icon" aria-hidden="true">
                  <i className={service.icon} />
                </span>
                <span>Service</span>
              </p>
              <Reveal as="h1" className="h1" duration={1.5} delay={0.2}>
                {service.title}
              </Reveal>
              <p className="service-lead">{service.shortDescription}</p>
              <div className="service-hero-actions">
                <a
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us on WhatsApp
                </a>
                <a className="service-hero-jump" href="#included">
                  See what&rsquo;s included <span aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>

            <div className="service-hero-media">
              <Image
                src={service.heroImage}
                alt={`${service.title} at Dream Weavers`}
                width={1024}
                height={640}
                className="service-hero-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-service-body section-margin">
        <div className="container">
          <div className="service-intro">
            <p className="section-label">Overview</p>
            <div className="service-intro-prose">
              {service.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-included" id="included">
        <div className="container">
          <Reveal as="h2" className="h2" duration={2} delay={0.3}>
            What&rsquo;s <span>included</span>
          </Reveal>
          <ol className="step-cards">
            {service.included.map((item, i) => (
              <li key={item.title}>
                <div className="step-cards-count">
                  <span>{String(i + 1).padStart(2, '0')}.</span>
                </div>
                <div className="column">
                  <article className="card-mini">
                    <h3 className="card-mini-heading">{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-process section-margin">
        <div className="container">
          <div className="row">
            {/* Full width: at col-xl-4 the heading took a cell in a 3-wide
                row, so four steps wrapped 2 + 2 with the second row offset
                under the heading. Full width lets the four sit as one row. */}
            <div className="col-process-box-text-area col-lg-12">
              <div className="process-box process-box-text-area">
                <Reveal as="h2" className="h2" animation="fadeInLeft" duration={2} delay={0.3}>
                  How we <span><strong>work</strong></span>
                </Reveal>
              </div>
            </div>
            {service.processSteps.map((step, i) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={step.title}>
                <Reveal className="process-box" duration={1.6} delay={0.2 + i * 0.12}>
                  <div className="process-box-wrap">
                    <h3 className="h5"><strong>{step.title}</strong></h3>
                    <p>{step.description}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-capabilities section-margin">
        <div className="container">
          <Reveal as="h2" className="h2" duration={2} delay={0.3}>
            What this <span>covers</span>
          </Reveal>
          <ul className="industries-list">
            {service.capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Heading beside the list rather than above it: stacked, the accordion
          left the right half of the page empty and the section read as a lone
          grey box floating in white. */}
      <section className="section-faq section-margin" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-intro">
              <Reveal as="h2" className="h2" duration={2} delay={0.3}>
                Common <span>questions</span>
              </Reveal>
              <p className="faq-intro-note">
                Anything not answered here, ask us directly &mdash; we reply on WhatsApp.
              </p>
            </div>
            <div className="faq-list">
              <Accordion items={faqItems} id={`faq-${service.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* The page's one conversion moment. It used to be centred text on white
          between two tall white sections, which made it the quietest thing on
          the page. A dark band is the vocabulary the rest of the site already
          uses to mark a section as load-bearing. */}
      <section className="section-dark section-service-cta">
        <div className="container">
          <div className="service-cta-inner">
            <h2 className="h3">
              Talk to us about <span>{service.title}</span>
            </h2>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
          </div>
          <p className="service-next">
            <span>Next service</span>
            <Link href={`/services/${next.slug}`}>
              {next.title}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
