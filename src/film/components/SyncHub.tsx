import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useEnter } from "../../anim";
import { EASE } from "../../constants";
import { F, L } from "../theme";

/** Eased 0→1 over [d, d+dur] using a frame value already in scope (no hook). */
function ease(frame: number, d: number, dur = 18): number {
  return interpolate(frame, [d, d + dur], [0, 1], {
    easing: Easing.bezier(EASE.OUT[0], EASE.OUT[1], EASE.OUT[2], EASE.OUT[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/* Channels converging into one calm hub — the visual statement of Act 4.
   A central Syncly mark, platforms on a ring, hairline connectors that draw in,
   and gentle emerald pulses flowing inward (the "sync"). No labels, no noise. */

const CENTER = { x: 960, y: 520 };
const RADIUS = 300;

const NODES = [
  { icon: "instagram.png", angle: -90 },
  { icon: "facebook.png", angle: -26 },
  { icon: "whatsapp.png", angle: 38 },
  { icon: "tik-tok.png", angle: 142 },
  { icon: "linkedin.png", angle: 218 },
];

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + Math.cos(a) * r, y: CENTER.y + Math.sin(a) * r };
}

export function SyncHub({ delay = 0 }: { delay?: number }) {
  const frame = useCurrentFrame();
  const draw = useEnter(delay + 8, 44); // connector draw-in 0→1
  const hub = useEnter(delay, 22);

  return (
    <AbsoluteFill>
      {/* connectors + pulses */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {NODES.map((n, i) => {
          const p = polar(n.angle, RADIUS);
          const len = Math.hypot(p.x - CENTER.x, p.y - CENTER.y);
          const dash = len;
          // each pulse travels node→center on a slow, staggered loop
          const t = (((frame - delay) / 64 + i * 0.2) % 1 + 1) % 1;
          const px = p.x + (CENTER.x - p.x) * t;
          const py = p.y + (CENTER.y - p.y) * t;
          const pulseOn = draw > 0.9 ? 1 : 0;
          return (
            <g key={n.icon}>
              <line
                x1={p.x}
                y1={p.y}
                x2={CENTER.x}
                y2={CENTER.y}
                stroke={L.HAIRLINE}
                strokeWidth={1.5}
                strokeDasharray={dash}
                strokeDashoffset={dash * (1 - draw)}
              />
              <circle
                cx={px}
                cy={py}
                r={4}
                fill={L.ACCENT}
                opacity={pulseOn * (0.25 + 0.55 * Math.sin(t * Math.PI))}
              />
            </g>
          );
        })}
      </svg>

      {/* platform nodes */}
      {NODES.map((n, i) => {
        const p = polar(n.angle, RADIUS);
        const e = ease(frame, delay + 14 + i * 5, 18);
        const size = 96;
        return (
          <div
            key={n.icon}
            style={{
              position: "absolute",
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              borderRadius: 26,
              background: L.WHITE,
              border: `1px solid ${L.HAIRLINE}`,
              boxShadow: "0 18px 40px -22px rgba(15,18,26,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: e,
              transform: `scale(${0.8 + 0.2 * e})`,
            }}
          >
            <Img
              src={staticFile(n.icon)}
              style={{ width: size * 0.56, height: size * 0.56, objectFit: "contain" }}
            />
          </div>
        );
      })}

      {/* central hub — Syncly mark */}
      <div
        style={{
          position: "absolute",
          left: CENTER.x - 84,
          top: CENTER.y - 84,
          width: 168,
          height: 168,
          borderRadius: 44,
          background: L.WHITE,
          border: `1px solid ${L.HAIRLINE}`,
          boxShadow: "0 40px 80px -28px rgba(15,18,26,0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hub,
          transform: `scale(${0.84 + 0.16 * hub})`,
        }}
      >
        <Img
          src={staticFile("syncly.png")}
          style={{ width: 96, height: 96, borderRadius: 22 }}
        />
        {/* breathing ring */}
        <span
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 52,
            border: `1.5px solid ${L.ACCENT}`,
            opacity: 0.18 + 0.12 * Math.sin(frame / 12),
          }}
        />
      </div>

      {/* faint caption slot anchor handled by Act4 */}
      <span style={{ display: "none", fontFamily: F.mono }} />
    </AbsoluteFill>
  );
}
