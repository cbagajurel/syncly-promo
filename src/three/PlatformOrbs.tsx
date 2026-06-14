import { useCurrentFrame } from "remotion";
import { STAGE } from "../constants";

const PLATS = [
  STAGE.PLATFORM.instagram,
  STAGE.PLATFORM.facebook,
  STAGE.PLATFORM.whatsapp,
  STAGE.PLATFORM.messenger,
];

/**
 * Platform orbs orbiting a central node and converging into it as
 * `progress` goes 0→1 — "every channel, one inbox".
 */
export function PlatformOrbs({ progress = 0 }: { progress?: number }) {
  const frame = useCurrentFrame();
  const r = 4.3 * (1 - progress * 0.8);
  const spin = frame * 0.012;

  return (
    <group>
      {/* Central inbox node */}
      <mesh>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshStandardMaterial
          color={STAGE.EMERALD}
          emissive={STAGE.EMERALD}
          emissiveIntensity={0.55}
          metalness={0.25}
          roughness={0.2}
        />
      </mesh>

      {PLATS.map((c, i) => {
        const ang = spin + (i / PLATS.length) * Math.PI * 2;
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r * 0.6;
        const z = Math.sin(ang * 1.3) * 0.7;
        const orbScale = 0.5 * (1 - progress * 0.45);
        return (
          <group key={i}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([x, y, z, 0, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={c}
                transparent
                opacity={0.45 * (1 - progress * 0.5)}
              />
            </line>
            <mesh position={[x, y, z]} scale={orbScale}>
              <sphereGeometry args={[1, 40, 40]} />
              <meshStandardMaterial
                color={c}
                emissive={c}
                emissiveIntensity={0.4}
                metalness={0.3}
                roughness={0.25}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
