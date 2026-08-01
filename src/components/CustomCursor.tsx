"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      document.documentElement.classList.add("cursor-ready");
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const active = Boolean(target?.closest("a, button, input, textarea, select, [data-cursor]"));
      ring.classList.toggle("is-active", active);

      const viewTarget = target?.closest<HTMLElement>('[data-cursor="view"]') ?? null;
      ring.classList.toggle("is-view", Boolean(viewTarget));
      dot.style.opacity = viewTarget ? "0" : "1";
      if (viewTarget) label.textContent = viewTarget.dataset.cursorLabel || "View";
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-ring__label" ref={labelRef}>View</span>
      </div>
    </div>
  );
}
