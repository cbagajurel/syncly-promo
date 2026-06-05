import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C } from "../constants";

interface ProgressBarProps {
  delay?: number;
  duration?: number;
  height?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
}

export const ProgressBar = ({
  delay = 0,
  duration = 50,
  height = 3,
  color = C.ACCENT,
  bgColor = C.BORDER0,
  borderRadius = 2,
}: ProgressBarProps) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    Math.max(0, frame - delay),
    [0, duration],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        width: "100%",
        height,
        background: bgColor,
        borderRadius,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: color,
          borderRadius,
        }}
      />
    </div>
  );
};
