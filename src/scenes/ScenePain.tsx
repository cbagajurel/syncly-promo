import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, SPRING } from "../constants";

const PAINS = [
  {
    accentColor: C.ERR,
    number: "01",
    title: "Slow response times",
    body: "DMs sit unread while you switch between apps. Customers notice — and don't come back.",
    delay: 24,
  },
  {
    accentColor: C.WARN,
    number: "02",
    title: "No unified view",
    body: "Content scattered across Hootsuite, Meta Suite, and a spreadsheet nobody updates.",
    delay: 46,
  },
  {
    accentColor: C.FG3,
    number: "03",
    title: "Manual, every time",
    body: "You post manually. Reply manually. Track manually. It's a full-time job on its own.",
    delay: 68,
  },
];

// Word-by-word clip reveal for the header
const WordReveal = ({
  words,
  startDelay,
  style,
}: {
  words: string[];
  startDelay: number;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 14px", ...style }}>
      {words.map((word, i) => {
        const p = spring({
          frame: Math.max(0, frame - startDelay - i * 4),
          fps,
          config: SPRING.SMOOTH,
        });
        const y = interpolate(p, [0, 1], [100, 0]);
        const opacity = interpolate(p, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div key={i} style={{ overflow: "hidden" }}>
            <div
              style={{
                transform: `translateY(${y}%)`,
                opacity,
              }}
            >
              {word}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Animated pain card with left accent border
const PainCard = ({
  accentColor,
  number,
  title,
  body,
  delay,
}: (typeof PAINS)[number]) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 20, stiffness: 100, mass: 1.1 },
  });
  const y = interpolate(p, [0, 1], [72, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(p, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [0.97, 1]);

  // Subtle alive-feeling: gentle float
  const breathe = Math.sin((frame / fps) * Math.PI * 0.5 + delay * 0.1) * 1.5;

  return (
    <div
      style={{
        flex: 1,
        background: C.BG1,
        border: `1px solid ${C.BORDER0}`,
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 10,
        boxShadow: C.SHADOW_MD,
        padding: "36px 28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `translateY(${y + breathe}px) scale(${scale})`,
        opacity,
        transformOrigin: "center bottom",
      }}
    >
      {/* Number badge */}
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: accentColor,
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
          width: 28,
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
};

export const ScenePain = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section number — large accent on the left
  const numP = spring({
    frame,
    fps,
    config: SPRING.HEAVY,
  });
  const numOpacity = interpolate(numP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const numY = interpolate(numP, [0, 1], [20, 0]);

  // Header text
  const headerP = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: SPRING.SMOOTH,
  });
  const headerOpacity = interpolate(headerP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.BG0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingInline: 120,
        gap: 52,
      }}
    >
      {/* Header — editorial layout */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 40,
        }}
      >
        {/* Large section number */}
        <div
          style={{
            opacity: numOpacity,
            transform: `translateY(${numY}px)`,
            fontFamily: MONO,
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: C.BORDER1,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          01
        </div>

        {/* Text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            opacity: headerOpacity,
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
          <WordReveal
            words={["Managing", "separately", "is", "holding", "you", "back."]}
            startDelay={10}
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: C.FG0,
              lineHeight: 1.15,
            }}
          />
        </div>
      </div>

      {/* Pain cards — cascading stagger */}
      <div style={{ display: "flex", gap: 20 }}>
        {PAINS.map((pain) => (
          <PainCard key={pain.number} {...pain} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
