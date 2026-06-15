import { Img, staticFile } from "remotion";
import type { CSSProperties } from "react";
import { FONT, MONO } from "../constants";

/**
 * A realistic macOS-style notification banner used to build the "chaos" of
 * Scene 2 — a platform icon, app name, sender, message snippet and time.
 * Clean and on-brand; deliberately *not* a flying generic icon.
 */
export function NotificationCard({
  icon,
  app,
  sender,
  message,
  time,
  width = 360,
  style,
}: {
  icon: string;
  app: string;
  sender: string;
  message: string;
  time: string;
  width?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        display: "flex",
        gap: 12,
        padding: "13px 15px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow:
          "0 18px 40px -12px rgba(20,18,14,0.30), 0 2px 6px rgba(20,18,14,0.08)",
        fontFamily: FONT,
        ...style,
      }}
    >
      <Img
        src={staticFile(icon)}
        style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#1c1a17",
              letterSpacing: "-0.01em",
            }}
          >
            {sender}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              color: "#9a948a",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {app}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: MONO,
              fontSize: 10.5,
              color: "#b3ada3",
            }}
          >
            {time}
          </span>
        </div>
        <div
          style={{
            marginTop: 3,
            fontSize: 13,
            lineHeight: 1.35,
            color: "#54504a",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
