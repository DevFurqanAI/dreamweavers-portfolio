'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { MegaMenu } from './MegaMenu';

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useScrollProgress();

  // The `.menu-open` body class is owned by MegaMenu — it must be applied
  // before focus moves into the panel, and child effects run first.

  return (
    <>
      <header className="main-header" id="mainHeader">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-5 main-header--left">
              {/* A HORIZONTAL lockup, not the supplied stacked one. The
                  stacked mark puts the wordmark under the monogram, so at a
                  header's height the words shrink to an illegible smudge —
                  they were unreadable on mobile. Monogram plus typeset name
                  side by side keeps both legible at any strip height, and the
                  name renders in the site's own face rather than as bitmap. */}
              {/* No aria-label here. WCAG 2.5.3 (Label in Name) requires the
                  accessible name to CONTAIN the visible text; the wordmark
                  computes to "DreamWeavers" with no space, so an aria-label of
                  "Dream Weavers — home" replaced it with a string that did not
                  match — flagged as label-content-name-mismatch. Appending a
                  visually-hidden suffix instead keeps the destination hint for
                  screen readers while the visible text stays part of the name. */}
              <Link href="/" className="main-logo">
                <Image
                  className="main-logo-mark"
                  src="/img/logo-mark.webp"
                  alt=""
                  width={480}
                  height={312}
                  priority
                />
                {/* The header stays on top of the open mega-menu panel, which
                    is dark, and the standard mark's ink is not. Swapped rather
                    than filtered so the brand teal survives the inversion. */}
                <Image
                  className="main-logo-mark main-logo-mark--invert"
                  src="/img/logo-mark-white.webp"
                  alt=""
                  width={480}
                  height={311}
                  loading="lazy"
                />
                <span className="main-logo-word">
                  <strong>Dream</strong>
                  <em>Weavers</em>
                </span>
                <span className="sr-only"> — home</span>
              </Link>
            </div>

            <div className="col-md-7 col-7 main-header--right">
              <nav className="main-header--nav" aria-label="Quick contact">
                <Link href="/contact">Get In Touch</Link>
              </nav>

              <button
                type="button"
                className="toggle-menu"
                id="btnToggleMenu"
                ref={toggleRef}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="megaMenuPanel"
                onClick={() => setOpen((v) => !v)}
              >
                {/* Painted as a conic-gradient from --menu-progress. */}
                <div className="toggle-menu-progress" />
                <div className="toggle-menu-wrap">
                  <span className="toggle-menu-line1" />
                  <span className="toggle-menu-line2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MegaMenu open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef} />
    </>
  );
}
