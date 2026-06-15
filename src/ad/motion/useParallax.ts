import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Per-layer parallax drift over the life of a scene. `depth` 0 = static,
 * 1 = full travel; foreground layers take larger depths than background.
 */
export function useParallax(depth: number, travel = 40) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { y: -travel * depth * p, x: 0, p };
}
