import type { CSSProperties, ReactNode } from "react";
import { MONO } from "../constants";

/**
 * A macOS-style browser window that holds a full-resolution UI screen.
 * Same crisp down-scale approach as <MacBook/>: child renders at 1920×1080,
 * the content plane is scaled to `width`. Traffic lights + URL pill chrome.
 */
export function BrowserWindow({
  children,
  width = 1280,
  url = "app.trysyncly.com",
  style,
}: {
  children: ReactNode;
  width?: number;
  url?: string;
  style?: CSSProperties;
}) {
  const w = width;
  const bodyH = Math.round((w * 1080) / 1920);
  const barH = Math.max(34, Math.round(w * 0.034));
  const radius = Math.round(w * 0.012);
  const dot = Math.round(barH * 0.28);

  return (
    <div
      style={{
        width: w,
        borderRadius: radius,
        overflow: "hidden",
        background: "#fff",
        boxShadow:
          "0 50px 90px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
        ...style,
      }}
    >
      {/* title bar */}
      <div
        style={{
          height: barH,
          display: "flex",
          alignItems: "center",
          gap: dot,
          paddingLeft: Math.round(barH * 0.5),
          paddingRight: Math.round(barH * 0.5),
          background:
            "linear-gradient(180deg, #f5f5f4 0%, #ececea 100%)",
          borderBottom: "1px solid #e3e1db",
        }}
      >
        <span style={{ display: "flex", gap: Math.round(dot * 0.55) }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{
                width: dot,
                height: dot,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </span>
        <span
          style={{
            marginLeft: Math.round(barH * 0.4),
            flex: 1,
            maxWidth: "62%",
            height: Math.round(barH * 0.6),
            borderRadius: 999,
            background: "#fff",
            border: "1px solid #e3e1db",
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: Math.round(barH * 0.42),
            fontFamily: MONO,
            fontSize: Math.round(barH * 0.34),
            color: "#8a857c",
          }}
        >
          <span
            style={{
              width: Math.round(barH * 0.3),
              height: Math.round(barH * 0.3),
              borderRadius: 3,
              border: "1.5px solid #b7b2a8",
            }}
          />
          {url}
        </span>
      </div>

      {/* body */}
      <div style={{ position: "relative", width: w, height: bodyH, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            transform: `scale(${w / 1920})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
