import type { CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { F, C } from "../theme";
import { ADEASE, bezier, type Bezier } from "./easings";

type Align = "left" | "center" | "right";

/**
 * Linear/Stripe-style headline: each word rises from behind a clip edge with a
 * per-word stagger and a subtle tracking-in. Optional emphasis word painted in
 * the emerald accent. The statement is the hero of every scene's lower third.
 */
export function KineticType({
  text,
  delay = 0,
  per = 7,
  dur = 22,
  size = 96,
  weight = 600,
  color = C.INK,
  accentWord,
  accentColor = C.ACCENT,
  accentGradient,
  align = "left",
  lineHeight = 1.02,
  ease = ADEASE.EDITORIAL,
  style,
}: {
  text: string;
  delay?: number;
  per?: number;
  dur?: number;
  size?: number;
  weight?: number;
  color?: string;
  accentWord?: string;
  accentColor?: string;
  accentGradient?: [string, string];
  align?: Align;
  lineHeight?: number;
  ease?: Bezier;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${size * 0.28}px`,
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        fontFamily: F.display,
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        letterSpacing: "-0.02em",
        color,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const start = delay + i * per;
        const p = interpolate(frame, [start, start + dur], [0, 1], {
          easing: bezier(ease),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isAccent =
          accentWord && w.replace(/[.,]/g, "") === accentWord.replace(/[.,]/g, "");
        const gradientStyle: CSSProperties =
          isAccent && accentGradient
            ? {
                backgroundImage: `linear-gradient(100deg, ${accentGradient[0]}, ${accentGradient[1]})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }
            : { color: isAccent ? accentColor : undefined };
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: size * 0.12,
              marginBottom: -size * 0.12,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * 112}%)`,
                opacity: interpolate(p, [0, 0.4], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                ...gradientStyle,
                willChange: "transform",
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
}
