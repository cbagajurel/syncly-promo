import type { ReactNode } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DISPLAY, FONT, MONO, STAGE, TOUR } from "./constants";
import { Enter, useEnter } from "./anim";
import { Stage } from "./three/Stage";
import { ParticleField } from "./three/ParticleField";
import { FloatingShapes } from "./three/FloatingShapes";
import { PlatformOrbs } from "./three/PlatformOrbs";
import { LogoMark3D } from "./three/LogoMark3D";
import { Panel3D } from "./screens/Panel3D";
import { DashboardChrome } from "./screens/DashboardChrome";
import { DashOverview } from "./screens/DashOverview";
import { DashInbox } from "./screens/DashInbox";
import { DashCompose } from "./screens/DashCompose";
import { DashSchedule } from "./screens/DashSchedule";
import { DashPosts } from "./screens/DashPosts";
import { DashAnalytics } from "./screens/DashAnalytics";
import { DashSettings } from "./screens/DashSettings";

const WHITE = "#F4F6F5";
const MUTED = "rgba(244,246,245,0.60)";

/* Radial vignette for cinematic depth over the stage. */
const Vignette = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(120% 90% at 50% 42%, transparent 52%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

const StageScene = ({
  three,
  children,
  camPath,
}: {
  three: ReactNode;
  children: ReactNode;
  camPath?: Parameters<typeof Stage>[0]["camPath"];
}) => (
  <AbsoluteFill style={{ background: STAGE.BG, fontFamily: FONT }}>
    <Stage camPath={camPath}>{three}</Stage>
    <Vignette />
    <AbsoluteFill>{children}</AbsoluteFill>
  </AbsoluteFill>
);

/* Word-by-word kinetic headline. */
const Kinetic = ({
  text,
  delay = 0,
  size,
}: {
  text: string;
  delay?: number;
  size: number;
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: `0 ${size * 0.26}px`,
      maxWidth: 1400,
      fontFamily: DISPLAY,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.02em",
      color: WHITE,
    }}
  >
    {text.split(" ").map((w, i) => (
      <Enter key={i} delay={delay + i * 4} dur={16} y={size * 0.5}>
        <span>{w}</span>
      </Enter>
    ))}
  </div>
);

const Eyebrow = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <Enter delay={delay} dur={14}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 18,
        letterSpacing: "0.34em",
        textTransform: "uppercase",
        color: STAGE.EMERALD,
      }}
    >
      {children}
    </span>
  </Enter>
);

/* ── 1 · Hook ─────────────────────────────────────────────────────── */
export const SceneHook3D = () => {
  const p = useEnter(0, 22);
  return (
    <StageScene
      camPath={[
        { f: 0, pos: [0, 0.2, 9] },
        { f: 135, pos: [0, 0.2, 6.2] },
      ]}
      three={
        <>
          <ParticleField />
          <FloatingShapes />
          <group position={[0, 0.9, 0]}>
            <LogoMark3D progress={p} />
          </group>
        </>
      }
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 130,
          gap: 26,
          textAlign: "center",
        }}
      >
        <Eyebrow delay={18}>Syncly</Eyebrow>
        <Kinetic text="Manage every message in one place." delay={24} size={96} />
      </div>
    </StageScene>
  );
};

/* ── 2 · Unify ────────────────────────────────────────────────────── */
export const SceneUnify3D = () => {
  const conv = useEnter(16, 78);
  return (
    <StageScene
      camPath={[
        { f: 0, pos: [0, 0, 8.4] },
        { f: 120, pos: [0.4, 0.3, 6.8] },
      ]}
      three={
        <>
          <ParticleField count={320} />
          <PlatformOrbs progress={conv} />
        </>
      }
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 120,
          gap: 18,
          textAlign: "center",
        }}
      >
        <Eyebrow delay={40}>Facebook · Instagram · WhatsApp · Messenger</Eyebrow>
        <Kinetic text="Every channel. One inbox." delay={48} size={88} />
      </div>
    </StageScene>
  );
};

/* ── 3 · Product tour ─────────────────────────────────────────────── */
const TourCaption = ({ eyebrow, line }: { eyebrow: string; line: string }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 56,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      textAlign: "center",
    }}
  >
    <Enter delay={4} dur={14}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 15,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: STAGE.EMERALD,
        }}
      >
        {eyebrow}
      </span>
    </Enter>
    <Enter delay={8} dur={16} y={20}>
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 52,
          letterSpacing: "-0.02em",
          color: WHITE,
        }}
      >
        {line}
      </span>
    </Enter>
  </div>
);

const TourBeat = ({
  view,
  children,
  tiltY = -7,
  eyebrow,
  line,
}: {
  view: Parameters<typeof DashboardChrome>[0]["view"];
  children: ReactNode;
  tiltY?: number;
  eyebrow: string;
  line: string;
}) => (
  <AbsoluteFill>
    <Panel3D tiltY={tiltY} baseScale={0.7} offsetY={-46}>
      <DashboardChrome view={view}>{children}</DashboardChrome>
    </Panel3D>
    <TourCaption eyebrow={eyebrow} line={line} />
  </AbsoluteFill>
);

