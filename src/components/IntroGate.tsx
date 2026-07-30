"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SESSION_KEY = "dw:intro-seen";

export function IntroGate() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disabled = process.env.NEXT_PUBLIC_DISABLE_INTRO === "true";
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      alreadySeen = false;
    }

    if (reduced || disabled || alreadySeen) {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.classList.add("intro-active");
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Storage can be unavailable in hardened privacy modes; the intro still works.
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("intro-active");
    }, 850);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__logo">
        <Image src="/brand/dreamweavers-logo-source.jpg" alt="" width={150} height={114} quality={75} loading="eager" />
      </div>
      <div className="intro__loom">
        <span className="intro__thread intro__thread--a" />
        <span className="intro__thread intro__thread--b" />
        <span className="intro__thread intro__thread--c" />
        <span className="intro__thread intro__thread--d" />
      </div>
      <p className="intro__eyebrow">Dreamweavers</p>
      <p className="intro__title">Waking the digital loom</p>
    </div>
  );
}
