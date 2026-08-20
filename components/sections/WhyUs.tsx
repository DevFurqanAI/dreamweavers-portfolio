import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The dark band. Centred two-tone heading, uppercase accordion of audience
 * segments, each panel holding a zig-zag challenge/solution ladder.
 *
 * Content is drawn from what Dream Weavers publishes about who they serve:
 * startups, SMEs and enterprises, with two specialised teams.
 */
const SEGMENTS: { id: string; label: string; challenge: string; solution: string }[] = [
  {
    id: 'startups',
    label: 'Startups',
    challenge:
      'You need to be in market before the runway runs out, but you cannot afford to build something that has to be thrown away at the first sign of traction.',
    solution:
      'We scope to the smallest thing that proves the idea, then build it on foundations that survive growth — so the MVP becomes version one rather than technical debt.',
  },
  {
    id: 'smes',
    label: 'SMEs',
    challenge:
      'Operations run across spreadsheets, a storefront, and three tools that do not talk to each other, so the same data gets entered more than once.',
    solution:
      'ERP and CRM work that centralises the process first and automates second, integrated with the systems you already run rather than replacing them.',
  },
  {
    id: 'enterprises',
    label: 'Enterprises',
    challenge:
      'Legacy systems hold the business together and cannot simply be switched off, but they are increasingly expensive to maintain and hard to extend.',
    solution:
      'Migration and modernisation with validated data transfer, re-engineering older applications into cloud-ready solutions in stages rather than a single cutover.',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce brands',
    challenge:
      'Launching a store is easy; launching one with the right products, working payments, and traffic that converts is where most attempts stall.',
    solution:
      'A complete Shopify build — product research, store, ad accounts, COD and card payments — with two investment models if you would rather we operated it.',
  },
];

function Ladder({ challenge, solution }: { challenge: string; solution: string }) {
  return (
    <ol className="step-cards">
      <li>
        <div className="step-cards-count">
          <span>01.</span>
        </div>
        <div className="column">
          <article className="card-mini">
            <h4 className="card-mini-heading">The challenge</h4>
            <p>{challenge}</p>
          </article>
        </div>
      </li>
      <li>
        <div className="step-cards-count">
          <span>02.</span>
        </div>
        <div className="column">
          <article className="card-mini primary">
            <h4 className="card-mini-heading">How we approach it</h4>
            <p>{solution}</p>
          </article>
        </div>
      </li>
    </ol>
  );
}

export function WhyUs() {
  const items: AccordionItem[] = SEGMENTS.map((s) => ({
    id: s.id,
    label: s.label,
    content: <Ladder challenge={s.challenge} solution={s.solution} />,
  }));

  return (
    <section id="why-us" className="section-dark section-why-us">
      <div className="container">
        <Reveal as="h2" className="h2 text-center" duration={2} delay={0.5}>
          Why <span>Us?</span>
        </Reveal>
        {/* The reference opens with every row closed. */}
        <Accordion items={items} id="accordionWhyUs" />
      </div>
    </section>
  );
}
