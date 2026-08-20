'use client';

import { useId, useState, type ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * The Why Us accordion. One panel open at a time.
 *
 * The panel animates with a `grid-template-rows: 0fr -> 1fr` transition
 * rather than `hidden`. `hidden` is display:none, which cannot transition —
 * the panel used to snap open and then fade, which read as a stutter. The
 * grid technique animates real height without measuring pixels in JS.
 *
 * Closed panels stay in the DOM so they can animate, so they are marked
 * `inert` and `aria-hidden` to keep them out of the tab order and the
 * accessibility tree.
 *
 * The +/- sign is two bars: the horizontal one fades AND rotates while both
 * spin 180deg, so open and close read as one continuous motion. That lives
 * in the ported stylesheet as `.plus-minus-sign`.
 */
export function Accordion({
  items,
  id,
  defaultOpen = null,
}: {
  items: AccordionItem[];
  id?: string;
  defaultOpen?: string | null;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const generated = useId();
  const accordionId = id ?? `accordion-${generated}`;

  return (
    <div className="accordion" id={accordionId}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${accordionId}-panel-${item.id}`;
        const headingId = `${accordionId}-heading-${item.id}`;

        return (
          <div
            className="card accordion-item"
            key={item.id}
            data-open={isOpen ? 'true' : 'false'}
          >
            <div className="card-header" id={headingId}>
              <h3 className="mb-0">
                <button
                  className={`btn btn-link btn-block text-left${isOpen ? '' : ' collapsed'}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                >
                  <span>{item.label}</span>
                  <div className={`plus-minus-sign${isOpen ? ' opened' : ''}`}>
                    <div className="horizontal" />
                    <div className="vertical" />
                  </div>
                </button>
              </h3>
            </div>

            <div
              id={panelId}
              className="accordion-panel"
              aria-labelledby={headingId}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="accordion-panel-inner">
                {/* No `no-padding` here: that utility is `padding: 0
                    !important`, which silently beat every rule that tried to
                    line an answer up with its own question. The panel's
                    padding is set in CSS per section instead. */}
                <div className="card-body">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
