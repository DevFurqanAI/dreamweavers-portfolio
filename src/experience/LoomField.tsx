"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Points,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import type { ExperienceStage } from "@/types/content";

const stageMap: Record<
  ExperienceStage,
  {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    energy: number;
    spread: number;
    speed: number;
  }
> = {
  hero: {
    position: [2.22, -0.22, -1.05],
    rotation: [-0.04, -0.18, -0.08],
    scale: 0.95,
    energy: 0.78,
    spread: 0.88,
    speed: 0.34,
  },
  services: {
    position: [-1.65, 0.02, -1.4],
    rotation: [0.14, 0.32, 0.18],
    scale: 0.78,
    energy: 0.48,
    spread: 0.58,
    speed: 0.22,
  },
  work: {
    position: [1.55, -0.08, -1.75],
    rotation: [0.12, -0.55, 0.46],
    scale: 1.02,
    energy: 0.86,
    spread: 1.15,
    speed: 0.48,
  },
  clients: {
    position: [0.12, 0.12, -1.9],
    rotation: [0.02, 0.7, -0.18],
    scale: 0.7,
    energy: 0.36,
    spread: 0.5,
    speed: 0.18,
  },
  process: {
    position: [-1.62, -0.06, -1.58],
    rotation: [0.3, 0.32, -0.28],
    scale: 0.84,
    energy: 0.56,
    spread: 0.72,
    speed: 0.3,
  },
  industries: {
    position: [1.55, 0.04, -1.7],
    rotation: [-0.08, 0.82, 0.28],
    scale: 0.92,
    energy: 0.94,
    spread: 1.28,
    speed: 0.58,
  },
  team: {
    position: [-1.35, -0.12, -1.66],
    rotation: [0.22, -0.46, 0.12],
    scale: 0.78,
    energy: 0.42,
    spread: 0.6,
    speed: 0.2,
  },
  contact: {
    position: [0.1, -0.02, -1.18],
    rotation: [0.02, 0.08, 0],
    scale: 1.06,
    energy: 0.82,
    spread: 0.92,
    speed: 0.4,
  },
};

const paletteMap: Record<ExperienceStage, { accent: string; secondary: string }> = {
  hero: { accent: "#4b7888", secondary: "#d7e8ed" },
  services: { accent: "#315d6c", secondary: "#b7ccd2" },
  work: { accent: "#7da5b1", secondary: "#edf6f7" },
  clients: { accent: "#5f818c", secondary: "#c8d8dc" },
  process: { accent: "#426b79", secondary: "#d3e2e6" },
  industries: { accent: "#8cb2bd", secondary: "#f1f8f9" },
  team: { accent: "#597d88", secondary: "#c6d8dd" },
  contact: { accent: "#9bb9c1", secondary: "#f4fbfc" },
};

const ribbonVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uEnergy;
  uniform float uSpread;
  uniform float uStage;
  uniform vec2 uPointer;

  varying vec2 vUv;
  varying float vWave;
  varying float vDepth;

  void main() {
    vUv = uv;

    vec3 p = position;
    float along = uv.x;
    float across = uv.y - 0.5;
    float time = uTime * (0.42 + uEnergy * 0.3) + uPhase;

    float longWave = sin(along * 8.8 + time * 1.15 + uStage * 2.2);
    float fineWave = sin(along * 19.0 - time * 1.7 + across * 3.5);
    float twist = sin(along * 6.28318 + time * 0.62 + uPhase) * (0.22 + uSpread * 0.23);

    p.y += longWave * (0.28 + uEnergy * 0.2);
    p.y += fineWave * 0.055 * uEnergy;
    p.y += across * twist;
    p.z += cos(along * 7.2 - time + uPhase) * (0.32 + uSpread * 0.25);
    p.z += across * sin(along * 9.0 + time) * 0.24;

    float pointerInfluence = exp(-4.2 * distance(uv, uPointer * 0.22 + vec2(0.5)));
    p.z += pointerInfluence * (0.26 + uEnergy * 0.18);
    p.y += pointerInfluence * uPointer.y * 0.18;

    vWave = longWave * 0.5 + 0.5;
    vDepth = p.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const ribbonFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uPhase;
  uniform float uOpacity;
  uniform vec3 uAccent;
  uniform vec3 uSecondary;

  varying vec2 vUv;
  varying float vWave;
  varying float vDepth;

  void main() {
    float edge = smoothstep(0.0, 0.12, vUv.y) * smoothstep(0.0, 0.12, 1.0 - vUv.y);
    float longitudinal = smoothstep(0.0, 0.08, vUv.x) * smoothstep(0.0, 0.08, 1.0 - vUv.x);
    float scan = exp(-55.0 * abs(fract(vUv.x * 1.35 - uTime * 0.07 + uPhase * 0.1) - 0.5));
    float fibres = 0.82 + 0.18 * sin(vUv.y * 210.0 + vUv.x * 16.0 + uPhase);
    float sheen = pow(max(0.0, sin(vUv.x * 8.0 - uTime * 0.3 + uPhase) * 0.5 + 0.5), 5.0);

    vec3 base = mix(uAccent, uSecondary, vUv.y * 0.72 + vWave * 0.16);
    base += uSecondary * scan * 0.34;
    base += vec3(1.0) * sheen * 0.11;
    base *= fibres;

    float alpha = edge * longitudinal * uOpacity;
    alpha *= 0.72 + scan * 0.22 + sheen * 0.12;
    alpha *= 0.9 + clamp(vDepth, -1.0, 1.0) * 0.08;

    gl_FragColor = vec4(base, alpha);
  }
`;

type RibbonConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  phase: number;
  opacity: number;
};

const ribbonConfigs: RibbonConfig[] = [
  { position: [0.05, 1.1, 0.15], rotation: [-0.18, 0.12, -0.72], width: 6.2, height: 0.78, phase: 0.0, opacity: 0.54 },
  { position: [0.25, 0.5, 0.42], rotation: [0.1, -0.12, -0.24], width: 6.6, height: 0.66, phase: 1.35, opacity: 0.68 },
  { position: [0.0, -0.05, 0.62], rotation: [-0.08, 0.18, 0.2], width: 6.45, height: 0.72, phase: 2.55, opacity: 0.74 },
  { position: [-0.15, -0.62, 0.32], rotation: [0.14, -0.08, 0.68], width: 6.15, height: 0.62, phase: 3.85, opacity: 0.56 },
  { position: [0.12, -1.15, 0.04], rotation: [-0.12, 0.16, 1.05], width: 5.65, height: 0.54, phase: 5.05, opacity: 0.38 },
];

function Ribbon({
  config,
  stage,
  accent,
  secondary,
  industryIndex,
}: {
  config: RibbonConfig;
  stage: ExperienceStage;
  accent: string;
  secondary: string;
  industryIndex: number;
}) {
  const material = useRef<ShaderMaterial>(null);
  const targetAccent = useMemo(() => new Color(), []);
  const targetSecondary = useMemo(() => new Color(), []);
  const targetPointer = useMemo(() => new Vector2(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPhase: { value: config.phase },
      uEnergy: { value: stageMap.hero.energy },
      uSpread: { value: stageMap.hero.spread },
      uStage: { value: 0 },
      uPointer: { value: new Vector2() },
      uAccent: { value: new Color(paletteMap.hero.accent) },
      uSecondary: { value: new Color(paletteMap.hero.secondary) },
      uOpacity: { value: config.opacity },
    }),
    [config.opacity, config.phase],
  );

  useFrame((state, delta) => {
    const active = material.current;
    if (!active) return;

    const settings = stageMap[stage];
    const ease = 1 - Math.pow(0.001, delta);
    const stageIndex = Object.keys(stageMap).indexOf(stage);

    targetAccent.set(accent);
    targetSecondary.set(secondary);
    targetPointer.set(state.pointer.x, state.pointer.y);

    active.uniforms.uTime.value = state.clock.elapsedTime;
    active.uniforms.uEnergy.value = MathUtils.lerp(
      active.uniforms.uEnergy.value as number,
      settings.energy,
      ease * 0.34,
    );
    active.uniforms.uSpread.value = MathUtils.lerp(
      active.uniforms.uSpread.value as number,
      settings.spread,
      ease * 0.3,
    );
    active.uniforms.uStage.value = MathUtils.lerp(
      active.uniforms.uStage.value as number,
      stageIndex + industryIndex * 0.08,
      ease * 0.2,
    );
    active.uniforms.uOpacity.value = MathUtils.lerp(
      active.uniforms.uOpacity.value as number,
      config.opacity * (0.72 + settings.energy * 0.38),
      ease * 0.32,
    );
    (active.uniforms.uPointer.value as Vector2).lerp(targetPointer, ease * 0.22);
    (active.uniforms.uAccent.value as Color).lerp(targetAccent, ease * 0.24);
    (active.uniforms.uSecondary.value as Color).lerp(targetSecondary, ease * 0.24);
  });

  return (
    <mesh position={config.position} rotation={config.rotation} renderOrder={3}>
      <planeGeometry args={[config.width, config.height, 96, 12]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={ribbonVertexShader}
        fragmentShader={ribbonFragmentShader}
        transparent
        side={DoubleSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function LoomField({
  stage,
  industryAccent,
  industryIndex = 0,
}: {
  stage: ExperienceStage;
  industryAccent?: string;
  industryIndex?: number;
}) {
  const group = useRef<Group>(null);
  const lines = useRef<Group>(null);
  const nodes = useRef<Group>(null);
  const particleField = useRef<Points>(null);
  const targetPosition = useMemo(() => new Vector3(), []);
  const targetScale = useMemo(() => new Vector3(), []);
  const palette = paletteMap[stage];
  const accent = stage === "industries" && industryAccent ? industryAccent : palette.accent;

  const guideLines = useMemo(() => {
    return Array.from({ length: 4 }, (_, index) => {
      const points: [number, number, number][] = [];
      for (let point = 0; point < 48; point += 1) {
        const t = point / 47;
        const x = -3.4 + t * 6.8;
        points.push([
          x,
          Math.sin(t * Math.PI * (2.2 + index * 0.35) + index * 0.7) * (0.78 - index * 0.08),
          Math.cos(t * Math.PI * 3.0 + index) * 0.42 + index * 0.11,
        ]);
      }
      return points;
    });
  }, []);

  const particles = useMemo(() => {
    const values = new Float32Array(420 * 3);
    let seed = 71519;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < 420; index += 1) {
      values[index * 3] = (random() - 0.5) * 8.5;
      values[index * 3 + 1] = (random() - 0.5) * 5.4;
      values[index * 3 + 2] = (random() - 0.5) * 3.2;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;

    const target = stageMap[stage];
    const ease = 1 - Math.pow(0.001, delta);
    targetPosition.set(...target.position);
    targetScale.setScalar(target.scale);

    current.position.lerp(targetPosition, ease * 0.5);
    current.scale.lerp(targetScale, ease * 0.48);
    current.rotation.x = MathUtils.lerp(
      current.rotation.x,
      target.rotation[0] + state.pointer.y * 0.06,
      ease * 0.24,
    );
    current.rotation.y = MathUtils.lerp(
      current.rotation.y,
      target.rotation[1] + state.pointer.x * 0.11,
      ease * 0.24,
    );
    current.rotation.z = MathUtils.lerp(
      current.rotation.z,
      target.rotation[2] + Math.sin(state.clock.elapsedTime * 0.16) * 0.025,
      ease * 0.22,
    );

    if (lines.current) {
      lines.current.rotation.y += delta * target.speed * 0.08;
      lines.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
    }
    if (nodes.current) {
      nodes.current.rotation.z -= delta * target.speed * 0.18;
      nodes.current.rotation.y += delta * 0.045;
    }
    if (particleField.current) {
      particleField.current.rotation.z += delta * 0.008;
      particleField.current.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
    }
  });

  return (
    <group ref={group}>
      {ribbonConfigs.map((config) => (
        <Ribbon
          key={config.phase}
          config={config}
          stage={stage}
          accent={accent}
          secondary={palette.secondary}
          industryIndex={industryIndex}
        />
      ))}

      <group ref={lines}>
        {guideLines.map((points, index) => (
          <Line
            key={index}
            points={points}
            color={index % 2 === 0 ? accent : palette.secondary}
            lineWidth={index === 0 ? 1.1 : 0.55}
            transparent
            opacity={index === 0 ? 0.34 : 0.15}
          />
        ))}
      </group>

      <group ref={nodes} rotation={[0.25, 0.15, 0]}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * (2.25 + (index % 2) * 0.42),
                Math.sin(angle) * (1.25 + (index % 3) * 0.14),
                Math.sin(angle * 1.7) * 0.48,
              ]}
            >
              <sphereGeometry args={[index % 3 === 0 ? 0.045 : 0.026, 10, 10]} />
              <meshBasicMaterial color={index % 2 === 0 ? accent : palette.secondary} toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      <points ref={particleField}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={accent}
          size={0.014}
          transparent
          opacity={stage === "hero" ? 0.3 : 0.18}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}
