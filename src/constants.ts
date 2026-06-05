import { loadFont } from "@remotion/google-fonts/Geist";
import { loadFont as loadFontMono } from "@remotion/google-fonts/GeistMono";

const { fontFamily: _sans } = loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});

const { fontFamily: _mono } = loadFontMono("normal", {
  subsets: ["latin"],
  weights: ["400", "500"],
});

export const FONT = _sans;
export const MONO = _mono;

// Exact design tokens extracted from Syncly's base.css
export const C = {
  // Surfaces
  BG0: "#F8FAFC",
  BG1: "#FFFFFF",
  BG2: "#F1F5F9",

  // Text
  FG0: "#0B1220",
  FG1: "#334155",
  FG2: "#64748B",
  FG3: "#94A3B8",

  // Borders
  BORDER0: "#E5E9F0",
  BORDER1: "#DDE3EC",

  // Elevation
  SHADOW_SM: "0 1px 2px rgba(15,23,42,0.04)",
  SHADOW_MD:
    "0 4px 24px -8px rgba(15,23,42,0.10), 0 1px 2px rgba(15,23,42,0.04)",
  SHADOW_LG:
    "0 24px 60px -20px rgba(15,23,42,0.18), 0 2px 6px rgba(15,23,42,0.06)",

  // Accent — muted teal (exact from app)
  ACCENT: "oklch(0.62 0.08 200)",
  ACCENT_INK: "oklch(0.42 0.08 200)",
  ACCENT_SOFT: "oklch(0.96 0.025 200)",

  // Status
  OK: "oklch(0.62 0.08 150)",
  WARN: "oklch(0.72 0.10 75)",
  ERR: "oklch(0.60 0.13 25)",

  // Platform brand (exact from app)
  INSTAGRAM: "oklch(0.62 0.13 20)",
  FACEBOOK: "oklch(0.55 0.13 255)",
  WHATSAPP: "oklch(0.62 0.13 150)",
} as const;

export const FPS = 30;
export const TOTAL_FRAMES = FPS * 45; // 45s

export const SCENE = {
  HOOK:     { from: FPS * 0,  dur: FPS * 7  },
  PAIN:     { from: FPS * 7,  dur: FPS * 6  },
  REVEAL:   { from: FPS * 13, dur: FPS * 4  },
  FEATURES: { from: FPS * 17, dur: FPS * 18 },
  OUTCOME:  { from: FPS * 35, dur: FPS * 5  },
  CTA:      { from: FPS * 40, dur: FPS * 5  },
} as const;

export const FADE = 12;

// Reusable spring presets
export const SPRING = {
  SNAPPY:  { damping: 26, stiffness: 200, mass: 0.7 },
  SMOOTH:  { damping: 22, stiffness: 140, mass: 0.85 },
  HEAVY:   { damping: 18, stiffness: 100, mass: 1.2 },
  BOUNCY:  { damping: 14, stiffness: 120, mass: 0.9 },
} as const;
