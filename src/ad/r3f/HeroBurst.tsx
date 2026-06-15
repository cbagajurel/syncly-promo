import { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { makeGlowTexture, usePlatformTextures, PLATFORM_ORDER } from "./icons3d";
import { C } from "../theme";

/**
 * Finale: a soft emerald bloom blooms behind the logo while the platform icons
 * converge from a wide ring into a tight halo around the centre, then settle.
 */
export function HeroBurst({
  start = 0,
  bloomColor = C.ACCENT,
}: {
  start?: number;
  bloomColor?: string;
}) {
  const frame = useCurrentFrame();
  const bloom = useMemo(() => makeGlowTexture(bloomColor, 0.2), [bloomColor]);
  const textures = usePlatformTextures();

  const f = frame - start;
  const converge = interpolate(f, [0, 50], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bloomP = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const radius = 1.9 + converge * 5;

  return (
    <group>
      <sprite position={[0, 0, -2]} scale={[14 + bloomP * 4, 14 + bloomP * 4, 1]}>
        <spriteMaterial map={bloom} transparent opacity={0.18 * bloomP} depthWrite={false} />
      </sprite>
      {PLATFORM_ORDER.map((k, i) => {
        const tex = textures[k];
        if (!tex) return null;
        const a = -Math.PI / 2 + (i / PLATFORM_ORDER.length) * Math.PI * 2;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        const appear = interpolate(f, [i * 4, i * 4 + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const s = 0.7 * appear;
        return (
          <sprite key={k} position={[x, y, 0.5]} scale={[s, s, 1]}>
            <spriteMaterial map={tex} transparent opacity={appear} depthWrite={false} />
          </sprite>
        );
      })}
    </group>
  );
}
