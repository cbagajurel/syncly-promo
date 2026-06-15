import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FilmStage } from "../three/FilmStage";
import { MacBook, useMacBookScene } from "../three/MacBook";
import { useScreenTexture } from "../three/useScreenTexture";
import { Beat, Caption } from "../components/Caption";
import { ACT, L } from "../theme";

const DUR = ACT.A1_REVEAL;

function Hero() {
  const screen = useScreenTexture("overview");
  const scene = useMacBookScene();
  return (
    <FilmStage
      camPath={[
        { f: 0, pos: [-3.6, 1.05, 7.6], look: [0, -0.05, 0], fov: 31 },
        { f: DUR, pos: [3.2, 1.35, 7.4], look: [0, -0.1, 0], fov: 30 },
      ]}
    >
      {/* closed, dark screen — a quiet slab of aluminium */}
      <MacBook scene={scene} screen={screen} lidOpen={0} screenOn={0} />
    </FilmStage>
  );
}

/**
 * Act 1 — silence. A pure-white void; a closed MacBook drifts and turns in soft
 * studio light. One calm line resolves. Nothing is sold yet.
 */
export function Act1Reveal() {
  const frame = useCurrentFrame();
  // the whole frame breathes in a hair, very slow
  const scale = interpolate(frame, [0, DUR], [1.0, 1.02]);
  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Hero />
      </AbsoluteFill>

      <Sequence from={86} durationInFrames={DUR - 86} layout="none">
        <Beat dur={DUR - 86}>
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 132,
            }}
          >
            <Caption lead="One place." emphasis="For every conversation." size={66} />
          </AbsoluteFill>
        </Beat>
      </Sequence>
    </AbsoluteFill>
  );
}
