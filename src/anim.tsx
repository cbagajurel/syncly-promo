import type { CSSProperties, ReactNode } from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE, SPRING } from "./constants";

type SpringName = keyof typeof SPRING;
type Bezier = readonly [number, number, number, number];

/** Eased 0→1 over [delay, delay+dur] frames with a cubic-bezier curve. */
export function useEnter(
  delay = 0,
  dur = 18,
  ease: Bezier = EASE.OUT,
): number {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + dur], [0, 1], {
    easing: Easing.bezier(ease[0], ease[1], ease[2], ease[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Snappy bezier entrance wrapper (faster than the spring-based Reveal). */
export function Enter({
  delay = 0,
  dur = 18,
  y = 24,
  x = 0,
  scale = 0.98,
  ease = EASE.OUT,
  className,
  style,
  children,
}: {
  delay?: number;
  dur?: number;
  y?: number;
  x?: number;
  scale?: number;
  ease?: Bezier;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const p = useEnter(delay, dur, ease);
  return (
    <div
      className={className}
      style={{
        opacity: p,
        transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px) scale(${
          scale + (1 - scale) * p
        })`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Fade + slide + subtle scale entrance, driven by the current frame. */
export function Reveal({
  delay = 0,
  y = 16,
  scale = 0.985,
  x = 0,
  spring: springName = "SMOOTH",
  className,
  style,
  children,
}: {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  spring?: SpringName;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: SPRING[springName],
  });
  const opacity = interpolate(p, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const ty = interpolate(p, [0, 1], [y, 0]);
  const tx = interpolate(p, [0, 1], [x, 0]);
  const s = interpolate(p, [0, 1], [scale, 1]);
  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Number of characters of `text` revealed so far (typewriter). */
export function useTyped(text: string, startFrame = 0, cps = 26): string {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, (frame - startFrame) / fps);
  const n = Math.floor(elapsed * cps);
  return text.slice(0, Math.min(n, text.length));
}

/** Eased 0→1 progress over [from, to] frames. */
export function useProgress(from: number, to: number): number {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** A soft pointer cursor for "live product" beats. */
export function Cursor({
  x,
  y,
  pressed = false,
}: {
  x: number;
  y: number;
  pressed?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 60,
        transform: `scale(${pressed ? 0.88 : 1})`,
        transition: "transform 80ms ease",
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 8px rgba(15,23,42,0.28))",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3l14 8.5-6 1.4-1.6 6.1L5 3z"
          fill="#fff"
          stroke="#1c1a17"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {pressed && (
        <span
          style={{
            position: "absolute",
            left: -8,
            top: -8,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
}

/** Keyframe a value across frames: kf(frame, [[f0,v0],[f1,v1],...]). */
export function kf(frame: number, points: [number, number][]): number {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return interpolate(frame, xs, ys, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}
