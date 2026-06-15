import { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";
import { makeGlowTexture } from "./icons3d";
import { C } from "../theme";

export type Vec2 = [number, number];

/** Quadratic bezier point. */
function bez(a: THREE.Vector2, c: THREE.Vector2, b: THREE.Vector2, t: number) {
  const mt = 1 - t;
  return new THREE.Vector2(
    mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
    mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
  );
}

/**
 * Emerald dots streaming along curved paths between points — messages flowing
 * into the inbox, or the AI auto-reply loop. Each path carries several dots on
 * a staggered loop.
 */
export function MessageFlow({
  paths,
  perPath = 3,
  period = 70,
  dotSize = 0.28,
  z = 0.2,
  color = C.ACCENT,
}: {
  paths: { from: Vec2; to: Vec2; bow?: number }[];
  perPath?: number;
  period?: number;
  dotSize?: number;
  z?: number;
  color?: string;
}) {
  const frame = useCurrentFrame();
  const dot = useMemo(() => makeGlowTexture(color), [color]);

  return (
    <group>
      {paths.flatMap((path, pi) => {
        const a = new THREE.Vector2(path.from[0], path.from[1]);
        const b = new THREE.Vector2(path.to[0], path.to[1]);
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const bow = path.bow ?? 1.4;
        const ctrl = new THREE.Vector2(mid.x, mid.y + bow);
        return Array.from({ length: perPath }, (_, di) => {
          const t = (((frame / period + (pi * 0.13 + di / perPath)) % 1) + 1) % 1;
          const p = bez(a, ctrl, b, t);
          const fade = Math.sin(t * Math.PI);
          const s = dotSize * (0.6 + 0.4 * fade);
          return (
            <sprite key={`${pi}-${di}`} position={[p.x, p.y, z]} scale={[s, s, 1]}>
              <spriteMaterial
                map={dot}
                transparent
                opacity={fade * 0.85}
                depthWrite={false}
              />
            </sprite>
          );
        });
      })}
    </group>
  );
}
