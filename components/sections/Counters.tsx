import { site } from '@/content/site';
import { Counter } from '@/components/ui/Counter';

/**
 * Outline numerals, solid on hover — a weight change, not a colour change.
 *
 * Figures are the client's real published numbers from their About page.
 * Their live homepage counters all render "1+" because the count-up
 * animation there is broken.
 */
export function Counters() {
  return (
    <section id="counters" className="web-counters gray-bg">
      <div className="container-fluid">
        <div className="web-counters-wrap">
          {site.counters.map((c) => (
            <Counter key={c.label} value={c.value} suffix={c.suffix} label={c.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
