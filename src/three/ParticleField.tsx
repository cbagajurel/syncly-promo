import { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";
import { STAGE } from "../constants";

/** Drifting depth particles — parallax + premium tech atmosphere. */
export function ParticleField({ count = 460 }: { count?: number }) {
  const frame = useCurrentFrame();

  const geo = useMemo(() => {
    const a = new Float32Array(count * 3);
    let s = 987654321;
    const rnd = () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd() - 0.5) * 30;
      a[i * 3 + 1] = (rnd() - 0.5) * 18;
      a[i * 3 + 2] = (rnd() - 0.5) * 22 - 5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, [count]);

  const rotY = frame * 0.0014;
  const bob = Math.sin(frame * 0.01) * 0.35;

  return (
    <group rotation={[0, rotY, 0]} position={[0, bob, 0]}>
      <points geometry={geo}>
        <pointsMaterial
          size={0.05}
          color={STAGE.GLASS}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
