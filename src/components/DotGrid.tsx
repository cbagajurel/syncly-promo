import { C } from "../constants";

interface DotGridProps {
  opacity?: number;
  spacing?: number;
  dotSize?: number;
  color?: string;
}

export const DotGrid = ({
  opacity = 0.35,
  spacing = 32,
  dotSize = 1.2,
  color = C.FG3,
}: DotGridProps) => {
  // Create an SVG pattern for repeating dots
  const patternSize = spacing;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-grid"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={patternSize / 2}
              cy={patternSize / 2}
              r={dotSize}
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
};
