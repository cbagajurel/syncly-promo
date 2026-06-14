import { staticFile } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: _sans } = loadSans("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});
const { fontFamily: _serif } = loadSerif("normal", {
  subsets: ["latin"],
  weights: ["400"],
});
const { fontFamily: _mono } = loadMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500"],
});

export const FONT = _sans;
export const DISPLAY = _serif;
export const MONO = _mono;

// ── Palette ───────────────────────────────────────────────────────────
// Light UI tokens (panels) + the dark cinematic 3D stage.
export const C = {
  BG0: "#FCFCFB",
  FG0: "#1C1A17",
  FG2: "#6F6A62",
  BORDER: "#E4E1DA",
  ACCENT: "oklch(0.6 0.16 145)",
  ACCENT_FG: "#FFFFFF",
  INSTAGRAM: "oklch(0.62 0.13 20)",
  FACEBOOK: "oklch(0.55 0.13 255)",
  WHATSAPP: "oklch(0.62 0.13 150)",
} as const;

// 3D stage colours (literals — WebGL can't read CSS vars).
export const STAGE = {
  BG: "#080a0f",
  FOG: "#080a0f",
  EMERALD: "#34d399",
  EMERALD_DEEP: "#0e9f6e",
  GLASS: "#cfe8df",
  PLATFORM: {
    instagram: "#e1568a",
    facebook: "#4a7cf0",
    whatsapp: "#3fbf7f",
    messenger: "#8b5cf6",
  },
} as const;

// Royalty-free track served from public/ (avoids Studio CORS on remote audio).
// Swap public/music.mp3 to change it. Source: SoundHelix (free to use).
export const MUSIC_URL = staticFile("music.mp3");

// ── Timing ────────────────────────────────────────────────────────────
export const FPS = 30;
const S = (sec: number) => Math.round(FPS * sec);

// Snappy ad easings (CSS cubic-bezier equivalents).
export const EASE = {
  OUT: [0.16, 1, 0.3, 1] as const, // crisp decel entrance
  INOUT: [0.45, 0, 0.55, 1] as const, // editorial
  POP: [0.34, 1.56, 0.64, 1] as const, // playful overshoot
  IN: [0.5, 0, 0.75, 0] as const, // accelerate-away exit
} as const;

// Internal beats of the product tour (sum === DUR.TOUR).
export const TOUR = {
  overview: S(2),
  inbox: S(5),
  compose: S(4.5),
  schedule: S(3),
  analytics: S(4),
  posts: S(2),
  settings: S(2),
} as const;

const TOUR_TOTAL = Object.values(TOUR).reduce((a, b) => a + b, 0);

export const DUR = {
  HOOK: S(4.5),
  UNIFY: S(4),
  TOUR: TOUR_TOTAL,
  OUTCOME: S(3.5),
  CTA: S(4.5),
} as const;

// Cross-fade length between scenes (frames). TransitionSeries overlaps these.
export const XFADE = 10;
const N_TRANSITIONS = 4;

export const TOTAL_FRAMES =
  Object.values(DUR).reduce((a, b) => a + b, 0) - N_TRANSITIONS * XFADE;

// Spring presets (kept for incidental motion).
export const SPRING = {
  SNAPPY: { damping: 26, stiffness: 200, mass: 0.7 },
  SMOOTH: { damping: 22, stiffness: 140, mass: 0.85 },
  HEAVY: { damping: 18, stiffness: 100, mass: 1.2 },
  BOUNCY: { damping: 14, stiffness: 120, mass: 0.9 },
} as const;
