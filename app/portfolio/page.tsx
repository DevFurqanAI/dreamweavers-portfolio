import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AppLink as Link } from '@/components/ui/AppLink';
import { site } from '@/content/site';
import { projects } from '@/content/portfolio';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { PageHero } from '@/components/sections/PageHero';
import { Marquee } from '@/components/ui/Marquee';

export const metadata: Metadata = pageMetadata({
  title: 'Our Portfolio',
  description:
    'Selected Dream Weavers projects across agro chemicals, automotive and manufacturing, e-commerce, fintech, healthcare, real estate and enterprise systems.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        kicker="Selected work"
        title={
          <>
            Our <span>Portfolio</span>
          </>
        }
        lead="Work across the industries Dream Weavers serves — built by the eCommerce and Software teams together."
        action={
          <Link href="/contact" className="btn btn-outline-primary">
            Start a project
          </Link>
        }
      >
        {/* A jump list, not a picture. The obvious thing to put here is the
            featured project's image, but every thumbnail on this page is a
            client logo — one blown up to hero size is the same mistake the
            detail page was making. Names carry more than a marque does. */}
        <nav className="hero-index" aria-label="All projects">
          <p className="hero-index-head">All ten projects</p>
          <ol>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/portfolio/${project.slug}`}>
                  <span className="hero-index-label">{project.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <section className="section-portfolio section-margin" id="portfolio">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>

      <Marquee rows={site.marqueeRows} />
    </>
  );
}
