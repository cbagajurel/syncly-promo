import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { useEnter } from "../../anim";
import { F, L } from "../theme";

/** Holds children for `dur` frames, fading them out over the last `tail`. Pair
 *  with a <Sequence> so caption beats appear and dissolve on schedule. */
export function Beat({
  children,
  dur,
  tail = 16,
}: {
  children: ReactNode;
  dur: number;
  tail?: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [dur - tail, dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity, width: "100%", height: "100%" }}>{children}</div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Apple-calm typography for the film. Each line rises from behind a clip edge
   while fading — one clean move, no per-word kinetics. Ink-on-white.
   ───────────────────────────────────────────────────────────────────────── */

export function Line({
  children,
  delay = 0,
  dur = 26,
  size = 78,
  weight = 500,
  color = L.INK,
  align = "center",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  dur?: number;
  size?: number;
  weight?: number;
  color?: string;
  align?: "center" | "left";
  style?: CSSProperties;
}) {
  const p = useEnter(delay, dur);
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.12em", ...style }}>
      <div
        style={{
          fontFamily: F.display,
          fontSize: size,
          fontWeight: weight,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color,
          textAlign: align,
          transform: `translateY(${(1 - p) * size * 0.85}px)`,
          opacity: Math.min(1, p * 1.5),
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** A two-line Apple statement: a muted lead-in line + an ink emphasis line. */
export function Caption({
  lead,
  emphasis,
  delay = 0,
  size = 78,
  align = "center",
  style,
}: {
  lead: string;
  emphasis: string;
  delay?: number;
  size?: number;
  align?: "center" | "left";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: size * 0.04,
        ...style,
      }}
    >
      <Line delay={delay} size={size} weight={400} color={L.INK_2} align={align}>
        {lead}
      </Line>
      <Line delay={delay + 9} size={size} weight={500} color={L.INK} align={align}>
        {emphasis}
      </Line>
    </div>
  );
}

/** Mono uppercase eyebrow with a leading accent tick (used sparingly). */
export function Eyebrow({
  children,
  delay = 0,
  color = L.ACCENT,
  size = 17,
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
}) {
  const p = useEnter(delay, 16);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontFamily: F.mono,
        fontSize: size,
        letterSpacing: "0.34em",
        textTransform: "uppercase",
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
      }}
    >
      <span style={{ width: 24, height: 1.5, background: color, opacity: 0.7 }} />
      {children}
    </span>
  );
}
