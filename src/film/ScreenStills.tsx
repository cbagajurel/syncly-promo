import { AbsoluteFill } from "remotion";
import { DashboardChrome } from "../screens/DashboardChrome";
import { DashOverview } from "../screens/DashOverview";
import { DashInbox } from "../screens/DashInbox";
import { DashCompose } from "../screens/DashCompose";
import { DashAnalytics } from "../screens/DashAnalytics";

/* ─────────────────────────────────────────────────────────────────────────
   Real Syncly UI, rendered to PNG (via `remotion still`) so it can be mapped
   as a crisp texture onto the 3D MacBook screen — no hand-painted fake UI.
   Rendered at a late frame so all entrance reveals have settled.
   ───────────────────────────────────────────────────────────────────────── */

export type ScreenKind = "overview" | "inbox" | "compose" | "analytics";

const VIEW: Record<ScreenKind, "dashboard" | "inbox" | "compose" | "analytics"> =
  {
    overview: "dashboard",
    inbox: "inbox",
    compose: "compose",
    analytics: "analytics",
  };

function Body({ kind }: { kind: ScreenKind }) {
  if (kind === "inbox") return <DashInbox />;
  if (kind === "compose") return <DashCompose />;
  if (kind === "analytics") return <DashAnalytics />;
  return <DashOverview />;
}

export function ScreenStill({ kind }: { kind: ScreenKind }) {
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <DashboardChrome view={VIEW[kind]}>
        <Body kind={kind} />
      </DashboardChrome>
    </AbsoluteFill>
  );
}
