import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { kf } from "../../anim";
import { FilmStage } from "../three/FilmStage";
import { MacBook, useMacBookScene } from "../three/MacBook";
import { useScreenTexture } from "../three/useScreenTexture";
import { Beat, Line } from "../components/Caption";
import { ACT, L } from "../theme";

const DUR = ACT.A2_PRODUCT;

function Hero() {
  const frame = useCurrentFrame();
  const screen = useScreenTexture("overview");
  const scene = useMacBookScene();
  // dramatic lid open, then the display ignites
  const lidOpen = kf(frame, [[16, 0], [92, 1]]);
  const screenOn = kf(frame, [[66, 0], [124, 1]]);
  return (
    <FilmStage
      camPath={[
        { f: 0, pos: [-3.6, 1.8, 8.0], look: [0, 1.05, 0], fov: 32 },
        { f: 150, pos: [0.1, 1.55, 7.3], look: [0, 1.12, 0], fov: 31 },
        { f: 245, pos: [1.7, 1.25, 5.7], look: [0.5, 1.2, 0], fov: 30 }, // macro corner
        { f: DUR, pos: [3.2, 1.9, 7.8], look: [0, 1.05, 0], fov: 31 },
      ]}
    >
      <MacBook scene={scene} screen={screen} lidOpen={lidOpen} screenOn={screenOn} />
    </FilmStage>
  );
}

/**
 * Act 2 — the machine opens and the display ignites with Syncly. A slow orbit
 * and a macro corner push. Two calm lines punctuate the reveal.
 */
export function Act2Product() {
  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      <Hero />

      <Sequence from={74} durationInFrames={120} layout="none">
        <Beat dur={120}>
          <AbsoluteFill
            style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}
          >
            <Line size={70} weight={500} color={L.INK}>
              Built for clarity.
            </Line>
          </AbsoluteFill>
        </Beat>
      </Sequence>

      <Sequence from={208} durationInFrames={DUR - 208} layout="none">
        <Beat dur={DUR - 208}>
          <AbsoluteFill
            style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}
          >
            <Line size={70} weight={500} color={L.INK}>
              Everything connected.
            </Line>
          </AbsoluteFill>
        </Beat>
      </Sequence>
    </AbsoluteFill>
  );
}
