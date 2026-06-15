import { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { makeGlowTexture } from "./icons3d";
import { C } from "../theme";

/**
 * Hairline connectors that draw outward from a centre to a set of nodes —
 * publish fan-out (compose → every platform) or team connectivity. Each
 * connector is a thin bar scaled along its length so it "draws in".
 */
export function ConnectionNet({
  center = [0, 0] as [number, number],
  nodes,
  drawStart = 0,
  drawDur = 40,
  thickness = 0.035,
  z = -0.5,
  color = C.ACCENT,
}: {
  center?: [number, number];
  nodes: [number, number][];
  drawStart?: number;
  drawDur?: number;
  thickness?: number;
  z?: number;
  color?: string;
}) {
  const frame = useCurrentFrame();
  const glow = useMemo(() => makeGlowTexture(color), [color]);

  return (
    <group>
      {nodes.map((n, i) => {
        const dx = n[0] - center[0];
        const dy = n[1] - center[1];
        const len = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx);
        const start = drawStart + i * 4;
        const p = interpolate(frame, [start, start + drawDur], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const drawn = len * p;
        const cx = center[0] + (dx / len) * (drawn / 2);
        const cy = center[1] + (dy / len) * (drawn / 2);
        return (
          <group key={i}>
            <mesh position={[cx, cy, z]} rotation={[0, 0, ang]}>
              <planeGeometry args={[Math.max(drawn, 0.001), thickness]} />
              <meshBasicMaterial color={color} transparent opacity={0.28 * p} />
            </mesh>
            <sprite position={[n[0], n[1], z]} scale={[0.5, 0.5, 1]}>
              <spriteMaterial map={glow} transparent opacity={0.6 * p} depthWrite={false} />
            </sprite>
          </group>
        );
      })}
    </group>
  );
}
