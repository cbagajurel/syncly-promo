import type { CSSProperties } from "react";
import { interpolate } from "remotion";

/* ─────────────────────────────────────────────────────────────────────────
   The ad's design system: one source of truth for spacing, radius, shadow,
   type, motion, the colour-coded feature chapters, the dashboard re-skin, and
   the looping-activity helpers that keep every scene alive (SyncHub-style).
   ───────────────────────────────────────────────────────────────────────── */

export const SPACE = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  8: 48,
  10: 64,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export const SHADOW = {
  card: "0 1px 2px rgba(12,15,26,0.04), 0 10px 30px -12px rgba(12,15,26,0.14)",
  float: "0 40px 90px -32px rgba(12,15,26,0.30)",
  lift: "0 20px 50px -24px rgba(12,15,26,0.26)",
} as const;

export const TYPE = {
  eyebrow: 17,
  captionSm: 80,
  caption: 92,
  captionLg: 132,
  kpi: 56,
} as const;

// ── Colour-coded feature chapters ──────────────────────────────────────────
export type Chapter = {
  accent: string;
  deep: string;
  soft: string;
  glow: string;
};

export const CHAPTER = {
  hero: { accent: "#6366F1", deep: "#4F46E5", soft: "rgba(99,102,241,0.12)", glow: "#8B5CF6" },
  messages: { accent: "#2563EB", deep: "#1D4ED8", soft: "rgba(37,99,235,0.12)", glow: "#3B82F6" },
  publish: { accent: "#7C3AED", deep: "#6D28D9", soft: "rgba(124,58,237,0.12)", glow: "#8B5CF6" },
  analytics: { accent: "#0891B2", deep: "#0E7490", soft: "rgba(8,145,178,0.12)", glow: "#22D3EE" },
  team: { accent: "#059669", deep: "#047857", soft: "rgba(5,150,105,0.12)", glow: "#10B981" },
} satisfies Record<string, Chapter>;

/**
 * The premium neutral base + chapter accent as a token map. Re-skins the real
 * dashboard with no edits to base.css or the screen components.
 */
function skinTokens(ch: Chapter): Record<string, string> {
  return {
    "--bg-0": "#F7F8FB",
    "--bg-1": "#FFFFFF",
    "--bg-2": "#F1F3F8",
    "--bg-3": "#E9ECF3",
    "--sidebar-bg": "#FBFCFE",
    "--fg-0": "#0C0F1A",
    "--fg-1": "#2A3142",
    "--fg-2": "#5A6173",
    "--fg-3": "#99A0B0",
    "--border-0": "rgba(12,15,26,0.08)",
    "--border-1": "rgba(12,15,26,0.13)",
    "--accent": ch.accent,
    "--accent-ink": ch.deep,
    "--accent-soft": ch.soft,
    "--accent-fg": "#FFFFFF",
    "--ok": "#10B981",
    "--chart-1": "#2563EB",
    "--chart-2": "#8B5CF6",
    "--chart-3": "#06B6D4",
    "--chart-4": "#10B981",
    "--chart-5": "#F59E0B",
  };
}

export function skinVars(ch: Chapter): CSSProperties {
  return skinTokens(ch) as CSSProperties;
}

/**
 * CSS text that forces the skin onto every `.dash-light` element inside a
 * scope. `DashboardChrome` re-declares these vars on its own `.dash-light`
 * node, so inheritance alone loses — we target that node directly (higher
 * specificity via the scope id) with `!important` to win the cascade.
 */
export function skinCss(scopeId: string, ch: Chapter): string {
  const decls = Object.entries(skinTokens(ch))
    .map(([k, v]) => `${k}: ${v} !important;`)
    .join("");
  return `#${scopeId}, #${scopeId} .dash-light { ${decls} }`;
}

// ── Looping activity helpers (the SyncHub "always working" feel) ────────────

/** 0→1 sawtooth over `period` frames (continuous loop). */
export const loop = (frame: number, period: number) =>
  (((frame % period) + period) % period) / period;

/** 0→1→0 breathing over `period` frames. */
export const pulse = (frame: number, period: number) =>
  0.5 - 0.5 * Math.cos((frame / period) * Math.PI * 2);

/**
 * Staged repeating event: returns 0→1 enter / hold / 0 exit progress for an
 * event that fires every `period` frames and animates for `dur`, plus the
 * occurrence index so callers can vary content per cycle.
 */
export function everyN(frame: number, period: number, dur = 20, offset = 0) {
  const t = frame - offset;
  const i = Math.floor(t / period);
  const local = t - i * period;
  const enter = interpolate(local, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(local, [period - dur, period], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { progress: Math.min(enter, exit), index: Math.max(0, i), local };
}
