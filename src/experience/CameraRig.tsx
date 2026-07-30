"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useMemo } from "react";
import type { ExperienceStage } from "@/types/content";

const cameraStages: Record<ExperienceStage, [number, number, number]> = {
  hero: [0, 0, 6.2],
  services: [0.1, 0.05, 6.55],
  work: [-0.12, -0.02, 6.75],
  clients: [0, 0.08, 6.5],
  process: [0.1, 0, 6.65],
  industries: [-0.08, 0.08, 6.35],
  team: [0.05, -0.04, 6.7],
  contact: [0, 0, 6.05],
};

export function CameraRig({ stage }: { stage: ExperienceStage }) {
  const target = useMemo(() => new Vector3(), []);
  const lookAt = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const settings = cameraStages[stage];
    const ease = 1 - Math.pow(0.001, delta);

    target.set(
      settings[0] + state.pointer.x * 0.12,
      settings[1] + state.pointer.y * 0.08,
      settings[2],
    );
    state.camera.position.lerp(target, ease * 0.18);

    lookAt.set(state.pointer.x * 0.08, state.pointer.y * 0.05, 0);
    state.camera.lookAt(lookAt);
    state.camera.rotation.z = MathUtils.lerp(
      state.camera.rotation.z,
      state.pointer.x * -0.008,
      ease * 0.16,
    );
  });

  return null;
}
