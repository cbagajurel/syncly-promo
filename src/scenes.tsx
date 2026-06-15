import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, DISPLAY, FONT, MONO, FEAT } from "./constants";
import { Enter, useEnter } from "./anim";
import { SceneBackdrop } from "./components/SceneBackdrop";
import { Statement, Eyebrow } from "./components/Statement";
import { Logo } from "./components/Logo";
import { NotificationCard } from "./components/NotificationCard";
import { MacBook } from "./devices/MacBook";
import { BrowserWindow } from "./devices/BrowserWindow";
import { Stage } from "./three/Stage";
import { MacBook3D } from "./three/MacBook3D";
import { DashboardChrome } from "./screens/DashboardChrome";
import { DashOverview } from "./screens/DashOverview";
import { DashInbox } from "./screens/DashInbox";
import { DashCompose } from "./screens/DashCompose";
import { DashSchedule } from "./screens/DashSchedule";
import { DashAnalytics } from "./screens/DashAnalytics";
import { DashSettings } from "./screens/DashSettings";

/* A slow, cinematic push-in scale for a scene (camera-feel, no spin). */
function useSlowPush(from = 1.0, to = 1.035, frames = 120): number {
  const f = useCurrentFrame();
  return interpolate(f, [0, frames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/* Settle-once device entrance — rise + tiny scale, then hold. No glare, no loop. */
function DeviceReveal({
  children,
  delay = 0,
  y = 64,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const p = useEnter(delay, 28);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px) scale(${0.965 + p * 0.035})`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/* Wraps a 1920×1080 dashboard view so a device frame can hold it natively. */
const Screen = ({
  view,
  children,
}: {
  view: Parameters<typeof DashboardChrome>[0]["view"];
  children: ReactNode;
}) => (
  <div style={{ width: 1920, height: 1080 }}>
    <DashboardChrome view={view}>{children}</DashboardChrome>
  </div>
);

/* ── 1 · Hook ─────────────────────────────────────────────────────────── */
export const SceneHook = () => {
  const push = useSlowPush(1.0, 1.04, 120);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={50} spotY={40} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          transform: `scale(${push})`,
        }}
      >
        <Enter delay={6} dur={26} y={18} scale={0.92}>
          <Logo size={92} tone="light" />
        </Enter>
        <div style={{ maxWidth: 1180, textAlign: "center" }}>
          <Statement delay={28} size={66} weight={500} color={C.MUTED}>
            Managing social media
          </Statement>
          <Statement delay={36} size={66} weight={600} color={C.WHITE}>
            shouldn’t feel chaotic.
          </Statement>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ── 2 · Problem ──────────────────────────────────────────────────────── */
type Notif = {
  icon: string;
  app: string;
  sender: string;
  message: string;
  time: string;
  pos: { left?: number; right?: number; top?: number; bottom?: number };
  rot: number;
  delay: number;
};

const NOTIFS: Notif[] = [
  { icon: "instagram.png", app: "Instagram", sender: "maya.rivera", message: "Hey! Is the linen tote still in stock?", time: "now", pos: { left: 120, top: 150 }, rot: -5, delay: 4 },
  { icon: "facebook.png", app: "Messenger", sender: "Daniel Park", message: "When's the next launch? 👀", time: "1m", pos: { right: 150, top: 110 }, rot: 4, delay: 9 },
  { icon: "whatsapp.png", app: "WhatsApp", sender: "Supplier", message: "Invoice #4821 is ready for review.", time: "3m", pos: { left: 220, top: 360 }, rot: 3, delay: 14 },
  { icon: "tik-tok.png", app: "TikTok", sender: "comments", message: "+ 214 new comments on your video", time: "5m", pos: { right: 120, top: 330 }, rot: -4, delay: 19 },
  { icon: "linkedin.png", app: "LinkedIn", sender: "Atlas Studio", message: "Your post is trending in Design.", time: "8m", pos: { left: 160, bottom: 250 }, rot: -3, delay: 24 },
  { icon: "instagram.png", app: "Instagram", sender: "priya.studio", message: "We'd love to feature you — who handles press?", time: "12m", pos: { right: 200, bottom: 230 }, rot: 5, delay: 29 },
];

export const SceneProblem = () => {
  const frame = useCurrentFrame();
  const count = Math.round(
    interpolate(frame, [10, 90], [3, 47], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="paper" spotX={50} spotY={30} />

      {/* live unread counter */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Enter delay={6} dur={16}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 15,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: C.PAPER_FG2,
            }}
          >
            {count} unread · 5 apps · 0 in sync
          </span>
        </Enter>
      </div>

      {NOTIFS.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: n.pos.left,
            right: n.pos.right,
            top: n.pos.top,
            bottom: n.pos.bottom,
          }}
        >
          <Enter delay={n.delay} dur={18} y={26} scale={0.94}>
            <div style={{ transform: `rotate(${n.rot}deg)` }}>
              <NotificationCard {...n} />
            </div>
          </Enter>
        </div>
      ))}

      {/* statement */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 96,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Statement delay={40} size={62} weight={600} color={C.PAPER_FG}>
          Every app. Every tab. Nothing in sync.
        </Statement>
      </div>
    </AbsoluteFill>
  );
};

/* ── 3 · Solution ─────────────────────────────────────────────────────── */
export const SceneSolution = () => {
  const push = useSlowPush(1.0, 1.05, 135);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={50} spotY={44} />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Eyebrow delay={6}>Introducing Syncly</Eyebrow>
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${push})`,
        }}
      >
        <DeviceReveal delay={12}>
          <MacBook screenWidth={1320}>
            <Screen view="dashboard">
              <DashOverview />
            </Screen>
          </MacBook>
        </DeviceReveal>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 70,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Statement delay={30} size={44} weight={500} color={C.WHITE}>
          One command center for every channel.
        </Statement>
      </div>
    </AbsoluteFill>
  );
};

