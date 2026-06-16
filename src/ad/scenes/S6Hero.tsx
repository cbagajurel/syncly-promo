import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { MacStage } from "../r3f/MacStage";
import { DepthGradient } from "../r3f/DepthGradient";
import { Panel3D } from "../motion/Panel3D";
import { LightScreen } from "../ui/LightScreen";
import { MaskReveal } from "../motion/MaskReveal";
import { KineticType } from "../motion/KineticType";
import { HubDiagram } from "../components/HubDiagram";
import type * as THREE from "three";
import { MacBook, useMacBookScene } from "../../film/three/MacBook";
import { useAdOverviewTexture } from "../r3f/useAdOverviewTexture";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashOverview } from "../../screens/DashOverview";
import { C, F } from "../theme";
import { CHAPTER } from "../tokens";
import { ADEASE, bezier } from "../motion/easings";

const CH = CHAPTER.hero;

function MacCameo({
  scene,
  screen,
}: {
  scene: THREE.Group | null;
  screen: THREE.Texture;
}) {
  const frame = useCurrentFrame();
  const f = frame - 56;
  const inP = interpolate(f, [0, 30], [0, 1], {
    easing: bezier(ADEASE.EDITORIAL),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // slow dolly: glides in from 3/4 view and pushes toward the screen
  const x = interpolate(inP, [0, 1], [-2.6, 0]);
  const rotY = interpolate(inP, [0, 1], [0.5, 0.04]);
  const z = interpolate(f, [0, 95], [-0.4, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = Math.sin(f / 48) * 0.02;
  return (
    <group position={[x, -0.55, z]} rotation={[0.02, rotY + drift, 0]}>
      <MacBook scene={scene} screen={screen} lidOpen={1} screenOn={1} />
    </group>
  );
}

export function S6Hero() {
  const frame = useCurrentFrame();
  const macScene = useMacBookScene();
  const macScreen = useAdOverviewTexture();

  const overviewRx = kf(frame, [
    [6, 5],
    [46, 0],
  ]);
  const overviewTz = kf(frame, [
    [6, -240],
    [46, 0],
  ]);
  const overviewOp = kf(frame, [
    [2, 0],
    [20, 1],
    [54, 1],
    [62, 0],
  ]);

  const macOp = kf(frame, [
    [54, 0],
    [64, 1],
    [92, 1],
    [102, 0],
  ]);
  const lockupOp = kf(frame, [
    [96, 0],
    [108, 1],
  ]);

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      {/* Phase A — full-frame product */}
      <AbsoluteFill
        style={{
          zIndex: 10,
          alignItems: "center",
          justifyContent: "center",
          opacity: overviewOp,
        }}
      >
        <Panel3D rx={overviewRx} tz={overviewTz} originY="46%">
          <LightScreen width={1820} height={1010} chapter={CH}>
            <DashboardChrome view="dashboard">
              <DashOverview />
            </DashboardChrome>
          </LightScreen>
        </Panel3D>
      </AbsoluteFill>

      {/* Phase B — MacBook cameo (IBL studio, screen as focus) */}
      <AbsoluteFill style={{ zIndex: 15, opacity: macOp }}>
        <MacStage>
          <MacCameo scene={macScene} screen={macScreen} />
        </MacStage>
      </AbsoluteFill>

      {/* Phase C — everything syncs into one hub */}
      <AbsoluteFill style={{ zIndex: 20, opacity: lockupOp }}>
        <AbsoluteFill style={{ background: C.BG }} />
        <AbsoluteFill style={{ zIndex: 1 }}>
          <AdStage>
            <DepthGradient intensity={1} color={CH.glow} />
          </AdStage>
        </AbsoluteFill>

        <AbsoluteFill style={{ zIndex: 2 }}>
          <HubDiagram
            hero
            delay={100}
            accent={CH.accent}
            cx={960}
            cy={420}
            radius={250}
            labels={["Instagram", "Facebook", "WhatsApp", "TikTok", "LinkedIn"]}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 150,
            gap: 24,
          }}
        >
          <MaskReveal delay={132} dur={22} dir="left">
            <KineticType
              text="Move faster."
              delay={134}
              size={64}
              weight={500}
              align="center"
              color={C.INK_2}
              accentWord="faster."
              accentColor={CH.accent}
              accentGradient={[C.PRIMARY, C.PRIMARY_2]}
            />
          </MaskReveal>

          <div
            style={{
              fontFamily: F.mono,
              fontSize: 22,
              letterSpacing: "0.18em",
              color: CH.deep,
              opacity: interpolate(frame, [148, 160], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            trysyncly.com
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
