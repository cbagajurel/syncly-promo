import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../constants";
import { useEnter } from "../anim";

/**
 * Floats a full-resolution UI screen as a tilted glass panel seated in the
 * 3D stage — perspective + gentle frame-driven float/parallax + glare sweep.
 * The child renders at native 1920×1080 then the whole plane is scaled, so
 * the UI stays crisp.
 */
export function Panel3D({
  children,
  enterDelay = 0,
  tiltY = -7,
  tiltX = 5,
  baseScale = 0.82,
  enterX = 120,
  offsetY = 0,
}: {
  children: ReactNode;
  enterDelay?: number;
  tiltY?: number;
  tiltX?: number;
  baseScale?: number;
  enterX?: number;
  offsetY?: number;
}) {
  const frame = useCurrentFrame();
  const p = useEnter(enterDelay, 18, EASE.OUT);

  const float = Math.sin(frame * 0.02) * 7;
  const wobbleY = Math.sin(frame * 0.013) * 1.6;
  const scale = baseScale * (0.97 + p * 0.03);
  const x = (1 - p) * enterX;
  const y = (1 - p) * 50 + float + offsetY;
  const glareX = interpolate(frame % 170, [0, 170], [-60, 170]);

  return (
    <AbsoluteFill style={{ display: "grid", placeItems: "center", perspective: 2000 }}>
      <div
        style={{
          width: 1920,
          height: 1080,
          opacity: p,
          transformStyle: "preserve-3d",
          transform: `translate(${x}px, ${y}px) rotateX(${tiltX}deg) rotateY(${
            tiltY + wobbleY
          }deg) scale(${scale})`,
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          boxShadow:
            "0 70px 130px -28px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {children}
        {/* Soft glare sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 48%, transparent 58%)",
            transform: `translateX(${glareX}%)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
