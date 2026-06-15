import { AbsoluteFill, useCurrentFrame } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { DepthGradient } from "../r3f/DepthGradient";
import { MessageFlow } from "../r3f/MessageFlow";
import { Panel3D } from "../motion/Panel3D";
import { LightScreen } from "../ui/LightScreen";
import { Caption, SCRIM } from "../ui/Caption";
import { HubDiagram } from "../components/HubDiagram";
import { Cursor } from "../live/Cursor";
import { IncomingRow, IncomingBubble } from "../live/Incoming";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashInbox } from "../../screens/DashInbox";
import { C, PLATFORM } from "../theme";
import { CHAPTER, everyN } from "../tokens";

const CH = CHAPTER.messages;

export function S2Unify() {
  const frame = useCurrentFrame();

  const hubOp = kf(frame, [[0, 1], [60, 1], [90, 0]]);
  const hubScale = kf(frame, [[60, 1], [90, 1.25]]);

  const ry = kf(frame, [[64, 8], [104, 0]]);
  const tz = kf(frame, [[64, -300], [104, 0]]);
  const panelOp = kf(frame, [[62, 0], [92, 1]]);

  const row = everyN(frame, 82, 26, 116);
  const bubble = everyN(frame, 96, 24, 140);

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <AbsoluteFill style={{ zIndex: 0 }}>
        <AdStage>
          <DepthGradient intensity={0.8} color={CH.glow} />
          <MessageFlow
            color={CH.accent}
            paths={[
              { from: [-6, 3], to: [0, 0], bow: 1.6 },
              { from: [6, 2.6], to: [0, 0], bow: -1.4 },
              { from: [-5.4, -3], to: [0, 0], bow: 1.2 },
              { from: [5.6, -2.6], to: [0, 0], bow: -1.1 },
            ]}
          />
        </AdStage>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 5 }}>
        <HubDiagram accent={CH.accent} opacity={hubOp} scale={hubScale} />
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 10, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "translateY(-44px)" }}>
          <Panel3D ry={ry} tz={tz} opacity={panelOp} originY="42%">
            <LightScreen width={1640} height={960} chapter={CH}>
              <DashboardChrome view="inbox">
                <DashInbox />
              </DashboardChrome>
            </LightScreen>
          </Panel3D>
        </div>
      </AbsoluteFill>

      {/* live overlays on the settled inbox */}
      <AbsoluteFill style={{ zIndex: 16 }}>
        {frame > 112 && (
          <div style={{ position: "absolute", left: 470, top: 150 }}>
            <IncomingRow
              t={row.progress}
              initials="JD"
              name="Jordan Diaz"
              preview="Hey! Is the sale still on?"
              dot={PLATFORM.instagram}
              accent={CH.accent}
            />
          </div>
        )}
        {frame > 136 && (
          <div style={{ position: "absolute", left: 1080, top: 600, width: 360 }}>
            <IncomingBubble t={bubble.progress} text="Perfect, I'll take two 🙌" accent={CH.accent} />
          </div>
        )}
        {frame > 104 && (
          <Cursor
            accent={CH.accent}
            path={[
              { f: 104, x: 900, y: 700 },
              { f: 128, x: 560, y: 300 },
              { f: 170, x: 600, y: 360 },
              { f: 219, x: 740, y: 420 },
            ]}
            clicks={[132, 176]}
          />
        )}
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 20, background: SCRIM() }} />

      <Caption
        eyebrow="One place"
        eyebrowDelay={96}
        text="One inbox. Every conversation."
        textDelay={106}
        size={88}
        accent={CH.accent}
        accentDeep={CH.glow}
        accentWord="inbox."
      />
    </AbsoluteFill>
  );
}
