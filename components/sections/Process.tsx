import { Reveal } from '@/components/ui/Reveal';

/**
 * The heading occupies the first grid cell, then five fill-on-hover cards.
 * Background goes to brand, arrow lifts 8px — handled by the stylesheet.
 */
const STEPS = [
  {
    title: 'Discover',
    body: 'We start by understanding the requirement, the business goal behind it, and the current state of whatever exists today. Nothing is scoped before that is clear.',
  },
  {
    title: 'Design',
    body: 'Wireframes, mockups and prototypes settle structure and flow before production code is written, so disagreements happen on paper rather than in a build.',
  },
  {
    title: 'Build',
    body: 'Iterative development against real data, with testing and QA running alongside rather than bolted on at the end.',
  },
  {
    title: 'Integrate',
    body: 'Connection to the platforms you already run — payments, accounting, CRM, logistics — with error handling and retries, not a one-off import.',
  },
  {
    title: 'Support',
    body: 'Training, documentation and ongoing maintenance, plus new modules as the business changes. Adoption is treated as part of delivery.',
  },
];

export function Process() {
  return (
    <section id="process" className="section-process section-margin">
      <div className="container">
        <div className="row">
          <div className="col-process-box-text-area col-xl-4 col-lg-12 col-md-12 col-sm-12">
            <div className="process-box process-box-text-area">
              <Reveal as="h2" className="h2" animation="fadeInLeft" duration={2} delay={0.5}>
                Our{' '}
                <span>
                  <strong>Process</strong>
                </span>
              </Reveal>
            </div>
          </div>

          {STEPS.map((step, i) => (
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={step.title}>
              <Reveal className="process-box" duration={2} delay={0.5 + i * 0.12}>
                <div className="process-box-wrap">
                  {/* Nested under this section's h2 — h3 semantically, .h5
                      visually. */}
                  <h3 className="h5">
                    <strong>{step.title}</strong>
                  </h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
