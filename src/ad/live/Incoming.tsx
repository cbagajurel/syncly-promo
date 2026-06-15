import { F, C } from "../theme";
import { RADIUS, SHADOW, SPACE } from "../tokens";

/** A chat bubble arriving in a thread. `t` 0→1 drives the entrance. */
export function IncomingBubble({
  t,
  text,
  mine = false,
  accent = C.ACCENT,
  width = 300,
}: {
  t: number;
  text: string;
  mine?: boolean;
  accent?: string;
  width?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: mine ? "flex-end" : "flex-start",
        opacity: t,
        transform: `translateY(${(1 - t) * 14}px) scale(${0.96 + 0.04 * t})`,
        transformOrigin: mine ? "bottom right" : "bottom left",
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          maxWidth: width,
          padding: `${SPACE[3]}px ${SPACE[4]}px`,
          borderRadius: RADIUS.lg,
          fontFamily: F.display,
          fontSize: 18,
          lineHeight: 1.4,
          background: mine ? accent : C.SURFACE,
          color: mine ? "#fff" : C.INK,
          border: mine ? "none" : `1px solid ${C.HAIRLINE}`,
          boxShadow: SHADOW.card,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/** A conversation row sliding into the inbox list with a soft highlight. */
export function IncomingRow({
  t,
  initials,
  name,
  preview,
  dot,
  unread = 1,
  accent = C.ACCENT,
  width = 360,
}: {
  t: number;
  initials: string;
  name: string;
  preview: string;
  dot: string;
  unread?: number;
  accent?: string;
  width?: number;
}) {
  return (
    <div
      style={{
        width,
        display: "flex",
        alignItems: "center",
        gap: SPACE[3],
        padding: `${SPACE[3]}px ${SPACE[4]}px`,
        borderRadius: RADIUS.md,
        background: `color-mix(in srgb, ${accent} ${8 * t}%, ${C.SURFACE})`,
        border: `1px solid ${C.HAIRLINE}`,
        boxShadow: SHADOW.card,
        fontFamily: F.display,
        opacity: t,
        transform: `translateX(${(1 - t) * -28}px)`,
        willChange: "transform, opacity",
      }}
    >
      <span style={{ position: "relative", flexShrink: 0 }}>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: RADIUS.pill,
            background: C.SURFACE_2,
            color: C.INK_2,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {initials}
        </span>
        <span
          style={{
            position: "absolute",
            right: -1,
            bottom: -1,
            width: 12,
            height: 12,
            borderRadius: RADIUS.pill,
            background: dot,
            border: "2px solid #fff",
          }}
        />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.INK }}>{name}</div>
        <div
          style={{
            fontSize: 14,
            color: C.INK_2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {preview}
        </div>
      </span>
      <span
        style={{
          flexShrink: 0,
          background: accent,
          color: "#fff",
          borderRadius: RADIUS.pill,
          fontSize: 12,
          fontWeight: 700,
          padding: "2px 8px",
        }}
      >
        {unread}
      </span>
    </div>
  );
}
