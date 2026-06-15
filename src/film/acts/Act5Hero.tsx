import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FilmStage } from "../three/FilmStage";
import { MacBook, useMacBookScene } from "../three/MacBook";
import { useScreenTexture } from "../three/useScreenTexture";
import { Logo } from "../../components/Logo";
import { Line } from "../components/Caption";
import { useEnter } from "../../anim";
import { ACT, F, L } from "../theme";

const DUR = ACT.A5_HERO;

function Hero() {
  const screen = useScreenTexture("overview");
  const scene = useMacBookScene();
  return (
    <FilmStage
      camPath={[
        { f: 0, pos: [2.7, 1.85, 7.3], look: [0, 1.12, 0], fov: 31 },
        { f: DUR, pos: [0.5, 1.45, 6.2], look: [0, 1.12, 0], fov: 29 },
      ]}
    >
      <MacBook scene={scene} screen={screen} lidOpen={1} screenOn={1} />
    </FilmStage>
  );
}

/**
 * Act 5 — the final hero shot pushes in, then the frame resolves to pure white
 * and the lockup arrives. Confidence, stated quietly: logo, one line, the URL.
 */
export function Act5Hero() {
  const frame = useCurrentFrame();
  const white = interpolate(frame, [92, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoIn = useEnter(120, 24);
  const urlIn = useEnter(150, 20);

  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      <Hero />

      {/* resolve to white */}
      <AbsoluteFill style={{ background: L.WHITE, opacity: white }} />

      {/* lockup */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: white,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            transform: `translateY(${(1 - logoIn) * 14}px)`,
          }}
        >
          <div style={{ opacity: logoIn }}>
            <Logo size={88} tone="dark" />
          </div>
          <Line delay={130} size={58} weight={500}>
            One workflow. Infinite possibilities.
          </Line>
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 22,
              letterSpacing: "0.04em",
              color: L.INK_2,
              opacity: urlIn,
            }}
          >
            trysyncly.com
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
