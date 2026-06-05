import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../constants";

// Slide-up reveal for a single line
const Line = ({
  delay,
  children,
  style,
}: {
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 22, stiffness: 140, mass: 0.85 },
  });
  const y = interpolate(p, [0, 1], [56, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ transform: `translateY(${y}px)`, opacity, ...style }}>
        {children}
      </div>
    </div>
  );
};

// Each platform name with its brand color
const PlatformChip = ({
  name,
  color,
  delay,
  last,
}: {
  name: string;
  color: string;
  delay: number;
  last?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 22, stiffness: 150, mass: 0.8 },
  });
  const y = interpolate(p, [0, 1], [56, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden", display: "inline-flex", alignItems: "baseline" }}>
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${y}px)`,
          opacity,
          fontFamily: FONT,
          fontSize: 74,
          fontWeight: 700,
          letterSpacing: "-0.035em",
          color,
          lineHeight: 1.2,
        }}
      >
        {name}
        {!last && (
          <span style={{ color: C.FG3, fontWeight: 300, marginLeft: 4 }}>,</span>
        )}
      </span>
    </div>
  );
};

export const SceneHook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Accent separator line
  const lineP = spring({
    frame: Math.max(0, frame - 128),
    fps,
    config: { damping: 30, stiffness: 260 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 72]);

  // "There's a better way."
  const betterP = spring({
    frame: Math.max(0, frame - 138),
    fps,
    config: { damping: 22, stiffness: 140 },
  });
  const betterOpacity = interpolate(betterP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const betterY = interpolate(betterP, [0, 1], [28, 0]);

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 160,
        paddingRight: 160,
        gap: 0,
      }}
    >
      {/* "Managing" */}
      <Line delay={0} style={{
        fontFamily: FONT,
        fontSize: 76,
        fontWeight: 400,
        letterSpacing: "-0.03em",
        color: C.FG0,
        lineHeight: 1.2,
      }}>
        Managing
      </Line>

      {/* Platform names in brand colors */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          flexWrap: "nowrap",
          marginTop: 2,
        }}
      >
        <PlatformChip name="Instagram" color={C.INSTAGRAM} delay={12} />
        <PlatformChip name="Facebook"  color={C.FACEBOOK}  delay={24} />
        <PlatformChip name="WhatsApp"  color={C.WHATSAPP}  delay={36} last />
      </div>

      {/* "across 3 separate tools." */}
      <Line delay={52} style={{
        fontFamily: FONT,
        fontSize: 52,
        fontWeight: 400,
        letterSpacing: "-0.025em",
        color: C.FG1,
        lineHeight: 1.25,
        marginTop: 6,
      }}>
        across 3 separate tools.
      </Line>

      {/* "Every. Single. Day." */}
      <Line delay={78} style={{
        fontFamily: FONT,
        fontSize: 72,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        color: C.FG0,
        lineHeight: 1.2,
        marginTop: 4,
      }}>
        Every. Single. Day.
      </Line>

      {/* Accent line */}
      <div
        style={{
          marginTop: 52,
          marginBottom: 22,
          width: lineW,
          height: 2,
          background: C.ACCENT,
          borderRadius: 2,
        }}
      />

      {/* "There's a better way." */}
      <div
        style={{
          transform: `translateY(${betterY}px)`,
          opacity: betterOpacity,
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: C.ACCENT,
        }}
      >
        There's a better way.
      </div>

      {/* Mono sub-text */}
      <div
        style={{
          marginTop: 12,
          opacity: betterOpacity * 0.6,
          fontFamily: MONO,
          fontSize: 14,
          color: C.FG3,
          letterSpacing: "0.02em",
        }}
      >
        Introducing syncly →
      </div>
    </AbsoluteFill>
  );
};
