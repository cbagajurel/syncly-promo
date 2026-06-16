import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F, LOGO } from "./theme";
import { CHAPTER } from "./tokens";

/* ─────────────────────────────────────────────────────────────────────────
   AdThumbnail — a clean, editorial poster still (not a clickbait thumbnail).
   The converging-hub is the single focal image: every platform syncs into one
   Syncly inbox. Frame-independent (renders identically at any frame) so the
   still is deterministic. 1920×1080.
   ───────────────────────────────────────────────────────────────────────── */

// Geometry + styling matched to the film's SyncHub (radius 300, node corners 26,
// a single breathing ring, no labels — "no noise"), but in the ad's indigo accent.
const CH = CHAPTER.hero;
const CENTER = { x: 960, y: 440 };
const RADIUS_RING = 300;

const NODES = [
  { icon: "instagram.png", angle: -90 },
  { icon: "facebook.png", angle: -26 },
  { icon: "whatsapp.png", angle: 38 },
  { icon: "tik-tok.png", angle: 142 },
  { icon: "linkedin.png", angle: 218 },
];

const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: CENTER.x + Math.cos(a) * r, y: CENTER.y + Math.sin(a) * r };
};

export function AdThumbnail() {
  return (
    <AbsoluteFill style={{ background: C.BG, fontFamily: F.display }}>
      {/* ambient accent glow behind the hub */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 620px at 50% 40%, ${CH.soft}, transparent 70%)`,
        }}
      />
      {/* faint top vignette for editorial depth */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5), transparent 22%, transparent 78%, rgba(12,15,26,0.03))",
        }}
      />

      {/* brand lockup — top left */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 78,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Img src={LOGO} style={{ width: 56, height: 56, borderRadius: 14 }} />
        <span
          style={{
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: C.INK,
          }}
        >
          Syncly
        </span>
      </div>

      {/* eyebrow — top right */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 96,
          fontFamily: F.mono,
          fontSize: 17,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: C.INK_3,
        }}
      >
        Social, synced
      </div>

      {/* connectors */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {NODES.map((n) => {
          const p = polar(n.angle, RADIUS_RING);
          const mx = p.x + (CENTER.x - p.x) * 0.5;
          const my = p.y + (CENTER.y - p.y) * 0.5;
          return (
            <g key={n.icon}>
              <line
                x1={p.x}
                y1={p.y}
                x2={CENTER.x}
                y2={CENTER.y}
                stroke={C.HAIRLINE}
                strokeWidth={1.5}
              />
              <circle cx={mx} cy={my} r={4} fill={CH.accent} opacity={0.7} />
            </g>
          );
        })}
      </svg>

      {/* platform nodes (SyncHub styling: 96px, radius 26, no labels) */}
      {NODES.map((n) => {
        const p = polar(n.angle, RADIUS_RING);
        const size = 96;
        return (
          <div
            key={n.icon}
            style={{
              position: "absolute",
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              borderRadius: 26,
              background: C.SURFACE,
              border: `1px solid ${C.HAIRLINE}`,
              boxShadow: "0 18px 40px -22px rgba(15,18,26,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile(n.icon)}
              style={{ width: size * 0.56, height: size * 0.56, objectFit: "contain" }}
            />
          </div>
        );
      })}

      {/* central hub — Syncly mark with a single breathing ring */}
      <div
        style={{
          position: "absolute",
          left: CENTER.x - 84,
          top: CENTER.y - 84,
          width: 168,
          height: 168,
          borderRadius: 44,
          background: C.SURFACE,
          border: `1px solid ${C.HAIRLINE}`,
          boxShadow: "0 40px 80px -28px rgba(15,18,26,0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img src={LOGO} style={{ width: 96, height: 96, borderRadius: 22 }} />
        <span
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 52,
            border: `1.5px solid ${CH.accent}`,
            opacity: 0.3,
          }}
        />
      </div>

      {/* headline + url — bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 96,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            color: C.INK,
            textAlign: "center",
          }}
        >
          All your social,{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${C.PRIMARY}, ${C.PRIMARY_2})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            in one place.
          </span>
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 22,
            letterSpacing: "0.18em",
            color: CH.deep,
          }}
        >
          trysyncly.com
        </div>
      </div>
    </AbsoluteFill>
  );
}
