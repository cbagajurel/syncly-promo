import { AbsoluteFill } from "remotion";
import { Eyebrow } from "./Eyebrow";
import { KineticType } from "../motion/KineticType";
import { C } from "../theme";
import { SPACE, TYPE } from "../tokens";

/**
 * The standard lower-left statement block — one consistent grid position,
 * type scale and rhythm across every scene. Sits over a bottom scrim.
 */
export function Caption({
  eyebrow,
  eyebrowDelay = 0,
  text,
  textDelay = 10,
  accent = C.ACCENT,
  accentDeep,
  accentWord,
  size = TYPE.caption,
  opacity = 1,
}: {
  eyebrow: string;
  eyebrowDelay?: number;
  text: string;
  textDelay?: number;
  accent?: string;
  accentDeep?: string;
  accentWord?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <AbsoluteFill
      style={{
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingLeft: 130,
        paddingRight: 130,
        paddingBottom: 84,
        opacity,
      }}
    >
      <Eyebrow text={eyebrow} delay={eyebrowDelay} color={accent} />
      <div style={{ height: SPACE[4] }} />
      <KineticType
        text={text}
        delay={textDelay}
        size={size}
        weight={600}
        accentWord={accentWord}
        accentColor={accentDeep ?? accent}
        accentGradient={accentDeep ? [accent, accentDeep] : undefined}
      />
    </AbsoluteFill>
  );
}

export const SCRIM = (bg = C.BG) =>
  `linear-gradient(to top, ${bg} 4%, rgba(247,248,251,0.0) 26%)`;
