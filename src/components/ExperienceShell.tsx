"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExperienceCanvas = dynamic(() => import("@/experience/ExperienceCanvas"), {
  ssr: false,
  loading: () => <div className="canvas-fallback canvas-fallback--loading" aria-hidden="true" />,
});

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

export function ExperienceShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navigatorHints = navigator as NavigatorWithHints;
    const constrainedDevice =
      navigatorHints.connection?.saveData === true ||
      ["slow-2g", "2g"].includes(navigatorHints.connection?.effectiveType || "") ||
      (navigatorHints.deviceMemory !== undefined && navigatorHints.deviceMemory <= 2);

    if (reducedMotion || constrainedDevice) return;

    const start = () => setReady(true);
    const requestIdle = window.requestIdleCallback?.bind(window);
    if (requestIdle) {
      const idleId = requestIdle(start, { timeout: 1_200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(start, 280);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return <div className="canvas-fallback canvas-fallback--loading" aria-hidden="true"><span /><span /><span /></div>;
  }

  return <ExperienceCanvas />;
}
