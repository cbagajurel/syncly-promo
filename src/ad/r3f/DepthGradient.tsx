import { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";
import { makeGlowTexture } from "./icons3d";
import { C } from "../theme";

/** Ambient depth: a faint accent-tinted gradient wash + slow bokeh field. */
export function DepthGradient({
  intensity = 1,
  color = C.ACCENT,
}: {
  intensity?: number;
  color?: string;
}) {
  const frame = useCurrentFrame();
  const glow = useMemo(() => makeGlowTexture(color), [color]);

  const bokeh = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return {
          x: Math.cos(a + i) * 7,
          y: Math.sin(a * 1.3) * 4,
          z: -6 - (i % 3) * 4,
          s: 3 + (i % 4),
          o: 0.05 + (i % 3) * 0.02,
        };
      }),
    [],
  );

  return (
    <group>
      {bokeh.map((b, i) => (
        <sprite
          key={i}
          position={[
            b.x + Math.sin(frame / 90 + i) * 0.4,
            b.y + Math.cos(frame / 110 + i) * 0.3,
            b.z,
          ]}
          scale={[b.s, b.s, 1]}
        >
          <spriteMaterial
            map={glow}
            transparent
            opacity={b.o * intensity}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
