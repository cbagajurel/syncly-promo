import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../constants";

const STATS = [
  { value: 2,  suffix: "min",      label: "Average setup time",         sub: "First account connected in minutes",  delay: 0  },
  { value: 3,  suffix: "platforms",label: "Managed from one dashboard",  sub: "Instagram · Facebook · WhatsApp",     delay: 18 },
  { value: 10, suffix: "×",        label: "Faster response times",       sub: "With AI auto-reply enabled",          delay: 36 },
] as const;

const StatCard = ({
  value,
  suffix,
  label,
  sub,
  delay,
}: (typeof STATS)[number]) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - delay);

  const p = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 110, mass: 1 },
  });
  const y = interpolate(p, [0, 1], [56, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [0.96, 1]);

  // Counting number animation
  const countP = interpolate(localFrame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const displayValue = Math.round(countP * value);

  return (
    <div
      style={{
        flex: 1,
        background: C.BG1,
        border: `1px solid ${C.BORDER0}`,
        borderRadius: 16,
        boxShadow: C.SHADOW_MD,
        padding: "40px 32px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        transformOrigin: "center bottom",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: C.ACCENT,
          opacity: countP,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Number */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: C.FG0,
          }}
        >
          {displayValue}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: C.ACCENT,
          }}
        >
          {suffix}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 28,
          height: 1,
          background: C.BORDER1,
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: C.FG0,
          lineHeight: 1.25,
        }}
      >
        {label}
      </div>

      {/* Sub */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 12,
          color: C.FG3,
          lineHeight: 1.5,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

export const SceneOutcome = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerP = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 170 },
  });
  const headerY = interpolate(headerP, [0, 1], [20, 0]);
  const headerOpacity = interpolate(headerP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 100,
        gap: 56,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
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
          The results
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: C.FG0,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Real impact. From day one.
        </h2>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
