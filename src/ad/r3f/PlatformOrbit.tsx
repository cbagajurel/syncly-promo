import { useCurrentFrame, interpolate } from "remotion";
import { usePlatformTextures, PLATFORM_ORDER } from "./icons3d";

/**
 * Platform icons orbit an elliptical ring, then spiral inward and drop into the
 * centre (the inbox panel) — "everything unifies into one place".
 */
export function PlatformOrbit({
  radius = 5.4,
  yScale = 0.42,
  center = [0, 0] as [number, number],
  spiralStart = 90,
  spiralDur = 60,
  size = 0.95,
}: {
  radius?: number;
  yScale?: number;
  center?: [number, number];
  spiralStart?: number;
  spiralDur?: number;
  size?: number;
}) {
  const frame = useCurrentFrame();
  const textures = usePlatformTextures();
  const spin = (frame / 200) * Math.PI * 2;

  const spiral = interpolate(frame, [spiralStart, spiralStart + spiralDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = radius * (1 - spiral);
  const fade = interpolate(spiral, [0.5, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <group>
      {PLATFORM_ORDER.map((k, i) => {
        const tex = textures[k];
        if (!tex) return null;
        const a = spin + (i / PLATFORM_ORDER.length) * Math.PI * 2;
        const x = center[0] + Math.cos(a) * r;
        const y = center[1] + Math.sin(a) * r * yScale;
        const z = Math.sin(a) * 2.2;
        const appear = interpolate(frame, [i * 5, i * 5 + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const s = size * (0.7 + 0.3 * appear) * (1 - spiral * 0.5);
        return (
          <sprite key={k} position={[x, y, z]} scale={[s, s, 1]}>
            <spriteMaterial map={tex} transparent opacity={appear * fade} depthWrite={false} />
          </sprite>
        );
      })}
    </group>
  );
}
