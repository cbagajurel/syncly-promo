import { useCurrentFrame } from "remotion";
import { STAGE } from "../constants";

type Item = {
  pos: [number, number, number];
  rot: number;
  scale: number;
  geo: "panel" | "ico" | "torus";
  dir: number;
};

const ITEMS: Item[] = [
  { pos: [-6, 2.4, -7], rot: 0.3, scale: 1.5, geo: "panel", dir: 1 },
  { pos: [6, -1.8, -9], rot: -0.2, scale: 1.7, geo: "ico", dir: -1 },
  { pos: [4.2, 3.2, -11], rot: 0.1, scale: 1.1, geo: "torus", dir: 1 },
  { pos: [-4.8, -3.2, -10], rot: 0.25, scale: 1.25, geo: "panel", dir: -1 },
];

/** Subtle frosted geometry drifting in the backdrop for depth. */
export function FloatingShapes() {
  const frame = useCurrentFrame();
  return (
    <>
      {ITEMS.map((it, i) => {
        const float = Math.sin(frame * 0.012 + i * 1.7) * 0.45;
        const ry = frame * 0.0045 * it.dir + it.rot;
        return (
          <mesh
            key={i}
            position={[it.pos[0], it.pos[1] + float, it.pos[2]]}
            rotation={[ry * 0.5, ry, ry * 0.3]}
            scale={it.scale}
          >
            {it.geo === "panel" && <boxGeometry args={[1.5, 1.9, 0.12]} />}
            {it.geo === "ico" && <icosahedronGeometry args={[1, 0]} />}
            {it.geo === "torus" && <torusGeometry args={[0.85, 0.18, 16, 44]} />}
            <meshStandardMaterial
              color="#11212b"
              metalness={0.45}
              roughness={0.25}
              emissive={STAGE.EMERALD_DEEP}
              emissiveIntensity={0.14}
              transparent
              opacity={0.55}
            />
          </mesh>
        );
      })}
    </>
  );
}
