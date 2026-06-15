import { useMemo } from "react";
import * as THREE from "three";
import { STAGE } from "../constants";

/* ── Screen texture: a clean, stylised dashboard painted to a canvas ──────
   At orbit distance + DOF this reads as the real product without needing a
   pre-rendered screenshot asset. Emissive so it glows like a display.       */
function useScreenTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const W = 1600;
    const H = 1000;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const x = c.getContext("2d")!;
    const ACCENT = "#34d399";
    const INK = "#1c1a17";
    const MUT = "#9a948a";

    // page
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, W, H);

    const round = (px: number, py: number, w: number, h: number, r: number) => {
      x.beginPath();
      x.moveTo(px + r, py);
      x.arcTo(px + w, py, px + w, py + h, r);
      x.arcTo(px + w, py + h, px, py + h, r);
      x.arcTo(px, py + h, px, py, r);
      x.arcTo(px, py, px + w, py, r);
      x.closePath();
    };

    // sidebar
    x.fillStyle = "#f7f6f4";
    x.fillRect(0, 0, 250, H);
    x.strokeStyle = "#ebe9e4";
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(250, 0);
    x.lineTo(250, H);
    x.stroke();
    // brand mark
    x.fillStyle = "#283154";
    round(28, 30, 34, 34, 9);
    x.fill();
    x.fillStyle = INK;
    x.font = "600 22px sans-serif";
    x.fillText("Syncly", 74, 53);
    // compose button
    x.fillStyle = ACCENT;
    round(28, 86, 194, 40, 10);
    x.fill();
    x.fillStyle = "#04140d";
    x.font = "600 15px sans-serif";
    x.fillText("+  Compose", 70, 112);
    // nav items
    const nav = ["Dashboard", "Inbox", "Posts", "Schedule", "Analytics", "Settings"];
    nav.forEach((label, i) => {
      const ny = 152 + i * 48;
      if (i === 0) {
        x.fillStyle = "#efeee9";
        round(20, ny - 6, 210, 38, 9);
        x.fill();
        x.fillStyle = ACCENT;
        round(20, ny - 2, 4, 30, 2);
        x.fill();
      }
      x.fillStyle = i === 0 ? INK : MUT;
      x.font = `${i === 0 ? "600" : "500"} 16px sans-serif`;
      x.fillText(label, 50, ny + 18);
      if (label === "Inbox") {
        x.fillStyle = ACCENT;
        round(196, ny - 2, 34, 24, 12);
        x.fill();
        x.fillStyle = "#04140d";
        x.font = "700 12px sans-serif";
        x.fillText("26", 205, ny + 14);
      }
    });

    // top bar
    x.fillStyle = "#ffffff";
    x.fillRect(250, 0, W - 250, 70);
    x.strokeStyle = "#ebe9e4";
    x.beginPath();
    x.moveTo(250, 70);
    x.lineTo(W, 70);
    x.stroke();
    x.fillStyle = MUT;
    x.font = "500 15px monospace";
    x.fillText("Atlas Studio  /", 286, 43);
    x.fillStyle = INK;
    x.font = "600 15px sans-serif";
    x.fillText("Dashboard", 410, 43);

    // greeting
    x.fillStyle = INK;
    x.font = "700 30px sans-serif";
    x.fillText("Good morning, Mara.", 300, 140);
    x.fillStyle = MUT;
    x.font = "400 16px sans-serif";
    x.fillText("2 platforms connected", 300, 170);

    // metric cards
    const cards = [
      ["Unread messages", "26"],
      ["Scheduled posts", "4"],
      ["Connected platforms", "2"],
    ];
    cards.forEach(([label, val], i) => {
      const cx = 300 + i * 345;
      x.fillStyle = "#ffffff";
      x.strokeStyle = "#ebe9e4";
      x.lineWidth = 2;
      round(cx, 200, 320, 120, 16);
      x.fill();
      x.stroke();
      x.fillStyle = MUT;
      x.font = "500 14px sans-serif";
      x.fillText(label as string, cx + 24, 240);
      x.fillStyle = INK;
      x.font = "700 40px sans-serif";
      x.fillText(val as string, cx + 24, 296);
    });

    // chart panel
    x.fillStyle = "#ffffff";
    x.strokeStyle = "#ebe9e4";
    round(300, 350, 665, 600, 16);
    x.fill();
    x.stroke();
    x.fillStyle = INK;
    x.font = "600 17px sans-serif";
    x.fillText("Engagement", 326, 392);
    // bars
    const bars = [120, 180, 150, 240, 200, 300, 260, 340, 290, 380];
    bars.forEach((b, i) => {
      const bx = 340 + i * 58;
      x.fillStyle = i === bars.length - 1 ? ACCENT : "#dfe7e3";
      round(bx, 900 - b, 34, b, 6);
      x.fill();
    });
    // trend line
    x.strokeStyle = ACCENT;
    x.lineWidth = 3;
    x.beginPath();
    bars.forEach((b, i) => {
      const bx = 340 + i * 58 + 17;
      const by = 900 - b - 30;
      if (i === 0) x.moveTo(bx, by);
      else x.lineTo(bx, by);
    });
    x.stroke();

    // conversations panel
    x.fillStyle = "#ffffff";
    x.strokeStyle = "#ebe9e4";
    round(985, 350, 580, 600, 16);
    x.fill();
    x.stroke();
    x.fillStyle = INK;
    x.font = "600 17px sans-serif";
    x.fillText("Recent conversations", 1011, 392);
    const names = ["Maya Rivera", "Daniel Park", "Priya Shah", "Tom Chen", "Aria Patel"];
    names.forEach((n, i) => {
      const ry = 430 + i * 96;
      x.fillStyle = "#efeee9";
      x.beginPath();
      x.arc(1035, ry + 24, 22, 0, Math.PI * 2);
      x.fill();
      x.fillStyle = INK;
      x.font = "600 16px sans-serif";
      x.fillText(n, 1075, ry + 20);
      x.fillStyle = MUT;
      x.font = "400 14px sans-serif";
      x.fillText("Loved the new drop ✨", 1075, ry + 44);
      x.fillStyle = ACCENT;
      x.beginPath();
      x.arc(1075, ry + 38, 3, 0, Math.PI * 2);
      x.fill();
    });

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* Soft round contact shadow as a radial-gradient texture (guaranteed soft
   grounding regardless of shadow-map hardness). */
