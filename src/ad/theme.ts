import { staticFile } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

/* ─────────────────────────────────────────────────────────────────────────
   SynclyAd — a software-first, light-editorial product commercial.
   The dashboard UI is the hero; the device is a cameo. This module owns the
   ad's light palette, type scale, font load and scene timing. Easings/springs
   are reused from ../constants.
   ───────────────────────────────────────────────────────────────────────── */

const { fontFamily: geist } = loadGeist("normal", {
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700"],
});
const { fontFamily: geistMono } = loadGeistMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500"],
});

export const F = {
  display: `${geist}, system-ui, -apple-system, sans-serif`,
  mono: `${geistMono}, ui-monospace, monospace`,
} as const;

// ── Premium light palette (Linear / Stripe / Raycast grade) ─────────────────
export const C = {
  BG: "#F7F8FB", // soft cool off-white
  SURFACE: "#FFFFFF",
  SURFACE_2: "#F1F3F8",
  INK: "#0C0F1A", // deep slate
  INK_2: "#5A6173",
  INK_3: "#99A0B0",
  HAIRLINE: "rgba(12,15,26,0.08)",
  HAIRLINE_2: "rgba(12,15,26,0.045)",
  // Primary blue-violet (gradient pair PRIMARY → PRIMARY_2).
  ACCENT: "#6366F1",
  ACCENT_DEEP: "#4F46E5",
  ACCENT_SOFT: "rgba(99,102,241,0.10)",
  PRIMARY: "#6366F1",
  PRIMARY_2: "#8B5CF6",
  PRIMARY_DEEP: "#4F46E5",
} as const;

export const PLATFORM = {
  instagram: "#E1568A",
  facebook: "#4A7CF0",
  whatsapp: "#25D366",
  linkedin: "#2D6CC0",
  messenger: "#8B5CF6",
  tiktok: "#111111",
} as const;

// 3D stage literals (WebGL can't read CSS vars). A bright editorial softbox.
export const STAGE = {
  BG: "#F7F8FB",
  KEY: "#fff7ee",
  FILL: "#e9ecfb",
  TOP: "#ffffff",
  ALU: "#dfe2e7",
} as const;

export const MUSIC = staticFile("music.mp3");
export const LOGO = staticFile("syncly.png");

export const PLATFORM_ASSET: Record<string, string> = {
  instagram: staticFile("instagram.png"),
  facebook: staticFile("facebook.png"),
  whatsapp: staticFile("whatsapp.png"),
  tiktok: staticFile("tik-tok.png"),
  linkedin: staticFile("linkedin.png"),
};

// ── Timing ──────────────────────────────────────────────────────────────
export const FPS = 30;
const S = (sec: number) => Math.round(FPS * sec);

// Premium fast transitions. TransitionSeries overlaps consume these frames.
export const XFADE = 9;
const N_TRANSITIONS = 5;

export const ACT = {
  S1_CHAOS: S(5.0), // 150
  S2_UNIFY: S(7.3), // 219
  S3_PUBLISH: S(8.3), // 249
  S4_INSIGHTS: S(9.5), // 285
  S5_TEAM: S(9.5), // 285
  S6_HERO: S(5.5), // 165
} as const;

export const TOTAL =
  Object.values(ACT).reduce((a, b) => a + b, 0) - N_TRANSITIONS * XFADE;

export const CANVAS = { W: 1920, H: 1080 } as const;
