import { AbsoluteFill, useCurrentFrame } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { DepthGradient } from "../r3f/DepthGradient";
import { ConnectionNet } from "../r3f/ConnectionNet";
import { MessageFlow } from "../r3f/MessageFlow";
import { Panel3D } from "../motion/Panel3D";
import { LightScreen } from "../ui/LightScreen";
import { Caption, SCRIM } from "../ui/Caption";
import { PostFlight } from "../live/PostFlight";
import { Toast } from "../live/Toast";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashCompose } from "../../screens/DashCompose";
import { DashSchedule } from "../../screens/DashSchedule";
import { C, PLATFORM } from "../theme";
import { CHAPTER } from "../tokens";

const CH = CHAPTER.publish;

const PLATFORM_NODES: [number, number][] = [
  [-7, 3.2],
  [7, 3.4],
  [-7.4, -2.6],
  [7.2, -2.8],
  [0, 4.6],
];

export function S3Publish() {
  const frame = useCurrentFrame();

  const enterRy = kf(frame, [[8, -8], [44, 0]]);
  const enterTz = kf(frame, [[8, -260], [44, 0]]);

  const composeOp = kf(frame, [[6, 0], [22, 1], [128, 1], [156, 0]]);
  const composeTz = enterTz + kf(frame, [[128, 0], [156, -220]]);

  const schedOp = kf(frame, [[136, 0], [166, 1]]);
  const schedTz = kf(frame, [[136, -240], [166, 0]]);

  const flight = kf(frame, [[120, 0], [168, 1]]);
  const toast = kf(frame, [[176, 0], [196, 1], [236, 1], [249, 0.4]]);

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <AbsoluteFill style={{ zIndex: 0 }}>
        <AdStage>
          <DepthGradient intensity={0.7} color={CH.glow} />
          <ConnectionNet center={[0, 0]} nodes={PLATFORM_NODES} drawStart={50} drawDur={46} color={CH.accent} />
          <MessageFlow
            color={CH.accent}
            paths={PLATFORM_NODES.map((n) => ({ from: [0, 0], to: n, bow: 0.8 }))}
            perPath={2}
          />
        </AdStage>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 10, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "translateY(-40px)" }}>
          <Panel3D tz={schedTz} opacity={schedOp} originY="42%">
            <LightScreen width={1700} height={950} chapter={CH}>
              <DashboardChrome view="schedule">
                <DashSchedule />
              </DashboardChrome>
            </LightScreen>
          </Panel3D>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 11, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "translateY(-40px)" }}>
          <Panel3D ry={enterRy} tz={composeTz} opacity={composeOp} originY="42%">
            <LightScreen width={1640} height={950} chapter={CH}>
              <DashboardChrome view="compose">
                <DashCompose />
              </DashboardChrome>
            </LightScreen>
          </Panel3D>
        </div>
      </AbsoluteFill>

      {/* a post lifts from the composer and lands on the calendar */}
      <AbsoluteFill style={{ zIndex: 16 }}>
        {flight > 0 && flight < 1 && (
          <PostFlight t={flight} from={{ x: 1360, y: 430 }} to={{ x: 770, y: 520 }} accent={CH.accent} />
        )}
        <div style={{ position: "absolute", right: 150, top: 150 }}>
          <Toast
            t={toast}
            dot={CH.accent}
            title="Published"
            channel="5 platforms"
            text="Spring drop is live on every channel."
            accent={CH.accent}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 20, background: SCRIM() }} />

      <Caption
        eyebrow="Compose once"
        eyebrowDelay={46}
        text="Publish everywhere."
        textDelay={56}
        size={92}
        accent={CH.accent}
        accentDeep={CH.glow}
        accentWord="everywhere."
      />
    </AbsoluteFill>
  );
}
