'use client';

import { useEffect, useRef } from 'react';
import { AppLink as Link } from '@/components/ui/AppLink';
import { site } from '@/content/site';

const PRIMARY = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/portfolio', label: 'Our Portfolio' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact Us' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MegaMenu({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLElement>(null);

  // `.menu-open` on <body> is what lifts the panel out of visibility:hidden,
  // so this component owns it. It must be set BEFORE focus moves in: React
  // runs child effects before parent effects, so leaving the class to the
  // header meant focusing a still-hidden panel, which is a no-op.
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    // The source design offers no keyboard escape from the open panel.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        returnFocusTo.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !panel) return;

      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, returnFocusTo]);

  return (
    /* `inert` belts the aria-hidden braces: aria-hidden removes the panel from
       the accessibility tree but leaves its links tabbable, and the panel is
       hidden by a transitioned `visibility` (see enhancements.css §5) which a
       stalled or overridden transition can leave interactive. inert removes
       focusability and pointer events outright. */
    <section
      className="mega-menu"
      id="megaMenuPanel"
      ref={panelRef}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mega-menu-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <nav className="mega-menu-nav" aria-label="Primary navigation">
                <ul className="primary-menu">
                  {PRIMARY.map((item) => (
                    <li className="menu-item" key={item.href}>
                      {/* title drives the outline ghost copies the CSS
                          wipes open on hover via attr(title). */}
                      <Link href={item.href} title={item.label} onClick={onClose}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-md-4">
              <div className="mega-menu-details">
                <h6 className="h6">
                  <span>
                    <strong>Contact</strong>
                  </span>
                </h6>
                <nav className="mega-menu-sub-nav" aria-label="Contact information">
                  <ul>
                    <li>
                      <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>
                        {site.contact.phone}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                    </li>
                  </ul>
                </nav>

                <h6 className="h6">
                  <span>
                    <strong>Social</strong>
                  </span>
                </h6>
                <nav className="mega-menu-sub-nav" aria-label="Social media">
                  <ul>
                    {site.social.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                        >
                          <i className={s.icon} aria-hidden="true" /> {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
