"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MotionController = dynamic(
  () => import("@/components/MotionController").then((module) => module.MotionController),
  { ssr: false },
);

export function MotionShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion");
      return () => document.documentElement.classList.remove("reduced-motion");
    }

    const start = () => setReady(true);
    const requestIdle = window.requestIdleCallback?.bind(window);
    if (requestIdle) {
      const idleId = requestIdle(start, { timeout: 600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(start, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return ready ? <MotionController /> : null;
}
