import { AbsoluteFill, useCurrentFrame } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { DepthGradient } from "../r3f/DepthGradient";
import { MessageFlow } from "../r3f/MessageFlow";
import { Panel3D } from "../motion/Panel3D";
import { LightScreen } from "../ui/LightScreen";
import { Caption, SCRIM } from "../ui/Caption";
import { ChartLife } from "../live/ChartLife";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashAnalytics } from "../../screens/DashAnalytics";
import { C } from "../theme";
import { CHAPTER } from "../tokens";

const CH = CHAPTER.analytics;

export function S4Insights() {
  const frame = useCurrentFrame();
  const rx = kf(frame, [[8, 6], [50, 0]]);
  const tz = kf(frame, [[8, -240], [50, 0]]);
  const opacity = kf(frame, [[6, 0], [22, 1]]);
  const lifeOp = kf(frame, [[60, 0], [80, 1]]);

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <AbsoluteFill style={{ zIndex: 0 }}>
        <AdStage>
          <DepthGradient intensity={1} color={CH.glow} />
          <MessageFlow
            color={CH.accent}
            paths={[
              { from: [-8, -4.5], to: [-2, 4.5], bow: 1.2 },
              { from: [8, -4.5], to: [2, 4.5], bow: -1.2 },
            ]}
            perPath={2}
            dotSize={0.22}
          />
        </AdStage>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 10, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "translateY(-36px)" }}>
          <Panel3D rx={rx} tz={tz} opacity={opacity} originY="46%">
            <LightScreen width={1760} height={970} chapter={CH}>
              <DashboardChrome view="analytics">
                <DashAnalytics />
              </DashboardChrome>
            </LightScreen>
          </Panel3D>
        </div>
      </AbsoluteFill>

      {/* the chart breathes — a tooltip sweeps the message-volume curve */}
      <AbsoluteFill style={{ zIndex: 16, opacity: lifeOp }}>
        <ChartLife rect={{ x: 430, y: 470, w: 720, h: 190 }} accent={CH.accent} />
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 20, background: SCRIM() }} />

      <Caption
        eyebrow="Know your numbers"
        eyebrowDelay={54}
        text="See what matters."
        textDelay={64}
        size={92}
        accent={CH.accent}
        accentDeep={CH.glow}
        accentWord="matters."
      />
    </AbsoluteFill>
  );
}
