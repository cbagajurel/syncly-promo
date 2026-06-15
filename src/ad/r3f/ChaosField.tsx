import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import * as THREE from "three";
import { makePillTexture } from "./icons3d";
import { PLATFORM } from "../theme";

const PALETTE = [
  PLATFORM.instagram,
  PLATFORM.facebook,
  PLATFORM.whatsapp,
  PLATFORM.linkedin,
  PLATFORM.messenger,
];

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The hook: notification pills flying in from the edges with turbulence,
 * funnelling toward the centre over the scene — the "it's a lot" chaos that
 * collapses into order. `funnel` 0→1 pulls everything to the middle.
 */
export function ChaosField({ count = 46 }: { count?: number }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const textures = useMemo(
    () => PALETTE.map((hex) => makePillTexture(hex)),
    [],
  );

  const particles = useMemo(() => {
    const rnd = mulberry(99);
    return Array.from({ length: count }, () => {
      const edge = Math.floor(rnd() * 4);
      const t = rnd();
      const spread = 16;
      let x = 0;
      let y = 0;
      if (edge === 0) (x = -spread), (y = (t - 0.5) * 14);
      else if (edge === 1) (x = spread), (y = (t - 0.5) * 14);
      else if (edge === 2) (x = (t - 0.5) * 22), (y = 9);
      else (x = (t - 0.5) * 22), (y = -9);
      return {
        x,
        y,
        z: -2 - rnd() * 6,
        scale: 0.7 + rnd() * 0.9,
        rot: (rnd() - 0.5) * 0.5,
        spin: (rnd() - 0.5) * 0.6,
        delay: rnd() * 30,
        wobble: rnd() * Math.PI * 2,
        tex: Math.floor(rnd() * textures.length),
      };
    });
  }, [count, textures.length]);

  const funnel = interpolate(frame, [40, durationInFrames], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <group>
      {particles.map((p, i) => {
        const appear = interpolate(frame, [p.delay, p.delay + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const px = p.x * (1 - funnel) + Math.sin(frame / 22 + p.wobble) * 0.3;
        const py = p.y * (1 - funnel) + Math.cos(frame / 26 + p.wobble) * 0.3;
        const pz = p.z + funnel * -3;
        const fade = appear * interpolate(funnel, [0.5, 0.9], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const aspect = 512 / 192;
        const s = p.scale * (0.6 + 0.4 * appear);
        return (
          <sprite key={i} position={[px, py, pz]} scale={[s * aspect, s, 1]}>
            <spriteMaterial
              map={textures[p.tex]}
              transparent
              opacity={fade}
              depthWrite={false}
              rotation={p.rot + p.spin * (frame / 120)}
            />
          </sprite>
        );
      })}
    </group>
  );
}
