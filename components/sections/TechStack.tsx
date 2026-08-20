import { Reveal } from '@/components/ui/Reveal';

/**
 * Centred two-tone heading over a row of vendor logos at full brand strength.
 *
 * These are real vendor logos rather than text word-marks, which is what the
 * reference uses and what makes the row read as a capability statement. Every
 * entry is a technology Dream Weavers names on its own service pages.
 *
 * In their OWN brand colours, not monochrome and not dimmed: a stack row is a
 * factual claim about capability, and the coloured marks are recognised
 * instantly where washed-out ones read as half-loaded. Hover state is a
 * tinted plate behind the mark rather than a brightness change (see
 * enhancements.css §28).
 *
 * Plain <img> rather than next/image: these are small static SVGs, and
 * next/image would need dangerouslyAllowSVG to serve them.
 */
const STACK = [
  { slug: 'react-js', label: 'React' },
  { slug: 'angular', label: 'Angular' },
  { slug: 'vue-js', label: 'Vue.js' },
  { slug: 'node-js', label: 'Node.js' },
  { slug: 'laravel', label: 'Laravel' },
  { slug: 'php', label: 'PHP' },
  { slug: 'wordpress', label: 'WordPress' },
  { slug: 'flutter', label: 'Flutter' },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="section-technology section-margin">
      <div className="container">
        <Reveal as="h2" className="h2 text-center" duration={2} delay={0.5}>
          Core Technology <span>Stack</span>
        </Reveal>

        <div className="section-technology-list">
          {STACK.map((tech, i) => (
            <Reveal
              key={tech.slug}
              className="tech-box"
              duration={1.2}
              delay={0.1 + (i % 4) * 0.08}
            >
              <img
                src={`/img/tech/${tech.slug}-colour.svg`}
                alt={`${tech.label} logo`}
                width={90}
                height={90}
                loading="lazy"
                decoding="async"
              />
              <span className="tech-box-label">{tech.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
