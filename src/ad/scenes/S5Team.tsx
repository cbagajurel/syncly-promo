import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { DepthGradient } from "../r3f/DepthGradient";
import { MessageFlow } from "../r3f/MessageFlow";
import { ConnectionNet } from "../r3f/ConnectionNet";
import { Panel3D } from "../motion/Panel3D";
import { LightScreen } from "../ui/LightScreen";
import { Eyebrow } from "../ui/Eyebrow";
import { KineticType } from "../motion/KineticType";
import { ScreenFrame } from "../ui/ScreenFrame";
import { Toast } from "../live/Toast";
import { SCRIM } from "../ui/Caption";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashInbox } from "../../screens/DashInbox";
import { C, F, PLATFORM } from "../theme";
import { CHAPTER, SPACE, RADIUS } from "../tokens";
import { ADEASE, bezier } from "../motion/easings";

const CH = CHAPTER.team;

const TEAM = [
  { initials: "AL", color: PLATFORM.facebook },
  { initials: "MC", color: PLATFORM.instagram },
  { initials: "JD", color: CH.accent },
];

function PresenceCard() {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [70, 96], [0, 1], {
    easing: bezier(ADEASE.EDITORIAL),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = Math.sin(frame / 30) * 6;
  return (
    <div style={{ position: "absolute", right: 150, top: 150, perspective: 1500, opacity: p }}>
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `translateY(${(1 - p) * 30 + float}px) rotateY(-12deg) rotateX(5deg)`,
        }}
      >
        <ScreenFrame width={372} bar={false} radius={RADIUS.lg}>
          <div style={{ padding: `${SPACE[5]}px`, fontFamily: F.display }}>
            <div
              style={{
                fontSize: 13,
                fontFamily: F.mono,
                color: C.INK_3,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: SPACE[4],
              }}
            >
              Assigned · AI handling
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {TEAM.map((t, i) => (
                <span
                  key={t.initials}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: RADIUS.pill,
                    background: t.color,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                    marginLeft: i === 0 ? 0 : -12,
                  }}
                >
                  {t.initials}
                </span>
              ))}
              <span
                style={{
                  marginLeft: SPACE[4],
                  padding: "6px 12px",
                  borderRadius: RADIUS.pill,
                  background: CH.soft,
                  color: CH.deep,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                🤖 AI active
              </span>
            </div>
          </div>
        </ScreenFrame>
      </div>
    </div>
  );
}

export function S5Team() {
  const frame = useCurrentFrame();
  const ry = kf(frame, [[8, 7], [46, 0]]);
  const tz = kf(frame, [[8, -260], [46, 0]]);
  const opacity = kf(frame, [[6, 0], [22, 1]]);

  const stmt1 = kf(frame, [[150, 1], [172, 0]]);
  const resolved = kf(frame, [[120, 0], [140, 1], [240, 1], [285, 0.4]]);

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <AbsoluteFill style={{ zIndex: 0 }}>
        <AdStage>
          <DepthGradient intensity={0.8} color={CH.glow} />
          <ConnectionNet
            center={[0, 4.4]}
            nodes={[[-6.6, 3.4], [6.6, 3.4], [0, 5.2]]}
            drawStart={40}
            drawDur={40}
            color={CH.accent}
          />
          <MessageFlow
            color={CH.accent}
            paths={[
              { from: [-5.5, -1], to: [5.5, 1], bow: 2.2 },
              { from: [5.5, 1], to: [-5.5, -1], bow: -2.2 },
            ]}
            perPath={2}
          />
        </AdStage>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 10, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "translateY(-44px)" }}>
          <Panel3D ry={ry} tz={tz} opacity={opacity} originY="42%">
            <LightScreen width={1640} height={960} chapter={CH}>
              <DashboardChrome view="inbox">
                <DashInbox />
              </DashboardChrome>
            </LightScreen>
          </Panel3D>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 16 }}>
        <PresenceCard />
        <div style={{ position: "absolute", right: 150, top: 360 }}>
          <Toast
            t={resolved}
            dot={CH.accent}
            title="Resolved by AI"
            channel="0s wait"
            text="Replied & closed — no human needed."
            accent={CH.accent}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 20, background: SCRIM() }} />

      <AbsoluteFill
        style={{
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingLeft: 130,
          paddingBottom: 84,
        }}
      >
        <Eyebrow text="Together, on autopilot" delay={40} color={CH.accent} />
        <div style={{ height: SPACE[4] }} />
        <div style={{ position: "relative" }}>
          <div style={{ opacity: stmt1 }}>
            <KineticType
              text="Work as one team."
              delay={50}
              size={92}
              weight={600}
              accentWord="team."
              accentColor={CH.deep}
              accentGradient={[CH.accent, CH.glow]}
            />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - stmt1 }}>
            <KineticType
              text="Replies on autopilot."
              delay={168}
              size={92}
              weight={600}
              accentWord="autopilot."
              accentColor={CH.deep}
              accentGradient={[CH.accent, CH.glow]}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
