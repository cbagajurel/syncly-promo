import type { CSSProperties } from "react";
import { DISPLAY, MONO, C } from "../constants";
import { useEnter } from "../anim";

/**
 * A premium headline line with a mask reveal — the line rises from behind a
 * clip edge while fading in. No per-word kinetics, no typing. One clean move.
 */
export function Statement({
  children,
  delay = 0,
  dur = 22,
  size = 92,
  weight = 600,
  color = C.WHITE,
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
    <div style={{ overflow: "hidden", paddingBottom: "0.08em", ...style }}>
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: size,
          fontWeight: weight,
          letterSpacing: "-0.035em",
          lineHeight: 1.04,
          color,
          textAlign: align,
          transform: `translateY(${(1 - p) * size * 0.9}px)`,
          opacity: Math.min(1, p * 1.4),
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Mono uppercase eyebrow label with a leading accent tick. */
export function Eyebrow({
  children,
  delay = 0,
  color = C.ACCENT,
  size = 18,
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
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
      }}
    >
      <span style={{ width: 22, height: 1.5, background: color, opacity: 0.7 }} />
      {children}
    </span>
  );
}
