"use client";

import { useFrame } from "@react-three/fiber";
import { Color, MathUtils, ShaderMaterial, Vector2 } from "three";
import { useMemo, useRef } from "react";
import type { ExperienceStage } from "@/types/content";

const stageValues: Record<ExperienceStage, { value: number; accent: string; energy: number }> = {
  hero: { value: 0.04, accent: "#4b7888", energy: 0.66 },
  services: { value: 0.18, accent: "#315d6c", energy: 0.42 },
  work: { value: 0.34, accent: "#7fa4af", energy: 0.74 },
  clients: { value: 0.46, accent: "#668792", energy: 0.34 },
  process: { value: 0.58, accent: "#315d6c", energy: 0.42 },
  industries: { value: 0.72, accent: "#86a8b2", energy: 0.82 },
  team: { value: 0.84, accent: "#5d7f89", energy: 0.34 },
  contact: { value: 1, accent: "#9bb9c1", energy: 0.62 },
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uStage;
  uniform float uEnergy;
  uniform float uQuality;
  uniform vec2 uPointer;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.02 + vec2(12.7, 7.9);
      amplitude *= 0.5;
    }
    return value;
  }

  float ribbon(vec2 uv, float offset, float frequency, float speed, float width) {
    float curve = sin(uv.x * frequency + uTime * speed + offset) * 0.12;
    curve += sin(uv.x * frequency * 0.42 - uTime * speed * 0.55 + offset * 1.7) * 0.055;
    return 1.0 - smoothstep(width, width + 0.035, abs(uv.y - curve - offset * 0.035));
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= 1.72;

    float time = uTime * 0.065;
    vec2 flowUv = uv;
    float field = fbm(flowUv * (1.55 + uStage * 0.42) + vec2(time, -time * 0.72));
    flowUv.y += (field - 0.5) * (0.16 + uEnergy * 0.09);

    // uQuality is a coherent (non-divergent) uniform branch: every fragment
    // in the draw takes the same path, so mobile GPUs skip this cheaply
    // rather than computing and discarding it. The secondary noise field and
    // third ribbon are the least visually load-bearing part of the effect,
    // so this is where quality gets traded for fill-rate on small screens.
    float secondaryField = 0.0;
    float lineC = 0.0;
    if (uQuality > 0.5) {
      secondaryField = fbm(flowUv * 2.4 - vec2(time * 0.65, time * 0.38));
      flowUv.x += (secondaryField - 0.5) * 0.055;
      lineC = ribbon(flowUv, 1.1, 3.8, 0.23, 0.012);
    }

    float lineA = ribbon(flowUv, -0.8, 4.9, 0.42, 0.022);
    float lineB = ribbon(flowUv, 0.15, 6.2, -0.31, 0.015);

    vec2 pointer = uPointer * vec2(1.72, 1.0);
    float pointerGlow = exp(-6.2 * length(uv - pointer));
    float bloom = exp(-2.1 * length(uv - vec2(0.34, 0.03)));
    float edgeFade = smoothstep(1.16, 0.26, length(uv * vec2(0.82, 1.0)));

    float mist = smoothstep(0.44, 0.9, field) * 0.13;
    float lightLines = lineA * 0.42 + lineB * 0.28 + lineC * 0.2;
    float alpha = (mist + lightLines + pointerGlow * 0.12 + bloom * 0.08) * edgeFade;
    alpha *= 0.34 + uEnergy * 0.34;

    vec3 paperBlue = mix(vec3(0.76, 0.82, 0.83), uAccent, 0.58);
    vec3 colour = mix(paperBlue * 0.72, uAccent, field * 0.42 + pointerGlow * 0.18);
    colour += vec3(0.93, 0.98, 1.0) * lightLines * 0.32;

    gl_FragColor = vec4(colour, alpha);
  }
`;

export function SceneBackdrop({
  stage,
  industryAccent,
  lowPower = false,
}: {
  stage: ExperienceStage;
  industryAccent?: string;
  lowPower?: boolean;
}) {
  const material = useRef<ShaderMaterial>(null);
  const targetColour = useMemo(() => new Color(), []);
  const targetPointer = useMemo(() => new Vector2(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStage: { value: stageValues.hero.value },
      uEnergy: { value: stageValues.hero.energy },
      uQuality: { value: lowPower ? 0 : 1 },
      uPointer: { value: new Vector2() },
      uAccent: { value: new Color(stageValues.hero.accent) },
    }),
    [lowPower],
  );

  useFrame((state, delta) => {
    const active = material.current;
    if (!active) return;

    const settings = stageValues[stage];
    const ease = 1 - Math.pow(0.001, delta);
    targetColour.set(industryAccent ?? settings.accent);
    targetPointer.set(state.pointer.x * 0.22, state.pointer.y * 0.22);

    active.uniforms.uTime.value = state.clock.elapsedTime;
    active.uniforms.uStage.value = MathUtils.lerp(
      active.uniforms.uStage.value as number,
      settings.value,
      ease * 0.24,
    );
    active.uniforms.uEnergy.value = MathUtils.lerp(
      active.uniforms.uEnergy.value as number,
      settings.energy,
      ease * 0.28,
    );
    (active.uniforms.uPointer.value as Vector2).lerp(targetPointer, ease * 0.25);
    (active.uniforms.uAccent.value as Color).lerp(targetColour, ease * 0.25);
  });

  return (
    <mesh position={[0, 0, -7.6]} scale={[18, 11, 1]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}
