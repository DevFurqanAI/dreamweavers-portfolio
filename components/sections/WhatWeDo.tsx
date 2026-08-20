import { Reveal } from '@/components/ui/Reveal';

/** Two-tone heading with a right-indented paragraph. */
export function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-what-we-do section-margin">
      <div className="container">
        <Reveal as="h2" className="h2" animation="fadeInLeft" duration={2} delay={0.5}>
          What we <span>do</span>
        </Reveal>
        <Reveal as="p" className="max-para" duration={2} delay={0.5}>
          Dream Weavers runs two specialised teams — eCommerce and Software —
          under one roof. That means a Shopify store and the ERP behind it can be
          built by people who talk to each other daily, rather than by two
          agencies who never meet. Fourteen years in software development and
          three in eCommerce sit behind every engagement.
        </Reveal>
      </div>
    </section>
  );
}
