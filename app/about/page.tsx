import type { Metadata } from 'next';
import Image from 'next/image';
import { pageMetadata } from '@/lib/seo';
import { team } from '@/content/team';
import { AppLink as Link } from '@/components/ui/AppLink';
import { site } from '@/content/site';
import { TabRail, type Tab } from '@/components/ui/TabRail';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { PageHero } from '@/components/sections/PageHero';
import { Marquee } from '@/components/ui/Marquee';

/**
 * The page's own summary, used for BOTH the meta description and the visible
 * hero lead so the two cannot drift apart.
 *
 * The hero previously led with `site.heroHeadline`, which is the global
 * tagline — the same sentence already carried by the home hero and the footer
 * blurb, so it appeared three times on this page and said nothing specific
 * about the company on the page that exists to describe it. This sentence is
 * the page's existing meta description, reused verbatim. Nothing new is
 * claimed by showing it.
 */
const ABOUT_SUMMARY =
  'Dream Weavers is a Multan-based digital partner running two specialised teams — eCommerce and Software — with 14 years in software development and 3+ years of eCommerce excellence.';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: ABOUT_SUMMARY,
  path: '/about',
});

/** All copy below is drawn from the client's published About page. */
const TABS: Tab[] = [
  {
    id: 'mission',
    label: 'Mission',
    content: (
      <>
        <h2 className="h3">
          Our <span>Mission</span>
        </h2>
        <p>
          Deliver innovative, scalable, customer-focused solutions that empower
          business growth.
        </p>
        <p>
          In practice that means scoping to what a business actually needs rather
          than to a package, and building on foundations that survive the growth
          they are meant to support.
        </p>
      </>
    ),
  },
  {
    id: 'vision',
    label: 'Vision',
    content: (
      <>
        <h2 className="h3">
          Our <span>Vision</span>
        </h2>
        <p>
          Shape the future of digital transformation and create opportunities for
          businesses to thrive.
        </p>
      </>
    ),
  },
  {
    id: 'values',
    label: 'Values',
    content: (
      <>
        <h2 className="h3">
          Our <span>Values</span>
        </h2>
        <ul className="values-list">
          <li>
            <strong>Integrity</strong> — transparent, reliable, client-focused
            methodology.
          </li>
          <li>
            <strong>Innovation</strong> — technology, automation, and growth
            systems expertise.
          </li>
          <li>
            <strong>Commitment</strong> — seeing an engagement through adoption,
            not just delivery.
          </li>
          <li>
            <strong>Customer success</strong> — measured by the client&rsquo;s
            outcome, not the deliverable.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'story',
    label: 'Our story',
    content: (
      <>
        <h2 className="h3">
          A story of resilience and <span>innovation</span>
        </h2>
        <p>
          Dream Weavers brings together 14 years in software development and more
          than three years of eCommerce excellence. The company grew from a
          software firm into a comprehensive digital partner through a dedication
          to turning business needs into working systems.
        </p>
        <p>
          Two specialised teams — eCommerce and Software — operate together rather
          than in parallel, which is why a Shopify storefront and the ERP behind it
          can be built by people who speak to each other daily.
        </p>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Who we are"
        title={
          <>
            About <span>Dream Weavers</span>
          </>
        }
        lead={ABOUT_SUMMARY}
      />

      <section className="section-dark section-about-tabs">
        <div className="container">
          <TabRail tabs={TABS} />
        </div>
      </section>

      {/* The counters arrived unannounced — a bare band of four figures between
          two sections, identical to the one on the home page. On the page that
          exists to describe the company those figures ARE the substance, so
          they get a heading. "By the numbers" is a structural label; every
          claim under it is the client's own published figure, unchanged. */}
      <section className="web-counters gray-bg section-counters--titled">
        <div className="container-fluid">
          <Reveal as="h2" className="h2 text-center" duration={2} delay={0.3}>
            By the <span>numbers</span>
          </Reveal>
          <div className="web-counters-wrap">
            {site.counters.map((c) => (
              <Counter key={c.label} value={c.value} suffix={c.suffix} label={c.label} />
            ))}
          </div>
        </div>
      </section>

      {/* About never surfaced the people at all — the only route to /team/ was
          the nav and the footer. These are the three the client lists first,
          with their published names, roles and portraits; the full team stays
          on /team/ so this stays a way in rather than a second copy of it. */}
      <section className="section-about-team section-margin" id="team-preview">
        <div className="container">
          <Reveal as="h2" className="h2" duration={2} delay={0.3}>
            The people <span>behind it</span>
          </Reveal>
          <div className="team-grid team-grid--preview">
            {team.slice(0, 3).map((member, i) => (
              <Reveal
                key={member.slug}
                className="team-card"
                duration={1.6}
                delay={0.2 + i * 0.12}
              >
                <div className="team-card-photo">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at Dream Weavers`}
                    width={600}
                    height={750}
                    loading="lazy"
                  />
                </div>
                <h3 className="h5 team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                <SocialLinks links={member.social} ownerName={member.name} />
              </Reveal>
            ))}
          </div>
          <p className="text-center">
            <Link href="/team" className="btn btn-outline-dark">
              Meet the team
            </Link>
          </p>
        </div>
      </section>

      <section className="section-industries section-margin">
        <div className="container">
          <Reveal as="h2" className="h2" duration={2} delay={0.4}>
            Industries we <span>serve</span>
          </Reveal>
          <ul className="industries-list">
            {site.industries.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
          <p className="text-center">
            <Link href="/contact" className="btn btn-outline-dark">
              Talk to us
            </Link>
          </p>
        </div>
      </section>

      <Marquee rows={site.marqueeRows} />
    </>
  );
}
