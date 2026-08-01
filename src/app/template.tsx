"use client";

import { useEffect, useRef } from "react";

// Next remounts template.tsx on every route change (but not on same-page hash
// navigation), which gives each route a natural, isolated enter transition
// without needing a routing library or the View Transitions API.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add("route-enter");
    const frame = window.requestAnimationFrame(() => node.classList.add("route-enter-active"));

    // A lingering `transform` (even `translateY(0)`) on this wrapper would make it
    // the containing block for every descendant `position: fixed` element (the
    // custom cursor layer, the nav, the menu panel), silently breaking them. Strip
    // both classes once the enter transition finishes so the wrapper goes back to
    // having no transform at all.
    const settle = () => node.classList.remove("route-enter", "route-enter-active");
    node.addEventListener("transitionend", settle, { once: true });

    return () => {
      window.cancelAnimationFrame(frame);
      node.removeEventListener("transitionend", settle);
    };
  }, []);

  return (
    <div ref={ref} className="route-transition">
      {children}
    </div>
  );
}
