import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { STAGE_L } from "../theme";

/* Geometry constants (world units). 16:10 display, MacBook-accurate-ish. */
const W = 4.7; // width
const D = 3.2; // depth
const BASE = 0.17; // base thickness
const LIDT = 0.11; // lid thickness
const LIDH = (W * 10) / 16; // 16:10 lid height ≈ 2.94

// Hinge angles (radians): closed = lid folded DOWN over the keyboard (screen
// facing the deck); open = upright leaning back ~18°. +X tips the lid forward.
const CLOSED = Math.PI / 2 - 0.012;
const OPEN = 0.31;

/* Dark keyboard deck texture: rounded key caps in a faint grid. */
function useKeyboardTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const cw = 1024;
    const ch = 680;
    const c = document.createElement("canvas");
    c.width = cw;
    c.height = ch;
    const x = c.getContext("2d")!;
    x.fillStyle = "#141518";
    x.fillRect(0, 0, cw, ch);
    const cols = 14;
    const rows = 5;
    const pad = 26;
    const gap = 8;
    const kw = (cw - pad * 2 - gap * (cols - 1)) / cols;
    const kh = 64;
    const round = (px: number, py: number, w: number, h: number, r: number) => {
      x.beginPath();
      x.moveTo(px + r, py);
      x.arcTo(px + w, py, px + w, py + h, r);
      x.arcTo(px + w, py + h, px, py + h, r);
      x.arcTo(px, py + h, px, py, r);
      x.arcTo(px, py, px + w, py, r);
      x.closePath();
    };
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const px = pad + col * (kw + gap);
        const py = 40 + r * (kh + gap);
        x.fillStyle = "#1d1f23";
        round(px, py, kw, kh, 9);
        x.fill();
        x.fillStyle = "#15171a";
        round(px + 2, py + 3, kw - 4, kh - 5, 8);
        x.fill();
      }
    }
    // spacebar row
    const sy = 40 + rows * (kh + gap);
    x.fillStyle = "#1d1f23";
    round(cw * 0.3, sy, cw * 0.4, kh, 9);
    x.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/* Soft round contact shadow as a radial-gradient texture — guaranteed gentle
   grounding regardless of shadow-map hardness. */
function useContactShadow(): THREE.CanvasTexture {
  return useMemo(() => {
    const S = 512;
    const c = document.createElement("canvas");
    c.width = S;
    c.height = S;
    const x = c.getContext("2d")!;
    const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, "rgba(20,22,28,0.22)");
    g.addColorStop(0.55, "rgba(20,22,28,0.08)");
    g.addColorStop(1, "rgba(20,22,28,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(c);
  }, []);
}

/**
 * A premium procedural MacBook: rounded anodized body lit by IBL, a dark
 * keyboard deck, a trackpad, and a screen that shows the real Syncly UI.
 * `lidOpen` (0→1) drives the hinge; `screenOn` (0→1) drives the display glow.
 * Everything is driven by props (frame-derived) — no self-animation.
 */
export function MacBookModel({
  screen,
  lidOpen = 1,
  screenOn = 1,
}: {
  screen: THREE.Texture;
  lidOpen?: number;
  screenOn?: number;
}) {
  const keyboard = useKeyboardTexture();
  const contact = useContactShadow();

  const baseGeo = useMemo(
    () => new RoundedBoxGeometry(W, BASE, D, 5, 0.05),
    [],
  );
  const lidGeo = useMemo(
    () => new RoundedBoxGeometry(W, LIDH, LIDT, 5, 0.045),
    [],
  );

  const lidRot = CLOSED + (OPEN - CLOSED) * lidOpen;

  const alu = {
    color: STAGE_L.ALU,
    metalness: 0.82,
    roughness: 0.34,
    envMapIntensity: 1.1,
  };

  return (
    <group position={[0, -0.55, 0]}>
      {/* soft contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.15]}>
        <planeGeometry args={[W * 1.7, D * 1.9]} />
        <meshBasicMaterial map={contact} transparent depthWrite={false} />
      </mesh>

      {/* base deck */}
      <mesh geometry={baseGeo} position={[0, BASE / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...alu} />
      </mesh>

      {/* keyboard well */}
      <mesh position={[0, BASE + 0.001, 0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.55, D - 1.15]} />
        <meshStandardMaterial
          map={keyboard}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      {/* trackpad */}
      <mesh position={[0, BASE + 0.001, D / 2 - 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.55, 0.95]} />
        <meshStandardMaterial color="#202327" roughness={0.45} metalness={0.3} envMapIntensity={0.8} />
      </mesh>

      {/* lid — hinges at the back edge of the base */}
      <group position={[0, BASE, -D / 2 + 0.02]} rotation={[lidRot, 0, 0]}>
        <group position={[0, LIDH / 2, 0]}>
          {/* lid shell */}
          <mesh geometry={lidGeo} castShadow receiveShadow>
            <meshStandardMaterial {...alu} />
          </mesh>
          {/* black glass front (bezel) */}
          <mesh position={[0, 0, LIDT / 2 + 0.002]}>
            <planeGeometry args={[W - 0.1, LIDH - 0.1]} />
            <meshStandardMaterial
              color="#0a0b0d"
              roughness={0.18}
              metalness={0.1}
              envMapIntensity={1.4}
            />
          </mesh>
          {/* the display — real Syncly UI */}
          <mesh position={[0, 0.02, LIDT / 2 + 0.006]}>
            <planeGeometry args={[W - 0.34, LIDH - 0.34]} />
            <meshStandardMaterial
              map={screen}
              emissive="#ffffff"
              emissiveMap={screen}
              emissiveIntensity={0.34 * screenOn}
              roughness={0.28}
              metalness={0}
              toneMapped
            />
          </mesh>
          {/* camera dot */}
          <mesh position={[0, LIDH / 2 - 0.12, LIDT / 2 + 0.006]}>
            <circleGeometry args={[0.02, 16]} />
            <meshStandardMaterial color="#1a1c1f" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
