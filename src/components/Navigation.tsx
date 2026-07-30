"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation } from "@/content/site";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 18);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Dreamweavers, return to top">
          <span className="brand__mark" aria-hidden="true">
            <Image src="/brand/dreamweavers-mark.png" alt="" width={54} height={40} priority />
          </span>
          <span className="brand__word"><b>Dream</b><b>Weavers</b></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} data-magnetic>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          suppressHydrationWarning
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="menu-toggle__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div className={`menu-panel${open ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="menu-panel__glow" />
        <div className="menu-panel__brand" aria-hidden="true">
          <Image src="/brand/dreamweavers-logo-source.jpg" alt="" width={120} height={92} />
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>Ideas, design, software, commerce and growth—woven into one digital system.</p>
      </div>
    </>
  );
}
