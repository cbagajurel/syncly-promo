import { interpolate } from "remotion";
import { F, C } from "../theme";
import { RADIUS, SHADOW, SPACE } from "../tokens";

type Pt = { x: number; y: number };

/**
 * A post card that lifts from the composer and flies along a bowed path into a
 * calendar cell. `t` 0→1 drives the flight; at the end it reads as "Scheduled".
 */
export function PostFlight({
  t,
  from,
  to,
  accent = C.ACCENT,
  label = "Spring drop",
  thumb = "#E9ECF3",
}: {
  t: number;
  from: Pt;
  to: Pt;
  accent?: string;
  label?: string;
  thumb?: string;
}) {
  const x = interpolate(t, [0, 1], [from.x, to.x]);
  const baseY = interpolate(t, [0, 1], [from.y, to.y]);
  const bow = -120 * Math.sin(t * Math.PI);
  const scale = interpolate(t, [0, 0.5, 1], [1, 0.78, 0.5]);
  const landed = t > 0.92;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: baseY + bow,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 220,
        background: C.SURFACE,
        border: `1px solid ${C.HAIRLINE}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.float,
        overflow: "hidden",
        fontFamily: F.display,
        opacity: interpolate(t, [0, 0.05, 0.97, 1], [0, 1, 1, 0]),
      }}
    >
      <div style={{ height: 120, background: thumb }} />
      <div style={{ padding: SPACE[3] }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.INK }}>{label}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: SPACE[2],
            marginTop: SPACE[2],
            fontSize: 12,
            fontWeight: 600,
            color: landed ? accent : C.INK_3,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: RADIUS.pill, background: accent }} />
          {landed ? "Scheduled" : "Publishing…"}
        </div>
      </div>
    </div>
  );
}
