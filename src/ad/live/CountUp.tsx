import type { CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ADEASE, bezier } from "../motion/easings";

/** Eased value counting from→to over [start, start+dur]. */
export function useCountUp(from: number, to: number, start = 0, dur = 40) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [from, to], {
    easing: bezier(ADEASE.EDITORIAL),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function format(v: number, decimals: number) {
  if (decimals > 0) return v.toFixed(decimals);
  return Math.round(v).toLocaleString("en-US");
}

export function CountUp({
  from,
  to,
  start = 0,
  dur = 40,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
}: {
  from: number;
  to: number;
  start?: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: CSSProperties;
}) {
  const v = useCountUp(from, to, start, dur);
  return (
    <span style={style}>
      {prefix}
      {format(v, decimals)}
      {suffix}
    </span>
  );
}
