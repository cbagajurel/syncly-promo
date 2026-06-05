import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, SPRING } from "../constants";
import { Logo } from "../components/Logo";
import { DotGrid } from "../components/DotGrid";

export const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo — scale with breathing
  const logoP = spring({
    frame,
    fps,
    config: SPRING.HEAVY,
    from: 0.84,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle breathing on logo
  const breathe = 1 + 0.005 * Math.sin((frame / fps) * Math.PI * 0.8);

  // HR line
  const lineP = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 30, stiffness: 280 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 360]);

  // "Start free today." — scale-up entrance
  const h1P = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.85 },
    from: 0.92,
    to: 1,
  });
  const h1Opacity = interpolate(frame, [36, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sub-line
  const subP = spring({
    frame: Math.max(0, frame - 52),
    fps,
    config: SPRING.SMOOTH,
  });
  const subOpacity = interpolate(subP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subP, [0, 1], [16, 0]);

  // URL — with underline draw
  const urlP = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: SPRING.SNAPPY,
  });
  const urlOpacity = interpolate(urlP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(urlP, [0, 1], [14, 0]);

  // Underline draw — after URL appears
  const ulP = spring({
    frame: Math.max(0, frame - 82),
    fps,
    config: { damping: 28, stiffness: 200 },
  });
  const ulWidth = interpolate(ulP, [0, 1], [0, 100]);

  // CTA button — spring bounce
  const btnP = spring({
    frame: Math.max(0, frame - 92),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.8 },
    from: 0.85,
    to: 1,
  });
  const btnOpacity = interpolate(frame, [92, 104], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mono note
  const noteOpacity = interpolate(frame, [105, 118], [0, 0.45], {
    extrapolateLeft: "clamp",
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
        gap: 0,
      }}
    >
      {/* Subtle dot grid for texture */}
      <DotGrid opacity={0.12} spacing={36} dotSize={0.8} />

      {/* Logo with breathing */}
      <div
        style={{
          transform: `scale(${logoP * breathe})`,
          opacity: logoOpacity,
          transformOrigin: "center",
        }}
      >
        <Logo size={84} />
      </div>

      {/* HR */}
      <div
        style={{
          marginTop: 36,
          width: lineW,
          height: 1,
          background: C.BORDER1,
        }}
      />

      {/* "Start free today." — scale-up */}
      <div
        style={{
          marginTop: 36,
          transform: `scale(${h1P})`,
          opacity: h1Opacity,
          fontFamily: FONT,
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: C.FG0,
          textAlign: "center",
          lineHeight: 1.05,
          transformOrigin: "center",
        }}
      >
        Start free today.
      </div>

      {/* Sub */}
      <div
        style={{
          marginTop: 14,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
          fontFamily: FONT,
          fontSize: 21,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: C.FG2,
          textAlign: "center",
        }}
      >
        Connect your first account in under 2 minutes.
      </div>

      {/* URL with underline draw */}
      <div
        style={{
          marginTop: 44,
          transform: `translateY(${urlY}px)`,
          opacity: urlOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 18,
            fontWeight: 500,
            color: C.ACCENT,
            letterSpacing: "0.01em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          trysyncly.com
          <span style={{ opacity: 0.5 }}>→</span>
        </div>
        {/* Underline — draws left to right */}
        <div
          style={{
            width: `${ulWidth}%`,
            height: 1.5,
            background: C.ACCENT,
            borderRadius: 1,
            maxWidth: 160,
          }}
        />
      </div>

      {/* CTA button — spring bounce */}
      <div
        style={{
          marginTop: 28,
          transform: `scale(${btnP})`,
          opacity: btnOpacity,
          background: C.FG0,
          color: C.BG1,
          fontFamily: FONT,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          borderRadius: 10,
          padding: "14px 42px",
          boxShadow: C.SHADOW_MD,
          transformOrigin: "center",
        }}
      >
        Get started — it's free
      </div>

      {/* Tiny mono note */}
      <div
        style={{
          marginTop: 18,
          opacity: noteOpacity,
          fontFamily: MONO,
          fontSize: 11,
          color: C.FG3,
          letterSpacing: "0.04em",
        }}
      >
        No credit card required
      </div>
    </AbsoluteFill>
  );
};
