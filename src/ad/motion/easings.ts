import { Easing } from "remotion";

export { EASE, SPRING } from "../../constants";

export type Bezier = readonly [number, number, number, number];

// Ad-specific curves on top of the shared EASE set.
export const ADEASE = {
  EDITORIAL: [0.22, 1, 0.36, 1] as const,
  PUSH: [0.65, 0, 0.35, 1] as const,
  EXPO: [0.16, 1, 0.3, 1] as const,
} as const;

export const bezier = (e: Bezier) => Easing.bezier(e[0], e[1], e[2], e[3]);
