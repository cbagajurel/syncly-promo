import type { CSSProperties } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TextRevealProps {
  delay?: number;
  style?: CSSProperties;
  children: React.ReactNode;
}

// Reveals text by sliding it up from behind a clip mask
export const TextReveal = ({ delay = 0, style, children }: TextRevealProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - delay);
  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.8 },
  });

  const y = interpolate(progress, [0, 1], [110, 0]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden", display: "inline-block" }}>
      <div
        style={{
          transform: `translateY(${y}%)`,
          opacity,
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
