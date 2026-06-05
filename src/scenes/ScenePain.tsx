import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../constants";

const PAINS = [
  {
    topColor: C.ERR,
    number: "01",
    title: "Slow response times",
    body: "DMs sit unread while you switch between apps. Customers notice — and don't come back.",
    delay: 8,
  },
  {
    topColor: C.WARN,
    number: "02",
    title: "No unified view",
    body: "Content scattered across Hootsuite, Meta Suite, and a spreadsheet nobody updates.",
    delay: 26,
  },
  {
    topColor: C.FG3,
    number: "03",
    title: "Manual, every time",
    body: "You post manually. Reply manually. Track manually. It's a full-time job on its own.",
    delay: 44,
  },
];

export const ScenePain = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const headerP = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 170 },
  });
  const headerOpacity = interpolate(headerP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerP, [0, 1], [18, 0], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingInline: 120,
        gap: 56,
      }}
    >
      {/* Header block */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.FG3,
          }}
        >
          The problem
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: C.FG0,
            lineHeight: 1.15,
          }}
        >
          Managing separately<br />
          is holding you back.
        </h2>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: 20 }}>
        {PAINS.map(({ topColor, number, title, body, delay }) => {
          const p = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 18, stiffness: 110, mass: 1.05 },
          });
          const y = interpolate(p, [0, 1], [64, 0], {
            easing: Easing.out(Easing.cubic),
          });
          const opacity = interpolate(p, [0, 0.35], [0, 1], {
            extrapolateRight: "clamp",
          });
          const scale = interpolate(p, [0, 1], [0.975, 1]);

          return (
            <div
              key={number}
              style={{
                flex: 1,
                background: C.BG1,
                border: `1px solid ${C.BORDER0}`,
                borderTop: `3px solid ${topColor}`,
                borderRadius: 12,
                boxShadow: C.SHADOW_MD,
                padding: "32px 28px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transform: `translateY(${y}px) scale(${scale})`,
                opacity,
                transformOrigin: "center bottom",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: topColor,
                }}
              >
                {number}
              </span>

              {/* Title */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  color: C.FG0,
                  lineHeight: 1.25,
                }}
              >
                {title}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: C.BORDER1,
                }}
              />

              {/* Body */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 400,
                  color: C.FG2,
                  lineHeight: 1.65,
                }}
              >
                {body}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
