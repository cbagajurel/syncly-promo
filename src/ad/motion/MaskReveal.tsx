import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ADEASE, bezier, type Bezier } from "./easings";

type Dir = "left" | "right" | "up" | "down";

const insetFor = (dir: Dir, p: number): string => {
  const v = (1 - p) * 100;
  if (dir === "left") return `inset(0 ${v}% 0 0)`;
  if (dir === "right") return `inset(0 0 0 ${v}%)`;
  if (dir === "up") return `inset(0 0 ${v}% 0)`;
  return `inset(${v}% 0 0 0)`;
};

/** Clip-path wipe that reveals its children along an axis. */
export function MaskReveal({
  delay = 0,
  dur = 20,
  dir = "left",
  ease = ADEASE.EDITORIAL,
  className,
  style,
  children,
}: {
  delay?: number;
  dur?: number;
  dir?: Dir;
  ease?: Bezier;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    easing: bezier(ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      className={className}
      style={{ clipPath: insetFor(dir, p), WebkitClipPath: insetFor(dir, p), ...style }}
    >
      {children}
    </div>
  );
}
