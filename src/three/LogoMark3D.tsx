import { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";
import { STAGE } from "../constants";

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** The Syncly app-icon tile — a beveled emerald glass extrusion. */
export function LogoMark3D({ progress = 1 }: { progress?: number }) {
  const frame = useCurrentFrame();

  const geo = useMemo(() => {
    const shape = roundedRect(2.2, 2.2, 0.62);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSize: 0.1,
      bevelThickness: 0.1,
      bevelSegments: 5,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, []);

  const ry = Math.sin(frame * 0.02) * 0.4 + 0.25;
  const rx = Math.sin(frame * 0.015) * 0.12 + 0.12;
  const s = 0.2 + progress * 0.8;

  return (
    <mesh geometry={geo} rotation={[rx, ry, 0]} scale={s}>
      <meshStandardMaterial
        color={STAGE.EMERALD}
        metalness={0.55}
        roughness={0.16}
        emissive={STAGE.EMERALD_DEEP}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
}