function useContactShadow(): THREE.CanvasTexture {
  return useMemo(() => {
    const S = 512;
    const c = document.createElement("canvas");
    c.width = S;
    c.height = S;
    const x = c.getContext("2d")!;
    const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(0.5, "rgba(0,0,0,0.22)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(c);
  }, []);
}

/**
 * An open MacBook built from simple geometry — anodized body, a glowing
 * dashboard screen, and a soft contact shadow. Sits at the origin; the
 * camera (CameraRig) does the slow dolly-orbit.
 */
export function MacBook3D() {
  const screen = useScreenTexture();
  const contact = useContactShadow();

  const lidLean = -0.2; // radians — gentle open-back lean
  const W = 4.2;
  const D = 2.9;

  return (
    <group position={[0, -0.9, 0]}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={STAGE.FLOOR} roughness={0.95} metalness={0} />
      </mesh>

      {/* soft contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0.2]}>
        <planeGeometry args={[7.5, 6]} />
        <meshBasicMaterial map={contact} transparent depthWrite={false} opacity={0.9} />
      </mesh>

      {/* base deck */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.22, D]} />
        <meshStandardMaterial color={STAGE.ALU} metalness={0.35} roughness={0.46} />
      </mesh>

      {/* keyboard well */}
      <mesh position={[0, 0.235, 0.18]}>
        <boxGeometry args={[W - 0.5, 0.02, D - 0.9]} />
        <meshStandardMaterial color="#17181b" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* trackpad */}
      <mesh position={[0, 0.245, D / 2 - 0.55]}>
        <boxGeometry args={[1.4, 0.015, 0.85]} />
        <meshStandardMaterial color="#202225" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* lid (hinges at the back edge) */}
      <group position={[0, 0.22, -D / 2]} rotation={[lidLean, 0, 0]}>
        <group position={[0, 1.35, 0]}>
          {/* lid shell */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[W, 2.7, 0.13]} />
            <meshStandardMaterial color={STAGE.ALU} metalness={0.35} roughness={0.46} />
          </mesh>
          {/* dark bezel frame behind the screen */}
          <mesh position={[0, 0.06, 0.066]}>
            <planeGeometry args={[W - 0.18, 2.52]} />
            <meshStandardMaterial color="#0c0d0f" metalness={0.2} roughness={0.6} />
          </mesh>
          {/* screen */}
          <mesh position={[0, 0.06, 0.075]}>
            <planeGeometry args={[W - 0.34, 2.36]} />
            <meshStandardMaterial
              map={screen}
              emissive="#ffffff"
              emissiveMap={screen}
              emissiveIntensity={0.42}
              roughness={0.3}
              metalness={0}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
