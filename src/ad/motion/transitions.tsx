import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, interpolate } from "remotion";

type Empty = Record<string, never>;
type Props = TransitionPresentationComponentProps<Empty>;

/** Depth push — the leaving scene recedes while the next arrives from far. */
const PerspectivePush: React.FC<Props> = ({
  presentationDirection: dir,
  presentationProgress: p,
  children,
}) => {
  const style =
    dir === "entering"
      ? {
          opacity: interpolate(p, [0, 0.45], [0, 1], { extrapolateRight: "clamp" }),
          transform: `perspective(1700px) translateZ(${interpolate(p, [0, 1], [-560, 0])}px)`,
        }
      : {
          opacity: interpolate(p, [0.55, 1], [1, 0], { extrapolateLeft: "clamp" }),
          transform: `perspective(1700px) translateZ(${interpolate(p, [0, 1], [0, 360])}px)`,
        };
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const perspectivePush = (): TransitionPresentation<Empty> => ({
  component: PerspectivePush,
  props: {},
});

/** Linear-style layer slide — next panel slides over, previous parallax-lags. */
const LayerSlide: React.FC<Props> = ({
  presentationDirection: dir,
  presentationProgress: p,
  children,
}) => {
  const style =
    dir === "entering"
      ? {
          transform: `translateX(${interpolate(p, [0, 1], [70, 0])}px)`,
          opacity: interpolate(p, [0, 0.35], [0, 1], { extrapolateRight: "clamp" }),
          filter: `drop-shadow(-40px 0 80px rgba(15,20,30,0.12))`,
        }
      : {
          transform: `translateX(${interpolate(p, [0, 1], [0, -34])}px)`,
          opacity: interpolate(p, [0.5, 1], [1, 0], { extrapolateLeft: "clamp" }),
        };
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const layerSlide = (): TransitionPresentation<Empty> => ({
  component: LayerSlide,
  props: {},
});

/** Shared-element morph — leaving scene scales/blurs out as the next scales in. */
const MorphScale: React.FC<Props> = ({
  presentationDirection: dir,
  presentationProgress: p,
  children,
}) => {
  const style =
    dir === "entering"
      ? {
          transform: `scale(${interpolate(p, [0, 1], [0.92, 1])})`,
          opacity: interpolate(p, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
        }
      : {
          transform: `scale(${interpolate(p, [0, 1], [1, 1.08])})`,
          opacity: interpolate(p, [0.4, 1], [1, 0], { extrapolateLeft: "clamp" }),
          filter: `blur(${interpolate(p, [0.4, 1], [0, 8], { extrapolateLeft: "clamp" })}px)`,
        };
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const morphScale = (): TransitionPresentation<Empty> => ({
  component: MorphScale,
  props: {},
});
