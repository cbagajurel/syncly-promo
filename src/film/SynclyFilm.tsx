import { AbsoluteFill, Audio, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ACT, MUSIC, TOTAL, XFADE, L } from "./theme";
import { Act1Reveal } from "./acts/Act1Reveal";
import { Act2Product } from "./acts/Act2Product";
import { Act3Showcase } from "./acts/Act3Showcase";
import { Act4Story } from "./acts/Act4Story";
import { Act5Hero } from "./acts/Act5Hero";

const xfade = linearTiming({ durationInFrames: XFADE });

/**
 * SynclyFilm — an Apple-style, light-theme product film.
 * Five acts dissolve into one another: silence → product → software →
 * story → hero. A photoreal MacBook hero, real Syncly UI, minimal type.
 */
export const SynclyFilm = () => {
  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      <Audio
        src={MUSIC}
        volume={(f) =>
          interpolate(
            f,
            [0, 24, TOTAL - 48, TOTAL],
            [0, 0.42, 0.42, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={ACT.A1_REVEAL}>
          <Act1Reveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={ACT.A2_PRODUCT}>
          <Act2Product />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={ACT.A3_SHOWCASE}>
          <Act3Showcase />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={ACT.A4_STORY}>
          <Act4Story />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={xfade} />

        <TransitionSeries.Sequence durationInFrames={ACT.A5_HERO}>
          <Act5Hero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
