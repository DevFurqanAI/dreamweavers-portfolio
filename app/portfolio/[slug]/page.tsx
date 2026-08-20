import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { projects } from '@/content/portfolio';
import { site } from '@/content/site';
import { breadcrumbSchema, jsonLd, pageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<'/portfolio/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: `${project.title} — a Dream Weavers project covering ${project.categories.join(', ').toLowerCase()}.`,
    path: `/portfolio/${project.slug}`,
    // A placeholder project's own page says "Case study in preparation".
    // Asking a search engine to index a page that states it has no content
    // invites a thin-content assessment, so these are noindex,follow: the page
    // stays crawlable and still passes link equity onward, it just does not ask
    // to be listed. The /portfolio listing itself remains fully indexable.
    // Placeholder case studies remain excluded from indexing until substantive
    // project content is available. Setting isPlaceholder: false puts the page
    // back in the index and the sitemap automatically, with no code change.
    noindex: project.isPlaceholder,
  });
}

export default async function ProjectPage(props: PageProps<'/portfolio/[slug]'>) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Mirrors the visible breadcrumb nav below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Our Portfolio', path: '/portfolio' },
              { name: project.title, path: `/portfolio/${project.slug}` },
            ]),
          ),
        }}
      />

      <section className="page-hero section-margin">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb-nav">
            <Link href="/portfolio" className="breadcrumb-back">
              <span className="breadcrumb-back-arrow" aria-hidden="true">
                &larr;
              </span>
              All work
            </Link>
            <span className="breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="breadcrumb-current" aria-current="page">
              {project.title}
            </span>
          </nav>
          <Reveal as="h1" className="h1" duration={1.5} delay={0.2}>
            {project.title}
          </Reveal>
          {/* The one line that says what the engagement was. It was written
              for every project and rendered on neither the listing nor here,
              which left this page opening on a title, a row of discipline
              tags and a 900px logo. */}
          <p className="project-lead">{project.summary}</p>
          <ul className="project-meta">
            {project.categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-project-body section-margin">
        <div className="container">
          <Image
            src={project.heroImage}
            alt={`${project.title} — Dream Weavers project`}
            width={900}
            height={900}
            className="project-hero-img"
            priority
          />

          {project.isPlaceholder ? (
            /* Spec §7.1: the client publishes no case-study copy for any
               project. Say so plainly rather than inventing results. */
            <div className="case-study-pending">
              <h2 className="h5">Case study in preparation</h2>
              <p>
                A full write-up of this project is being prepared. For details on
                this engagement, including scope and outcomes,{' '}
                <a
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  message us on WhatsApp
                </a>{' '}
                or email{' '}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
              </p>
            </div>
          ) : (
            project.body.map((para) => <p key={para.slice(0, 40)}>{para}</p>)
          )}
        </div>
      </section>

      <section className="section-project-pager section-margin">
        <div className="container">
          <nav className="project-pager" aria-label="More projects">
            <Link href={`/portfolio/${prev.slug}`} className="project-pager-prev">
              <span>Previous</span>
              <strong>{prev.title}</strong>
            </Link>
            <Link href={`/portfolio/${next.slug}`} className="project-pager-next">
              <span>Next</span>
              <strong>{next.title}</strong>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