/* ── 4 · Features ─────────────────────────────────────────────────────── */
const FeatureBeat = ({
  eyebrow,
  title,
  body,
  side,
  device,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  side: "left" | "right";
  device: ReactNode;
}) => {
  const push = useSlowPush(1.0, 1.03, 100);
  const caption = (
    <div
      style={{
        flex: "0 0 30%",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        padding: side === "left" ? "0 0 0 110px" : "0 110px 0 0",
        alignItems: "flex-start",
      }}
    >
      <Eyebrow delay={8}>{eyebrow}</Eyebrow>
      <Statement delay={12} size={58} weight={600} align="left">
        {title}
      </Statement>
      <Enter delay={22} dur={18} y={16}>
        <p
          style={{
            margin: 0,
            maxWidth: 420,
            fontSize: 23,
            lineHeight: 1.5,
            color: C.MUTED,
            fontFamily: FONT,
          }}
        >
          {body}
        </p>
      </Enter>
    </div>
  );
  const deviceCol = (
    <div
      style={{
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${push})`,
      }}
    >
      <DeviceReveal delay={6} y={48}>
        {device}
      </DeviceReveal>
    </div>
  );
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={side === "left" ? 35 : 65} spotY={45} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {side === "left" ? (
          <>
            {caption}
            {deviceCol}
          </>
        ) : (
          <>
            {deviceCol}
            {caption}
          </>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SceneFeatures = () => {
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
    <AbsoluteFill>
      {seq(
        FEAT.inbox,
        <FeatureBeat
          side="left"
          eyebrow="Unified Inbox"
          title={<>Every conversation,<br />one inbox.</>}
          body="Instagram, Messenger and WhatsApp land in a single thread — and AI drafts the reply."
          device={
            <MacBook screenWidth={1180}>
              <Screen view="inbox"><DashInbox /></Screen>
            </MacBook>
          }
        />,
      )}
      {seq(
        FEAT.compose,
        <FeatureBeat
          side="right"
          eyebrow="Compose"
          title={<>Write once.<br />Publish everywhere.</>}
          body="Draft, preview and schedule to every connected account from one composer."
          device={
            <BrowserWindow width={1180} url="app.trysyncly.com/compose">
              <Screen view="compose"><DashCompose /></Screen>
            </BrowserWindow>
          }
        />,
      )}
      {seq(
        FEAT.schedule,
        <FeatureBeat
          side="left"
          eyebrow="Schedule"
          title={<>Plan the<br />whole month.</>}
          body="Lay out your calendar, and Syncly publishes every post on time, automatically."
          device={
            <MacBook screenWidth={1180}>
              <Screen view="schedule"><DashSchedule /></Screen>
            </MacBook>
          }
        />,
      )}
      {seq(
        FEAT.analytics,
        <FeatureBeat
          side="right"
          eyebrow="Analytics"
          title={<>Know what's<br />working.</>}
          body="Reach, engagement and growth across every channel — at a single glance."
          device={
            <BrowserWindow width={1180} url="app.trysyncly.com/analytics">
              <Screen view="analytics"><DashAnalytics /></Screen>
            </BrowserWindow>
          }
        />,
      )}
      {seq(
        FEAT.knowledge,
        <FeatureBeat
          side="left"
          eyebrow="AI Knowledge Base"
          title={<>Answers in<br />your voice.</>}
          body="Teach the AI once. It replies for you, on brand, around the clock."
          device={
            <MacBook screenWidth={1180}>
              <Screen view="settings"><DashSettings /></Screen>
            </MacBook>
          }
        />,
      )}
    </AbsoluteFill>
  );
};

/* ── 5 · 3D Showcase ──────────────────────────────────────────────────── */
export const SceneShowcase = () => {
  return (
    <AbsoluteFill style={{ background: C.INK, fontFamily: FONT }}>
      <Stage
        fov={36}
        camPath={[
          { f: 0, pos: [-2.6, 1.7, 6.6], look: [0, 0.5, 0] },
          { f: 70, pos: [0.2, 1.15, 5.5], look: [0, 0.5, 0] },
          { f: 135, pos: [2.4, 1.7, 6.6], look: [0, 0.5, 0] },
        ]}
      >
        <MacBook3D />
      </Stage>
      {/* subtle grain + vignette over the 3D for a filmic finish */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(120% 100% at 50% 45%, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div style={{ position: "absolute", top: 84, left: 110 }}>
        <Eyebrow delay={10}>The command center</Eyebrow>
      </div>
      <div style={{ position: "absolute", bottom: 84, left: 110 }}>
        <Statement delay={16} size={52} weight={600} align="left">
          Built for teams.<br />Designed to disappear.
        </Statement>
      </div>
    </AbsoluteFill>
  );
};

/* ── 6 · Ecosystem ────────────────────────────────────────────────────── */
const ECO = [
  { icon: "instagram.png", label: "Instagram", angle: -90 },
  { icon: "facebook.png", label: "Messenger", angle: -26 },
  { icon: "whatsapp.png", label: "WhatsApp", angle: 38 },
  { icon: "tik-tok.png", label: "TikTok", angle: 142 },
  { icon: "linkedin.png", label: "LinkedIn", angle: 218 },
];

export const SceneEcosystem = () => {
  const cx = 960;
  const cy = 560;
  const R = 330;
  const draw = useEnter(14, 40);

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={50} spotY={48} />

      <div style={{ position: "absolute", top: 84, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Eyebrow delay={6}>One hub, every channel</Eyebrow>
      </div>

      {/* connector lines */}
      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0 }}>
        {ECO.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * R;
          const y = cy + Math.sin(rad) * R;
          const len = Math.hypot(x - cx, y - cy);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={C.HAIRLINE}
              strokeWidth={1.5}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
            />
          );
        })}
      </svg>

      {/* center mark */}
      <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%, -50%)" }}>
        <Enter delay={2} dur={22} scale={0.85}>
          <div
            style={{
              width: 168,
              height: 168,
              borderRadius: 40,
              display: "grid",
              placeItems: "center",
              background: C.INK_2,
              border: `1px solid ${C.HAIRLINE}`,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)",
            }}
          >
            <Logo size={96} tone="light" wordmark={false} />
          </div>
        </Enter>
      </div>

      {/* platform nodes */}
      {ECO.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * R;
        const y = cy + Math.sin(rad) * R;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
            <Enter delay={20 + i * 5} dur={18} scale={0.8}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 24,
                    display: "grid",
                    placeItems: "center",
                    background: "#fff",
                    boxShadow: "0 18px 36px -12px rgba(0,0,0,0.6)",
                  }}
                >
                  <Img src={staticFile(p.icon)} style={{ width: 56, height: 56 }} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", color: C.MUTED }}>
                  {p.label}
                </span>
              </div>
            </Enter>
          </div>
        );
      })}

      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Statement delay={44} size={46} weight={500} color={C.WHITE}>
          Connect every account. Manage one workflow.
        </Statement>
      </div>
    </AbsoluteFill>
  );
};

/* ── 7 · Trust & Scale ────────────────────────────────────────────────── */
export const SceneTrust = () => {
  const push = useSlowPush(1.0, 1.03, 105);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={50} spotY={46} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          transform: `scale(${push})`,
        }}
      >
        <Statement delay={4} size={120} weight={600} color={C.WHITE}>
          One platform.
        </Statement>
        <Statement delay={16} size={120} weight={600} color={C.MUTED}>
          Every channel.
        </Statement>
        <Statement delay={28} size={120} weight={600} color={C.ACCENT}>
          One workflow.
        </Statement>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ── 8 · CTA ──────────────────────────────────────────────────────────── */
export const SceneCTA = () => {
  const push = useSlowPush(1.0, 1.04, 105);
  const underline = useEnter(34, 24);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <SceneBackdrop tone="dark" spotX={50} spotY={42} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          transform: `scale(${push})`,
        }}
      >
        <Enter delay={4} dur={24} y={16} scale={0.92}>
          <Logo size={104} tone="light" />
        </Enter>
        <Statement delay={16} size={64} weight={600} color={C.WHITE}>
          Manage everything. Miss nothing.
        </Statement>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: 8 }}>
          <Enter delay={28} dur={16}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={{ fontFamily: MONO, fontSize: 26, letterSpacing: "0.04em", color: C.MUTED }}>
                trysyncly.com
              </span>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -8,
                  height: 2,
                  background: C.ACCENT,
                  width: `${underline * 100}%`,
                }}
              />
            </div>
          </Enter>
          <Enter delay={40} dur={16} y={16}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 62,
                padding: "0 38px",
                borderRadius: 14,
                background: C.ACCENT,
                color: "#04140d",
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 22,
              }}
            >
              Start free today
            </span>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
