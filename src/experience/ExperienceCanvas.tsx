"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import type { ExperienceStage } from "@/types/content";
import { CameraRig } from "@/experience/CameraRig";
import { LoomField } from "@/experience/LoomField";
import { SceneBackdrop } from "@/experience/SceneBackdrop";

type IndustrySignal = {
  index: number;
  id: string;
  accent: string;
};

export default function ExperienceCanvas() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<ExperienceStage>("hero");
  const [industry, setIndustry] = useState<IndustrySignal>({
    index: 0,
    id: "agro",
    accent: "#6f8890",
  });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
    const supportFrame = window.requestAnimationFrame(() => setSupported(Boolean(gl)));

    const onStage = (event: Event) => {
      setStage((event as CustomEvent<ExperienceStage>).detail);
    };
    const onIndustry = (event: Event) => {
      setIndustry((event as CustomEvent<IndustrySignal>).detail);
    };
    const onVisibility = () => setVisible(document.visibilityState === "visible");

    window.addEventListener("dw:stage", onStage);
    window.addEventListener("dw:industry", onIndustry);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(supportFrame);
      window.removeEventListener("dw:stage", onStage);
      window.removeEventListener("dw:industry", onIndustry);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // A phone's GPU fill-rate budget is spent mostly on the full-viewport
  // backdrop shader; capping to 1x device pixels there (instead of 1.25x)
  // is a ~36% cut in fragment-shader invocations with no visible difference
  // on a small screen, versus a real one on a desktop monitor.
  const maxDpr = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 760 ? 1 : 1.25), []);

  if (supported !== true) {
    return <div className="canvas-fallback" aria-hidden="true"><span /><span /><span /></div>;
  }

  return (
    <div className="experience" aria-hidden="true">
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={visible ? "always" : "never"}
        performance={{ min: 0.55 }}
        camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: false,
          alpha: true,
          depth: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
      >
        <SceneBackdrop stage={stage} industryAccent={stage === "industries" ? industry.accent : undefined} lowPower={maxDpr === 1} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 5, 4]} intensity={1.4} color="#f7f6f2" />
        <pointLight position={[-3, -2, 3]} intensity={12} distance={11} color={industry.accent} />
        <LoomField
          stage={stage}
          industryAccent={industry.accent}
          industryIndex={industry.index}
        />
        <CameraRig stage={stage} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
