import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useEnter } from "../../anim";
import { F, C, LOGO } from "../theme";
import { RADIUS, SHADOW, pulse } from "../tokens";

/* Channels converging into one hub — the SyncHub philosophy, premium-skinned.
   Connectors draw in, pulses travel node→center forever, the ring breathes. */

const NODES = [
  { icon: "instagram.png", angle: -90 },
  { icon: "facebook.png", angle: -26 },
  { icon: "whatsapp.png", angle: 38 },
  { icon: "tik-tok.png", angle: 142 },
  { icon: "linkedin.png", angle: 218 },
];

const polar = (deg: number, r: number, cx: number, cy: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
};

export function HubDiagram({
  delay = 0,
  accent = C.ACCENT,
  cx = 960,
  cy = 520,
  radius = 300,
  scale = 1,
  opacity = 1,
}: {
  delay?: number;
  accent?: string;
  cx?: number;
  cy?: number;
  radius?: number;
  scale?: number;
  opacity?: number;
}) {
  const frame = useCurrentFrame();
  const draw = useEnter(delay + 8, 44);
  const hub = useEnter(delay, 22);

  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})`, transformOrigin: `${cx}px ${cy}px` }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {NODES.map((n, i) => {
          const p = polar(n.angle, radius, cx, cy);
          const len = Math.hypot(p.x - cx, p.y - cy);
          const t = (((frame - delay) / 60 + i * 0.2) % 1 + 1) % 1;
          const px = p.x + (cx - p.x) * t;
          const py = p.y + (cy - p.y) * t;
          const on = draw > 0.9 ? 1 : 0;
          return (
            <g key={n.icon}>
              <line
                x1={p.x}
                y1={p.y}
                x2={cx}
                y2={cy}
                stroke={C.HAIRLINE}
                strokeWidth={1.5}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - draw)}
              />
              <circle
                cx={px}
                cy={py}
                r={5}
                fill={accent}
                opacity={on * (0.25 + 0.6 * Math.sin(t * Math.PI))}
              />
            </g>
          );
        })}
      </svg>

      {NODES.map((n, i) => {
        const p = polar(n.angle, radius, cx, cy);
        const e = interpolate(frame, [delay + 14 + i * 5, delay + 32 + i * 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const size = 92;
        return (
          <div
            key={n.icon}
            style={{
              position: "absolute",
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              borderRadius: RADIUS.xl,
              background: C.SURFACE,
              border: `1px solid ${C.HAIRLINE}`,
              boxShadow: SHADOW.lift,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: e,
              transform: `scale(${0.8 + 0.2 * e})`,
            }}
          >
            <Img src={staticFile(n.icon)} style={{ width: size * 0.54, height: size * 0.54, objectFit: "contain" }} />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: cx - 84,
          top: cy - 84,
          width: 168,
          height: 168,
          borderRadius: 42,
          background: C.SURFACE,
          border: `1px solid ${C.HAIRLINE}`,
          boxShadow: SHADOW.float,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hub,
          transform: `scale(${0.84 + 0.16 * hub})`,
        }}
      >
        <Img src={LOGO} style={{ width: 96, height: 96, borderRadius: 22 }} />
        <span
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 52,
            border: `1.5px solid ${accent}`,
            opacity: 0.15 + 0.2 * pulse(frame, 48),
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: -28,
            borderRadius: 70,
            border: `1px solid ${accent}`,
            opacity: 0.06 + 0.12 * pulse(frame + 12, 48),
          }}
        />
      </div>

      <span style={{ display: "none", fontFamily: F.mono }} />
    </AbsoluteFill>
  );
}
