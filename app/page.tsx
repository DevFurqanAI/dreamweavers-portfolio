import { site } from '@/content/site';
import { Hero } from '@/components/sections/Hero';
import { WhyUs } from '@/components/sections/WhyUs';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { TechStack } from '@/components/sections/TechStack';
import { Process } from '@/components/sections/Process';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { TestimonialBand } from '@/components/sections/TestimonialBand';
import { Counters } from '@/components/sections/Counters';
import { Marquee } from '@/components/ui/Marquee';

/**
 * The section order is the spine of this design. Do not reorder.
 *
 *  1 Hero              full viewport, copy left / illustration right
 *  2 Why Us   (dark)   uppercase accordion, challenge/solution ladder
 *  3 What We Do        two-tone heading, indented paragraph
 *  4 Our Services      4 cards, icon top-left, title bottom-left
 *  5 Tech Stack        centred heading, dimmed row
 *  6 Our Process       heading in cell one, then 5 fill-on-hover cards
 *  7 Featured Work     3-up carousel, card overlapping the screenshot
 *  8 Clients           logo wall, linking to each project
 *  9 Testimonial       brand slab, portrait overhanging
 * 10 Counters          outline numerals
 * 11 Marquee           three rows, middle reversed
 * 12 Footer            provided by the root layout
 *
 * Clients sits directly after Featured Work by design: the work comes first,
 * then who it was for. It is the one addition to the source design's spine.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <WhatWeDo />
      <ServicesGrid />
      <TechStack />
      <Process />
      <FeaturedWork />
      <ClientLogos />
      <TestimonialBand />
      <Counters />
      <Marquee rows={site.marqueeRows} />
    </>
  );
}
