import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { C, FADE, SCENE } from "./constants";
import { SceneCTA } from "./scenes/SceneCTA";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneHook } from "./scenes/SceneHook";
import { SceneOutcome } from "./scenes/SceneOutcome";
import { ScenePain } from "./scenes/ScenePain";
import { SceneReveal } from "./scenes/SceneReveal";

// Per-scene fade wrapper
const FadeWrap = ({
  dur,
  children,
}: {
  dur: number;
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [dur - FADE, dur], [1, 0], { extrapolateLeft: "clamp" })
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const SynclyPromo = () => {
  const scenes = [
    { ...SCENE.HOOK,     El: SceneHook     },
    { ...SCENE.PAIN,     El: ScenePain     },
    { ...SCENE.REVEAL,   El: SceneReveal   },
    { ...SCENE.FEATURES, El: SceneFeatures },
    { ...SCENE.OUTCOME,  El: SceneOutcome  },
    { ...SCENE.CTA,      El: SceneCTA      },
  ];

  return (
    <AbsoluteFill style={{ background: C.BG0 }}>
      {scenes.map(({ from, dur, El }) => (
        <Sequence key={from} from={from} durationInFrames={dur}>
          <FadeWrap dur={dur}>
            <El />
          </FadeWrap>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
