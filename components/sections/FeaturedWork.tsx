import { AppLink as Link } from '@/components/ui/AppLink';
import Image from 'next/image';
import { projects } from '@/content/portfolio';
import { Carousel } from '@/components/ui/Carousel';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Three-up carousel. Each card is pulled up over the screenshot's lower edge
 * (translateY(-6.25rem)) — one of the six ★ effects, handled by
 * `.featured-work-box-data` in the ported stylesheet.
 */
export function FeaturedWork() {
  const items = projects.slice(0, 6).map((project) => (
    <div className="item" key={project.slug}>
      <Link href={`/portfolio/${project.slug}`}>
        <figure className="featured-work-box">
          <Image
            className="featured-work-box-img"
            src={project.thumbnail}
            alt={`${project.title} — Dream Weavers project`}
            width={900}
            height={640}
            loading="lazy"
          />
          <figcaption className="featured-work-box-data">
            <div className="card">
              <div className="card-body">
                {/* h3/h4 semantically, .h5/.h6 visually. The card sits under
                    this section's h2, so its title is a third-level heading;
                    the old h5/h6 skipped two levels for purely visual reasons.
                    Size is a class, not a tag. */}
                <h3 className="h5">
                  <span>{project.title}</span>
                </h3>
                <p>{project.summary}</p>
                <div className="row">
                  <div className="col-8">
                    <h4 className="h6">
                      <span>Disciplines</span>
                    </h4>
                    <small>{project.categories.join(', ')}</small>
                  </div>
                  <div className="col-4 d-flex justify-content-end align-items-end">
                    <span className="featured-work-box-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </Link>
    </div>
  ));

  return (
    <section id="featured-work" className="section-featured-work section-margin">
      <div className="container">
        <article>
          {/* A major page section: h2. It rendered as h3 to match the visual
              scale, which .h3 already provides. */}
          <Reveal as="h2" className="h3" duration={2} delay={0.5}>
            Featured{' '}
            <span>
              <strong>Work</strong>
            </span>
          </Reveal>
          <Reveal as="p" duration={2} delay={0.5}>
            Projects across agro chemicals, automotive and manufacturing, fintech,
            healthcare, real estate and retail — built by two teams working
            together.
          </Reveal>
        </article>

        <Carousel
          id="featuredWork"
          mode="cards"
          label="Featured work"
          items={items}
        />

        <p className="text-center">
          <Link href="/portfolio" className="btn btn-outline-dark">
            See All Projects
          </Link>
        </p>
      </div>
    </section>
  );
}
