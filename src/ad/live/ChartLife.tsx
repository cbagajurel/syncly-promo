import { useCurrentFrame } from "remotion";
import { F, C } from "../theme";
import { RADIUS, SHADOW } from "../tokens";
import { loop } from "../tokens";

type Rect = { x: number; y: number; w: number; h: number };

/** Normalised trend curve (0 bottom … 1 top) used for the tooltip's height. */
const trend = (u: number) =>
  0.45 + 0.32 * Math.sin(u * Math.PI * 1.4) + 0.12 * Math.sin(u * Math.PI * 4);

/**
 * A tooltip dot that sweeps along the analytics area chart on a continuous
 * loop, with a vertical guide and a live value bubble — the chart feels live.
 */
export function ChartLife({
  rect,
  accent = C.ACCENT,
  period = 150,
  base = 820,
  span = 640,
}: {
  rect: Rect;
  accent?: string;
  period?: number;
  base?: number;
  span?: number;
}) {
  const frame = useCurrentFrame();
  const u = loop(frame, period);
  const x = rect.x + u * rect.w;
  const y = rect.y + rect.h - trend(u) * rect.h;
  const value = Math.round(base + trend(u) * span);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: rect.y,
          width: 1.5,
          height: rect.h,
          background: `linear-gradient(${accent}55, transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 14,
          height: 14,
          marginLeft: -7,
          marginTop: -7,
          borderRadius: RADIUS.pill,
          background: accent,
          border: "3px solid #fff",
          boxShadow: SHADOW.card,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y - 52,
          transform: "translateX(-50%)",
          background: C.INK,
          color: "#fff",
          borderRadius: RADIUS.md,
          padding: "6px 12px",
          fontFamily: F.mono,
          fontSize: 15,
          fontWeight: 600,
          whiteSpace: "nowrap",
          boxShadow: SHADOW.lift,
        }}
      >
        {value.toLocaleString("en-US")} msgs
      </div>
    </div>
  );
}
