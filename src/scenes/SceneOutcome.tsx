import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, SPRING } from "../constants";
import { ProgressBar } from "../components/ProgressBar";

const STATS = [
  { value: 2,  suffix: "min",       label: "Average setup time",        sub: "First account connected in minutes", delay: 0  },
  { value: 3,  suffix: "platforms",  label: "Managed from one dashboard", sub: "Instagram · Facebook · WhatsApp",    delay: 22 },
  { value: 10, suffix: "×",         label: "Faster response times",      sub: "With AI auto-reply enabled",         delay: 44 },
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

  // Card entrance — wave pattern
  const p = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1.1 },
  });
  const y = interpolate(p, [0, 1], [64, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [0.96, 1]);

  // Number counting — eased steps (snap through values)
  const countDuration = 45;
  const countRaw = interpolate(localFrame, [8, 8 + countDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const displayValue = Math.round(countRaw * value);

  return (
    <div
      style={{
        flex: 1,
        background: C.BG1,
        border: `1px solid ${C.BORDER0}`,
        borderRadius: 14,
        boxShadow: C.SHADOW_MD,
        padding: "36px 30px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        transformOrigin: "center bottom",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Progress bar at top — fills as number counts */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <ProgressBar
          delay={delay + 8}
          duration={countDuration}
          height={3}
          color={C.ACCENT}
          bgColor="transparent"
          borderRadius={0}
        />
      </div>

      {/* Number + suffix */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 76,
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
            fontSize: 26,
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

  // "Real impact." — first line
  const h1P = spring({
    frame,
    fps,
    config: SPRING.SMOOTH,
  });
  const h1Y = interpolate(h1P, [0, 1], [24, 0]);
  const h1Opacity = interpolate(h1P, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "From day one." — second line, delayed beat
  const h2P = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: SPRING.SMOOTH,
  });
  const h2Y = interpolate(h2P, [0, 1], [24, 0]);
  const h2Opacity = interpolate(h2P, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Label
  const labelP = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: SPRING.SNAPPY,
  });
  const labelOpacity = interpolate(labelP, [0, 0.4], [0, 1], {
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
        gap: 52,
      }}
    >
      {/* Header — split-line reveal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
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
            opacity: labelOpacity,
          }}
        >
          The results
        </span>

        {/* "Real impact." */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              transform: `translateY(${h1Y}px)`,
              opacity: h1Opacity,
              fontFamily: FONT,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: C.FG0,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Real impact.
          </div>
        </div>

        {/* "From day one." — delayed emphasis */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              transform: `translateY(${h2Y}px)`,
              opacity: h2Opacity,
              fontFamily: FONT,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: C.ACCENT,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            From day one.
          </div>
        </div>
      </div>

      {/* Stats — wave entrance */}
      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
