import type { CSSProperties, ReactNode } from "react";

/**
 * A composited 2D MacBook frame that holds a full-resolution UI screen.
 * The child renders at native 1920×1080 then the screen plane is *down*-scaled
 * to `screenWidth`, so the UI stays crisp (no texture sampling, no upscaling).
 *
 * Front-ish industrial look: anodized lid with a thin bezel + camera dot, a
 * slim aluminium base deck with the centre finger-groove, and a soft grounded
 * shadow. No moving glare — a single static screen sheen only.
 */
export function MacBook({
  children,
  screenWidth = 1180,
  reflection = true,
  style,
}: {
  children: ReactNode;
  screenWidth?: number;
  reflection?: boolean;
  style?: CSSProperties;
}) {
  const sw = screenWidth;
  const sh = Math.round((sw * 1080) / 1920);
  const bezel = Math.max(8, Math.round(sw * 0.011));
  const radius = Math.round(sw * 0.018);
  const baseH = Math.max(10, Math.round(sw * 0.018));
  const baseW = sw + bezel * 2 + Math.round(sw * 0.06);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        filter: "drop-shadow(0 60px 90px rgba(0,0,0,0.55))",
        ...style,
      }}
    >
      {/* Lid / screen assembly */}
      <div
        style={{
          position: "relative",
          padding: bezel,
          paddingTop: bezel + Math.round(bezel * 0.4),
          background:
            "linear-gradient(180deg, #2b2d31 0%, #1b1c1f 60%, #121315 100%)",
          borderRadius: radius + bezel,
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* camera dot */}
        <span
          style={{
            position: "absolute",
            top: bezel * 0.55,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#0c0d0f",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
          }}
        />
        {/* screen */}
        <div
          style={{
            position: "relative",
            width: sw,
            height: sh,
            borderRadius: radius,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
          }}
        >
          {/* native-res UI, down-scaled to fit the screen */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1920,
              height: 1080,
              transform: `scale(${sw / 1920})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
          {/* static screen sheen (not a moving glare) */}
          {reflection && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 22%)",
              }}
            />
          )}
        </div>
      </div>

      {/* Base deck */}
      <div
        style={{
          position: "relative",
          width: baseW,
          height: baseH,
          marginTop: -1,
          background:
            "linear-gradient(180deg, #d7dade 0%, #b7bbc0 35%, #8c9095 100%)",
          borderBottomLeftRadius: baseH,
          borderBottomRightRadius: baseH,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.35)",
        }}
      >
        {/* finger groove */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.round(sw * 0.14),
            height: Math.round(baseH * 0.42),
            background:
              "linear-gradient(180deg, #6c7075 0%, #9a9ea3 100%)",
            borderBottomLeftRadius: baseH,
            borderBottomRightRadius: baseH,
          }}
        />
      </div>
    </div>
  );
}
