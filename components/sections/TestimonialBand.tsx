import { testimonials } from '@/content/team';
import { Carousel } from '@/components/ui/Carousel';

/**
 * Brand slab bleeding left, portrait overhanging the top, dots below.
 *
 * ⚠ NO REAL TESTIMONIALS EXIST. dreamweaversoffice.com/testimonials/ is a
 * live page that publishes no client quotes — checked directly, not assumed.
 * The section renders an explicitly labelled placeholder so the gap is
 * obvious to anyone reviewing the build.
 *
 * DO NOT replace the placeholder text with an invented quote.
 */
export function TestimonialBand() {
  const items = testimonials.map((t, i) => (
    <div className="item container" key={i}>
      <article className="owl-testimonial-article">
        {t.isPlaceholder && (
          <p className="testimonial-placeholder-note">
            <strong>Placeholder</strong> — awaiting a real client testimonial.
          </p>
        )}
        <p>&ldquo;{t.quote}&rdquo;</p>
        <span className="owl-testimonial-client-name">
          {t.clientName}
          {t.clientCompany ? `, ${t.clientCompany}` : ''}
        </span>
      </article>
    </div>
  ));

  return (
    <section id="testimonial" className="section-testimonial gray-bg">
      <div className="section-testimonial-wrap">
        <Carousel
          id="owl-testimonial"
          className="owl-testimonial"
          mode="fade"
          label="Client testimonials"
          items={items}
        />
      </div>
    </section>
  );
}
