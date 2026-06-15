import { useCurrentFrame, interpolate } from "remotion";
import { F, C } from "../theme";
import { ADEASE, bezier } from "../motion/easings";

/** Mono uppercase kicker with a leading accent tick. */
export function Eyebrow({
  text,
  delay = 0,
  size = 17,
  color = C.ACCENT,
}: {
  text: string;
  delay?: number;
  size?: number;
  color?: string;
}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {
    easing: bezier(ADEASE.EDITORIAL),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: F.mono,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
      }}
    >
      <span style={{ width: 22, height: 1.5, background: color, opacity: 0.8 }} />
      {text}
    </div>
  );
}
