import type { CSSProperties, ReactNode } from "react";
import { C } from "../theme";
import { RADIUS, SHADOW } from "../tokens";

/** Floating app-window chrome: hairline border, soft elevation, optional bar. */
export function ScreenFrame({
  width,
  height,
  bar = true,
  radius = RADIUS.lg,
  style,
  children,
}: {
  width?: number;
  height?: number;
  bar?: boolean;
  radius?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: C.SURFACE,
        border: `1px solid ${C.HAIRLINE}`,
        boxShadow: SHADOW.float,
        ...style,
      }}
    >
      {bar && (
        <div
          style={{
            height: 34,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 14px",
            borderBottom: `1px solid ${C.HAIRLINE_2}`,
            background: C.SURFACE_2,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{ width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.85 }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
