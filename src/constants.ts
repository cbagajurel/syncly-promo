import { staticFile } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Geist for display + body (the SF-Pro-adjacent, Vercel/Linear look),
// GeistMono for eyebrows / labels / timestamps, Inter as a fallback face.
const { fontFamily: _geist } = loadGeist("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});
const { fontFamily: _geistMono } = loadGeistMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500"],
});
const { fontFamily: _inter } = loadInter("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600"],
});

// Headlines + body share the Geist stack; Inter as graceful fallback.
export const FONT = `${_geist}, ${_inter}, system-ui, sans-serif`;
export const DISPLAY = `${_geist}, ${_inter}, system-ui, sans-serif`;
export const MONO = `${_geistMono}, ui-monospace, monospace`;

// ── Palette ───────────────────────────────────────────────────────────
// Cinematic studio neutrals. Emerald is demoted to a small accent only —
// never a scene-wide glow.
export const C = {
  // Light scenes (problem / solution backdrops)
  PAPER: "#FAFAF9",
  PAPER_FG: "#1C1A17",
  PAPER_FG2: "#6F6A62",
  PAPER_BORDER: "#E7E4DD",
  // Dark cinematic scenes
  INK: "#0A0A0B",
  INK_2: "#121214",
  WHITE: "#F4F5F4",
  MUTED: "rgba(244,245,244,0.58)",
  FAINT: "rgba(244,245,244,0.40)",
  HAIRLINE: "rgba(244,245,244,0.10)",
  // Accent — used sparingly (underline, active dot, CTA, key numbers)
  ACCENT: "#34d399",
  ACCENT_DEEP: "#0e9f6e",
} as const;

// 3D stage colours (literals — WebGL can't read CSS vars). Neutral studio.
export const STAGE = {
  BG: "#0A0A0B",
  FLOOR: "#0E0E10",
  ALU: "#c5c9cf", // brushed aluminium body (lit by key/rim, low metalness)
  ALU_DARK: "#9aa0a8",
  KEY: "#fff6ea", // warm-neutral key light
  RIM: "#cfd6e6", // cool rim
  ACCENT: "#34d399",
  PLATFORM: {
    instagram: "#e1568a",
    facebook: "#4a7cf0",
    whatsapp: "#3fbf7f",
    messenger: "#8b5cf6",
  },
} as const;

// Royalty-free track served from public/.
export const MUSIC_URL = staticFile("music.mp3");

// ── Timing ────────────────────────────────────────────────────────────
export const FPS = 30;
const S = (sec: number) => Math.round(FPS * sec);

// Snappy ad easings (CSS cubic-bezier equivalents).
export const EASE = {
  OUT: [0.16, 1, 0.3, 1] as const, // crisp decel entrance
  INOUT: [0.45, 0, 0.55, 1] as const, // editorial
  POP: [0.34, 1.56, 0.64, 1] as const, // playful overshoot (incidental only)
  IN: [0.5, 0, 0.75, 0] as const, // accelerate-away exit
} as const;

// Internal beats of the Features scene (sum === DUR.FEATURES).
export const FEAT = {
  inbox: S(3.6),
  compose: S(3.2),
  schedule: S(3.0),
  analytics: S(3.4),
  knowledge: S(2.8),
} as const;

const FEAT_TOTAL = Object.values(FEAT).reduce((a, b) => a + b, 0);

export const DUR = {
  HOOK: S(4.0),
  PROBLEM: S(4.0),
  SOLUTION: S(4.5),
  FEATURES: FEAT_TOTAL,
  SHOWCASE: S(4.5),
  ECOSYSTEM: S(4.0),
  TRUST: S(3.5),
  CTA: S(3.5),
} as const;

// Cross-fade length between scenes (frames). TransitionSeries overlaps these.
export const XFADE = 8;
const N_TRANSITIONS = 7;

export const TOTAL_FRAMES =
  Object.values(DUR).reduce((a, b) => a + b, 0) - N_TRANSITIONS * XFADE;

// Spring presets (kept for incidental motion).
export const SPRING = {
  SNAPPY: { damping: 26, stiffness: 200, mass: 0.7 },
  SMOOTH: { damping: 22, stiffness: 140, mass: 0.85 },
  HEAVY: { damping: 18, stiffness: 100, mass: 1.2 },
  BOUNCY: { damping: 14, stiffness: 120, mass: 0.9 },
} as const;
