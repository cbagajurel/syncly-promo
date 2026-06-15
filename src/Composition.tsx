import { AbsoluteFill, Audio, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, DUR, MUSIC_URL, TOTAL_FRAMES, XFADE } from "./constants";
import {
  SceneHook,
  SceneProblem,
  SceneSolution,
  SceneFeatures,
  SceneShowcase,
  SceneEcosystem,
  SceneTrust,
  SceneCTA,
} from "./scenes";

const xfade = linearTiming({ durationInFrames: XFADE });

export const SynclyPromo = () => {
  return (
    <AbsoluteFill style={{ background: C.INK }}>
      {MUSIC_URL && (
        <Audio
          src={MUSIC_URL}
          volume={(f) =>
            interpolate(
              f,
              [0, 24, TOTAL_FRAMES - 36, TOTAL_FRAMES],
              [0, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DUR.HOOK}>
          <SceneHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.PROBLEM}>
          <SceneProblem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={xfade}
        />

        <TransitionSeries.Sequence durationInFrames={DUR.SOLUTION}>
          <SceneSolution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.FEATURES}>
          <SceneFeatures />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.SHOWCASE}>
          <SceneShowcase />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.ECOSYSTEM}>
          <SceneEcosystem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.TRUST}>
          <SceneTrust />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.CTA}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
