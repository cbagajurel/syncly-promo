import type { CSSProperties, ReactNode } from "react";
import { L } from "../theme";

/**
 * A floating UI panel — the Apple way to present software: a real screen at
 * native resolution, down-scaled into a soft, rounded, shadowed card with a
 * hairline edge. Supports parallax/depth via the transform props so panels can
 * drift at different rates over a scene.
 */
export function FloatingPanel({
  children,
  width = 1180,
  aspect = 1080 / 1920,
  radius,
  chrome = false,
  opacity = 1,
  tx = 0,
  ty = 0,
  scale = 1,
  rotate = 0,
  z = 0,
  style,
}: {
  children: ReactNode;
  width?: number;
  aspect?: number;
  radius?: number;
  chrome?: boolean;
  opacity?: number;
  tx?: number;
  ty?: number;
  scale?: number;
  rotate?: number;
  z?: number;
  style?: CSSProperties;
}) {
  const height = Math.round(width * aspect);
  const r = radius ?? Math.round(width * 0.022);
  const barH = chrome ? Math.max(34, Math.round(width * 0.03)) : 0;

  // Depth-aware shadow: panels further back cast a softer, lower shadow.
  const lift = 1 - Math.min(1, Math.abs(z) / 600) * 0.5;
  const shadow = `0 ${Math.round(60 * lift)}px ${Math.round(
    120 * lift,
  )}px -30px rgba(15,18,26,${0.28 * lift}), 0 ${Math.round(
    18 * lift,
  )}px 40px -24px rgba(15,18,26,${0.18 * lift})`;

  return (
    <div
      style={{
        position: "absolute",
        width,
        opacity,
        transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        willChange: "transform, opacity",
        borderRadius: r,
        background: L.WHITE,
        boxShadow: shadow,
        border: `1px solid ${L.HAIRLINE}`,
        overflow: "hidden",
        ...style,
      }}
    >
      {chrome && (
        <div
          style={{
            height: barH,
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 16,
            background: L.SURFACE,
            borderBottom: `1px solid ${L.HAIRLINE}`,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{
                width: barH * 0.26,
                height: barH * 0.26,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
      )}
      <div style={{ position: "relative", width, height, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            transform: `scale(${width / 1920})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
        {/* faint top sheen for glass realism */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 24%)",
          }}
        />
      </div>
    </div>
  );
}
