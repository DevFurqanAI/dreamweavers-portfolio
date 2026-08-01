"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { IndustryMode } from "@/types/content";

type IndustryStyle = CSSProperties & {
  "--industry-accent": string;
  "--industry-x": string;
  "--industry-y": string;
};

export function IndustryModes({ modes }: { modes: IndustryMode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeMode = modes[activeIndex];
  const style = useMemo<IndustryStyle>(
    () => ({
      "--industry-accent": activeMode.accent,
      "--industry-x": "50%",
      "--industry-y": "50%",
    }),
    [activeMode.accent],
  );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("dw:industry", {
        detail: { index: activeIndex, id: activeMode.id, accent: activeMode.accent },
      }),
    );
  }, [activeIndex, activeMode.accent, activeMode.id]);

  const activate = (index: number) => {
    setActiveIndex(index);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = stageRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--industry-x", `${x.toFixed(2)}%`);
    element.style.setProperty("--industry-y", `${y.toFixed(2)}%`);
  };

  const resetPointer = () => {
    const element = stageRef.current;
    if (!element) return;
    element.style.setProperty("--industry-x", "50%");
    element.style.setProperty("--industry-y", "50%");
  };

  return (
    <div className="industry-console" style={style} data-reveal>
      <div className="industry-console__rail" aria-label="Industry modes">
        <p className="industry-console__rail-label">Select a mode</p>
        <div className="industry-console__rail-list">
          {modes.map((mode, index) => (
            <button
              className={`industry-mode-button${index === activeIndex ? " is-active" : ""}`}
              key={mode.id}
              type="button"
              aria-pressed={index === activeIndex}
              suppressHydrationWarning
              onClick={() => activate(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") activate(index);
              }}
            >
              <span>{mode.index}</span>
              <strong>{mode.title}</strong>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
      </div>

      <div
        className="industry-console__stage"
        aria-live="polite"
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="industry-console__mesh" aria-hidden="true">
          <span className="industry-console__mesh-grid" />
          <span className="industry-console__mesh-scan" />
          <span className="industry-console__ring industry-console__ring--one" />
          <span className="industry-console__ring industry-console__ring--two" />
          <span className="industry-console__ring industry-console__ring--three" />
          <span className="industry-console__axis industry-console__axis--x" />
          <span className="industry-console__axis industry-console__axis--y" />
          <span className="industry-console__node industry-console__node--one" />
          <span className="industry-console__node industry-console__node--two" />
          <span className="industry-console__node industry-console__node--three" />
        </div>

        <div className="industry-console__readout" key={activeMode.id}>
          <div className="industry-console__readout-top">
            <span>Mode {activeMode.index}</span>
            <span>DW / Industry system</span>
          </div>

          <div className="industry-console__readout-main">
            <p>{activeMode.signal}</p>
            <h3>{activeMode.title}</h3>
            <p>{activeMode.summary}</p>
          </div>

          <ul aria-label={`${activeMode.title} focus areas`}>
            {activeMode.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="industry-console__counter" aria-hidden="true">
          <strong>{activeMode.index}</strong>
          <span>/ {String(modes.length).padStart(2, "0")}</span>
        </div>

        <p className="industry-console__hint">Hover or select a mode to reconfigure the system.</p>
      </div>
    </div>
  );
}
