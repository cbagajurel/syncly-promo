import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, SPRING } from "../constants";
import { Logo } from "../components/Logo";

export const SceneReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo — crisp scale-in with slight overshoot
  const logoP = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.9 },
    from: 0.85,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Expanding ring behind logo
  const ringP = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 30, stiffness: 120, mass: 1.2 },
  });
  const ringSize = interpolate(ringP, [0, 1], [40, 280]);
  const ringOpacity = interpolate(ringP, [0, 0.3, 1], [0, 0.5, 0.15]);

  // Horizontal rule extends
  const lineP = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 30, stiffness: 280 },
  });
  const lineW = interpolate(lineP, [0, 1], [0, 440]);

  // "One dashboard." — first line
  const line1P = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: SPRING.SMOOTH,
  });
  const line1Opacity = interpolate(line1P, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(line1P, [0, 1], [20, 0]);

  // "Every conversation." — second line, delayed
  const line2P = spring({
    frame: Math.max(0, frame - 56),
    fps,
    config: SPRING.SMOOTH,
  });
  const line2Opacity = interpolate(line2P, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(line2P, [0, 1], [20, 0]);

  // Platform list — left-to-right wipe
  const wipeP = spring({
    frame: Math.max(0, frame - 72),
    fps,
    config: { damping: 26, stiffness: 180 },
  });
  const wipeWidth = interpolate(wipeP, [0, 1], [0, 100]);
  const wipeOpacity = interpolate(wipeP, [0, 0.3], [0, 1], {
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
      }}
    >
      {/* Expanding circle ring behind logo — solid stroke, no gradient */}
      <div
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid ${C.ACCENT}`,
          opacity: ringOpacity,
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
        <Logo size={96} />
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

      {/* "One dashboard." */}
      <div
        style={{
          marginTop: 32,
          transform: `translateY(${line1Y}px)`,
          opacity: line1Opacity,
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: C.FG2,
          textAlign: "center",
        }}
      >
        One dashboard.
      </div>

      {/* "Every conversation." — emphasis */}
      <div
        style={{
          marginTop: 4,
          transform: `translateY(${line2Y}px)`,
          opacity: line2Opacity,
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: C.FG0,
          textAlign: "center",
        }}
      >
        Every conversation.
      </div>

      {/* Platform list — wipe reveal */}
      <div
        style={{
          marginTop: 24,
          overflow: "hidden",
          width: `${wipeWidth}%`,
          maxWidth: 400,
          opacity: wipeOpacity,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: C.FG3,
            letterSpacing: "0.06em",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Instagram · Facebook · WhatsApp — unified
        </div>
      </div>
    </AbsoluteFill>
  );
};
