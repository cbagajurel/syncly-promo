import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../constants";

/**
 * The cinematic studio backdrop — replaces the old 3D particle/shape stage.
 * A soft directional light pool + radial vignette + faint static film grain.
 * No particles, no drifting geometry, no neon. `tone` switches dark↔paper.
 */
export function SceneBackdrop({
  tone = "dark",
  spotX = 50,
  spotY = 38,
}: {
  tone?: "dark" | "paper";
  spotX?: number;
  spotY?: number;
}) {
  const dark = tone === "dark";
  const base = dark ? C.INK : C.PAPER;
  const pool = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.035)";
  const vignette = dark ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.10)";

  return (
    <AbsoluteFill style={{ background: base }}>
      {/* soft top-down light pool */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(80% 60% at ${spotX}% ${spotY}%, ${pool} 0%, transparent 60%)`,
        }}
      />
      {/* vignette for depth */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 100% at 50% 45%, transparent 48%, ${vignette} 100%)`,
        }}
      />
      <Grain opacity={dark ? 0.05 : 0.03} />
    </AbsoluteFill>
  );
}

/** Faint static-ish film grain via a tiny SVG turbulence tile. Frame-stepped
 *  every few frames so it shimmers subtly without reading as noise/particles. */
function Grain({ opacity }: { opacity: number }) {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 4) % 5; // step slowly, deterministic
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
    <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${seed}'/></filter>
    <rect width='180' height='180' filter='url(#n)'/>
  </svg>`;
  const uri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${uri}")`,
        backgroundSize: "180px 180px",
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
}