export const SceneProductTour = () => {
  let at = 0;
  const seq = (len: number, node: ReactNode) => {
    const el = (
      <Sequence key={at} from={at} durationInFrames={len}>
        {node}
      </Sequence>
    );
    at += len;
    return el;
  };

  return (
    <AbsoluteFill style={{ background: STAGE.BG, fontFamily: FONT }}>
      <Stage
        camPath={[
          { f: 0, pos: [-0.7, 0.1, 7.2] },
          { f: TOUR.overview + TOUR.inbox + TOUR.compose, pos: [0.4, -0.2, 6.6] },
          { f: 675, pos: [0.8, 0.2, 7.0] },
        ]}
      >
        <ParticleField count={300} />
        <FloatingShapes />
      </Stage>
      <Vignette />
      <AbsoluteFill>
        {seq(
          TOUR.overview,
          <TourBeat view="dashboard" tiltY={-6} eyebrow="Dashboard" line="Your whole world, one glance">
            <DashOverview />
          </TourBeat>,
        )}
        {seq(
          TOUR.inbox,
          <TourBeat view="inbox" tiltY={-5} eyebrow="Unified inbox" line="Every DM — answered by AI">
            <DashInbox />
          </TourBeat>,
        )}
        {seq(
          TOUR.compose,
          <TourBeat view="compose" tiltY={7} eyebrow="Compose" line="Write once. Publish everywhere.">
            <DashCompose />
          </TourBeat>,
        )}
        {seq(
          TOUR.schedule,
          <TourBeat view="schedule" tiltY={-7} eyebrow="Schedule" line="Plan the whole month">
            <DashSchedule />
          </TourBeat>,
        )}
        {seq(
          TOUR.analytics,
          <TourBeat view="analytics" tiltY={6} eyebrow="Analytics" line="Numbers that actually help">
            <DashAnalytics />
          </TourBeat>,
        )}
        {seq(
          TOUR.posts,
          <TourBeat view="posts" tiltY={-7} eyebrow="Posts" line="Every post, organized">
            <DashPosts />
          </TourBeat>,
        )}
        {seq(
          TOUR.settings,
          <TourBeat view="settings" tiltY={7} eyebrow="AI Knowledge Base" line="Teach the AI your voice">
            <DashSettings />
          </TourBeat>,
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ── 4 · Outcome ──────────────────────────────────────────────────── */
const STATS = [
  { value: "2 min", label: "average first response" },
  { value: "4-in-1", label: "channels, one inbox" },
  { value: "10×", label: "faster replies with AI" },
];

export const SceneOutcome3D = () => (
  <StageScene
    camPath={[
      { f: 0, pos: [0, 0, 7.6] },
      { f: 105, pos: [0, 0, 6.8] },
    ]}
    three={
      <>
        <ParticleField count={300} />
        <FloatingShapes />
      </>
    }
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
      }}
    >
      <Enter delay={2} dur={16}>
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 76,
            letterSpacing: "-0.02em",
            color: WHITE,
          }}
        >
          Real impact. From day one.
        </span>
      </Enter>
      <div style={{ display: "flex", gap: 28 }}>
        {STATS.map((s, i) => (
          <Enter key={s.label} delay={12 + i * 6} dur={18} y={36}>
            <div
              style={{
                width: 360,
                padding: "42px 30px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 84,
                  color: STAGE.EMERALD,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span style={{ fontFamily: FONT, fontSize: 20, color: MUTED }}>
                {s.label}
              </span>
            </div>
          </Enter>
        ))}
      </div>
    </div>
  </StageScene>
);

/* ── 5 · CTA ──────────────────────────────────────────────────────── */
export const SceneCTA3D = () => {
  const p = useEnter(0, 24);
  const underline = useEnter(26, 26);
  return (
    <StageScene
      camPath={[
        { f: 0, pos: [0, 0.6, 8] },
        { f: 135, pos: [0, 0.4, 6.4] },
      ]}
      three={
        <>
          <ParticleField />
          <group position={[0, 1.4, 0]}>
            <LogoMark3D progress={p} />
          </group>
        </>
      }
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 150,
          gap: 22,
          textAlign: "center",
        }}
      >
        <Enter delay={10} dur={18} y={30}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: 104,
              letterSpacing: "-0.02em",
              color: WHITE,
              lineHeight: 1,
            }}
          >
            Start free today.
          </span>
        </Enter>
        <Enter delay={22} dur={14}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={{ fontFamily: FONT, fontSize: 28, color: MUTED }}>
              trysyncly.com
            </span>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -6,
                height: 2,
                background: STAGE.EMERALD,
                width: `${underline * 100}%`,
              }}
            />
          </div>
        </Enter>
        <Enter delay={32} dur={16} y={20}>
          <span
            style={{
              marginTop: 14,
              display: "inline-flex",
              alignItems: "center",
              height: 60,
              padding: "0 34px",
              borderRadius: 14,
              background: STAGE.EMERALD,
              color: "#05130d",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Open the dashboard
          </span>
        </Enter>
      </div>
    </StageScene>
  );
};
