import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, SPRING } from "../constants";
import { DotGrid } from "../components/DotGrid";

// Typewriter effect — reveals text character by character
const Typewriter = ({
  text,
  startFrame,
  charsPerFrame = 0.8,
  style,
}: {
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const showCursor = elapsed > 0 && chars < text.length;
  const cursorBlink = Math.floor(frame / 16) % 2 === 0;

  return (
    <span style={style}>
      {text.slice(0, chars)}
      {showCursor && cursorBlink && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "0.85em",
            background: C.ACCENT,
            marginLeft: 2,
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </span>
  );
};

// Slide-up reveal with clip mask
const ClipReveal = ({
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
    config: SPRING.SMOOTH,
  });
  const y = interpolate(p, [0, 1], [100, 0]);
  const opacity = interpolate(p, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: `translateY(${y}%)`,
          opacity,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Platform name with brand color — staggered entrance
const PlatformWord = ({
  name,
  color,
  delay,
  separator,
}: {
  name: string;
  color: string;
  delay: number;
  separator?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 20, stiffness: 160, mass: 0.75 },
  });
  const y = interpolate(p, [0, 1], [48, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.25], [0, 1], {
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
          fontSize: 78,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color,
          lineHeight: 1.15,
        }}
      >
        {name}
        {separator && (
          <span style={{ color: C.FG3, fontWeight: 300, margin: "0 6px" }}>{separator}</span>
        )}
      </span>
    </div>
  );
};

export const SceneHook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Every. Single. Day." — scale punch
  const punchP = spring({
    frame: Math.max(0, frame - 82),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7 },
    from: 0.88,
    to: 1,
  });
  const punchOpacity = interpolate(frame, [82, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizontal rule — extends left to right
  const lineP = spring({
    frame: Math.max(0, frame - 120),
    fps,
    config: { damping: 30, stiffness: 260 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 120]);

  // "There's a better way." — slow, deliberate entrance
  const betterP = spring({
    frame: Math.max(0, frame - 145),
    fps,
    config: { damping: 28, stiffness: 90, mass: 1.1 },
  });
  const betterOpacity = interpolate(betterP, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const betterY = interpolate(betterP, [0, 1], [24, 0]);

  // "Introducing syncly →" — typewriter
  const introStart = 168;

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 140,
        paddingRight: 200,
      }}
    >
      {/* Subtle dot grid background */}
      <DotGrid opacity={0.18} spacing={40} dotSize={1} />

      {/* "Managing" */}
      <ClipReveal delay={0} style={{
        fontFamily: FONT,
        fontSize: 80,
        fontWeight: 400,
        letterSpacing: "-0.03em",
        color: C.FG0,
        lineHeight: 1.15,
      }}>
        Managing
      </ClipReveal>

      {/* Platform names in brand colors */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "nowrap",
          marginTop: 4,
        }}
      >
        <PlatformWord name="Instagram" color={C.INSTAGRAM} delay={14} separator="," />
        <PlatformWord name="Facebook" color={C.FACEBOOK} delay={28} separator="," />
        <PlatformWord name="WhatsApp" color={C.WHATSAPP} delay={42} />
      </div>

      {/* "across 3 separate tools." */}
      <ClipReveal delay={56} style={{
        fontFamily: FONT,
        fontSize: 48,
        fontWeight: 400,
        letterSpacing: "-0.02em",
        color: C.FG1,
        lineHeight: 1.25,
        marginTop: 8,
      }}>
        across 3 separate tools.
      </ClipReveal>

      {/* "Every. Single. Day." — scale punch entrance */}
      <div
        style={{
          overflow: "hidden",
          marginTop: 6,
        }}
      >
        <div
          style={{
            transform: `scale(${punchP})`,
            opacity: punchOpacity,
            transformOrigin: "left center",
            fontFamily: FONT,
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: C.FG0,
            lineHeight: 1.15,
          }}
        >
          Every. Single. Day.
        </div>
      </div>

      {/* Accent horizontal rule */}
      <div
        style={{
          marginTop: 48,
          marginBottom: 20,
          width: lineW,
          height: 2,
          background: C.ACCENT,
          borderRadius: 1,
        }}
      />

      {/* "There's a better way." — slow, deliberate */}
      <div
        style={{
          transform: `translateY(${betterY}px)`,
          opacity: betterOpacity,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: C.ACCENT,
        }}
      >
        There's a better way.
      </div>

      {/* "Introducing syncly →" — typewriter reveal */}
      <div
        style={{
          marginTop: 14,
          fontFamily: MONO,
          fontSize: 14,
          color: C.FG3,
          letterSpacing: "0.02em",
          minHeight: 20,
        }}
      >
        <Typewriter
          text="Introducing syncly →"
          startFrame={introStart}
          charsPerFrame={0.6}
        />
      </div>
    </AbsoluteFill>
  );
};
