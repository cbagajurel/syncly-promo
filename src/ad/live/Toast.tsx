import type { ReactNode } from "react";
import { F, C } from "../theme";
import { RADIUS, SHADOW, SPACE } from "../tokens";

/**
 * An incoming notification toast. `t` (0→1) drives slide-in from the right;
 * scenes loop it with `everyN`. Crisp, token-consistent card.
 */
export function Toast({
  t,
  dot,
  title,
  text,
  channel,
  width = 380,
  accent = C.ACCENT,
}: {
  t: number;
  dot: string;
  title: string;
  text: string;
  channel?: string;
  width?: number;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        background: C.SURFACE,
        border: `1px solid ${C.HAIRLINE}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.float,
        padding: `${SPACE[4]}px ${SPACE[5]}px`,
        fontFamily: F.display,
        opacity: t,
        transform: `translateX(${(1 - t) * 60}px)`,
        willChange: "transform, opacity",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: SPACE[3], marginBottom: SPACE[2] }}>
        <span style={{ width: 10, height: 10, borderRadius: RADIUS.pill, background: dot }} />
        <span style={{ fontSize: 16, fontWeight: 600, color: C.INK }}>{title}</span>
        {channel && (
          <span style={{ marginLeft: "auto", fontSize: 12, color: C.INK_3, fontFamily: F.mono }}>
            {channel}
          </span>
        )}
      </div>
      <div style={{ fontSize: 17, color: C.INK_2, lineHeight: 1.4 }}>{text}</div>
    </div>
  );
}
