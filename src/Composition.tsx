import { AbsoluteFill, Audio, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { DUR, MUSIC_URL, STAGE, TOTAL_FRAMES, XFADE } from "./constants";
import {
  SceneHook3D,
  SceneUnify3D,
  SceneProductTour,
  SceneOutcome3D,
  SceneCTA3D,
} from "./scenes";

const xfade = linearTiming({ durationInFrames: XFADE });

export const SynclyPromo = () => {
  return (
    <AbsoluteFill style={{ background: STAGE.BG }}>
      {MUSIC_URL && (
        <Audio
          src={MUSIC_URL}
          volume={(f) =>
            interpolate(
              f,
              [0, 20, TOTAL_FRAMES - 30, TOTAL_FRAMES],
              [0, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DUR.HOOK}>
          <SceneHook3D />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.UNIFY}>
          <SceneUnify3D />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={xfade}
        />

        <TransitionSeries.Sequence durationInFrames={DUR.TOUR}>
          <SceneProductTour />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.OUTCOME}>
          <SceneOutcome3D />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={DUR.CTA}>
          <SceneCTA3D />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
