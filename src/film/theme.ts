import { staticFile } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

/* ─────────────────────────────────────────────────────────────────────────
   SynclyFilm — an Apple-style, light-theme product film.
   Calm white studio, a photoreal MacBook hero, minimal typography.
   This module owns the LIGHT palette, type scale, font load (incl. weight 300)
   and act timing. Easings/springs/kf are reused from ../constants + ../anim.
   ───────────────────────────────────────────────────────────────────────── */

// Geist (SF-Pro-adjacent). Load the thin 300 weight for the Apple-calm look.
const { fontFamily: geist } = loadGeist("normal", {
  subsets: ["latin"],
  weights: ["300", "400", "500", "600"],
});
const { fontFamily: geistMono } = loadGeistMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500"],
});

export const F = {
  display: `${geist}, system-ui, -apple-system, sans-serif`,
  mono: `${geistMono}, ui-monospace, monospace`,
} as const;

// ── Light palette ─────────────────────────────────────────────────────────
export const L = {
  WHITE: "#FFFFFF",
  SURFACE: "#F7F8FA",
  SURFACE_2: "#EEF0F4",
  INK: "#0A0A0A",
  INK_2: "#6E6E73", // muted secondary
  INK_3: "#A4A4AC", // faint tertiary
  HAIRLINE: "rgba(10,10,10,0.08)",
  HAIRLINE_2: "rgba(10,10,10,0.04)",
  // Syncly emerald — a whisper, never a wash. ≈ oklch(0.6 0.16 145).
  ACCENT: "#13A66A",
  ACCENT_DEEP: "#0E8554",
  ACCENT_SOFT: "rgba(19,166,106,0.10)",
} as const;

// 3D stage literals (WebGL can't read CSS vars). A bright softbox studio.
export const STAGE_L = {
  BG: "#FFFFFF",
  FLOOR: "#EEF0F4",
  ALU: "#dfe2e7", // silver-white anodized aluminium
  ALU_DARK: "#b7bcc4",
  KEY: "#fff7ee", // warm key
  FILL: "#e6ecf6", // cool fill
  TOP: "#ffffff", // broad soft top
} as const;

// Royalty-free track already in public/.
export const MUSIC = staticFile("music.mp3");

// ── Timing ──────────────────────────────────────────────────────────────
export const FPS = 30;
const S = (sec: number) => Math.round(FPS * sec);

// Cross-dissolve between acts. TransitionSeries overlaps consume these frames.
export const XFADE = 14;
const N_TRANSITIONS = 4;

// Five acts (raw durations, before overlap). Net ≈ 1350f ≈ 45s.
export const ACT = {
  A1_REVEAL: S(8.67), // 260
  A2_PRODUCT: S(11.33), // 340
  A3_SHOWCASE: S(11.33), // 340
  A4_STORY: S(9.33), // 280
  A5_HERO: S(6.2), // 186
} as const;

export const TOTAL =
  Object.values(ACT).reduce((a, b) => a + b, 0) - N_TRANSITIONS * XFADE;

// Screen-texture / UI still dimensions (16:10, MacBook-accurate).
export const SCREEN_W = 1920;
export const SCREEN_H = 1200;
