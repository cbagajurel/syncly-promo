import { C, FONT } from "../constants";

export const Logo = ({ size = 52 }: { size?: number }) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      gap: size * 0.13,
    }}
  >
    {/* Brand dot */}
    <span
      style={{
        display: "inline-block",
        width: size * 0.18,
        height: size * 0.18,
        borderRadius: "50%",
        background: C.ACCENT,
        flexShrink: 0,
      }}
    />
    <span style={{ color: C.FG0 }}>
      sync<span style={{ color: C.ACCENT }}>ly</span>
    </span>
  </div>
);
