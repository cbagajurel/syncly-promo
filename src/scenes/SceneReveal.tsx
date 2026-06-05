import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../constants";
import { Logo } from "../components/Logo";

export const SceneReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scales in with spring
  const logoP = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1.2 },
    from: 0.88,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Horizontal rule extends
  const lineP = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { damping: 30, stiffness: 280 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 440]);

  // Tagline
  const tagP = spring({
    frame: Math.max(0, frame - 46),
    fps,
    config: { damping: 24, stiffness: 160 },
  });
  const tagOpacity = interpolate(tagP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(tagP, [0, 1], [22, 0]);

  // Mono tag
  const monoP = spring({
    frame: Math.max(0, frame - 68),
    fps,
    config: { damping: 26, stiffness: 180 },
  });
  const monoOpacity = interpolate(monoP, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle teal radial highlight
  const glowOpacity = logoOpacity * 0.45;

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Soft radial behind logo */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.ACCENT_SOFT} 0%, transparent 62%)`,
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoP})`,
          opacity: logoOpacity,
          transformOrigin: "center",
        }}
      >
        <Logo size={92} />
      </div>

      {/* HR */}
      <div
        style={{
          marginTop: 40,
          width: lineW,
          height: 1,
          background: C.BORDER1,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          marginTop: 32,
          transform: `translateY(${tagY}px)`,
          opacity: tagOpacity,
          fontFamily: FONT,
          fontSize: 30,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: C.FG2,
          textAlign: "center",
        }}
      >
        One dashboard.{" "}
        <span style={{ color: C.FG0, fontWeight: 600 }}>
          Every conversation.
        </span>
      </div>

      {/* Mono sub-line */}
      <div
        style={{
          marginTop: 20,
          opacity: monoOpacity,
          fontFamily: MONO,
          fontSize: 12,
          color: C.FG3,
          letterSpacing: "0.06em",
          textAlign: "center",
        }}
      >
        Instagram · Facebook · WhatsApp — unified
      </div>
    </AbsoluteFill>
  );
};
