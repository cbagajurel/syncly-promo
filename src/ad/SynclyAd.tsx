import { AbsoluteFill, Audio, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { ACT, MUSIC, TOTAL, XFADE, C } from "./theme";
import { perspectivePush, layerSlide, morphScale } from "./motion/transitions";
import { S1Chaos } from "./scenes/S1Chaos";
import { S2Unify } from "./scenes/S2Unify";
import { S3Publish } from "./scenes/S3Publish";
import { S4Insights } from "./scenes/S4Insights";
import { S5Team } from "./scenes/S5Team";
import { S6Hero } from "./scenes/S6Hero";

const timing = linearTiming({ durationInFrames: XFADE });

/**
 * SynclyAd — software-first product commercial. Six fast scenes (chaos →
 * unified inbox → publish → analytics → team/AI → hero) where the real
 * dashboard UI is the hero, with a Three.js world behind it. Premium CSS-3D
 * transitions, light-editorial palette.
 */
export const SynclyAd = () => {
  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <Audio
        src={MUSIC}
        volume={(f) =>
          interpolate(f, [0, 20, TOTAL - 44, TOTAL], [0, 0.5, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={ACT.S1_CHAOS}>
          <S1Chaos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={perspectivePush()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={ACT.S2_UNIFY}>
          <S2Unify />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={layerSlide()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={ACT.S3_PUBLISH}>
          <S3Publish />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={ACT.S4_INSIGHTS}>
          <S4Insights />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={ACT.S5_TEAM}>
          <S5Team />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={morphScale()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={ACT.S6_HERO}>
          <S6Hero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
