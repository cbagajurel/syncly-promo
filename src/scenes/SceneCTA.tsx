import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../constants";
import { Logo } from "../components/Logo";

export const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo
  const logoP = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1.2 },
    from: 0.86,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // HR line
  const lineP = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 30, stiffness: 280 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 360]);

  // Primary headline
  const h1P = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 22, stiffness: 150 },
  });
  const h1Opacity = interpolate(h1P, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const h1Y = interpolate(h1P, [0, 1], [28, 0], {
    easing: Easing.out(Easing.cubic),
  });

  // Sub-line
  const subP = spring({
    frame: Math.max(0, frame - 56),
    fps,
    config: { damping: 24, stiffness: 160 },
  });
  const subOpacity = interpolate(subP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subP, [0, 1], [20, 0]);

  // URL
  const urlP = spring({
    frame: Math.max(0, frame - 76),
    fps,
    config: { damping: 26, stiffness: 180 },
  });
  const urlOpacity = interpolate(urlP, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(urlP, [0, 1], [16, 0]);

  // CTA button
  const btnP = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
    from: 0.88,
    to: 1,
  });
  const btnOpacity = interpolate(urlP, [0.3, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle breathing on logo
  const breathe = 1 + 0.004 * Math.sin((frame / fps) * Math.PI * 0.9);

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
      {/* Soft radial */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.ACCENT_SOFT} 0%, transparent 58%)`,
          opacity: logoOpacity * 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoP * breathe})`,
          opacity: logoOpacity,
          transformOrigin: "center",
        }}
      >
        <Logo size={88} />
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

      {/* Headline */}
      <div
        style={{
          marginTop: 36,
          transform: `translateY(${h1Y}px)`,
          opacity: h1Opacity,
          fontFamily: FONT,
          fontSize: 62,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: C.FG0,
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        Start free today.
      </div>

      {/* Sub */}
      <div
        style={{
          marginTop: 16,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: C.FG2,
          textAlign: "center",
        }}
      >
        Connect your first account in under 2 minutes.
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 48,
          transform: `translateY(${urlY}px)`,
          opacity: urlOpacity,
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

      {/* CTA button */}
      <div
        style={{
          marginTop: 32,
          transform: `scale(${btnP})`,
          opacity: btnOpacity,
          background: C.FG0,
          color: C.BG1,
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          borderRadius: 10,
          padding: "14px 44px",
          boxShadow: C.SHADOW_MD,
        }}
      >
        Get started — it's free
      </div>

      {/* Tiny mono note */}
      <div
        style={{
          marginTop: 20,
          opacity: btnOpacity * 0.4,
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
