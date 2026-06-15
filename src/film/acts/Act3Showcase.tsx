import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Easing } from "remotion";
import { EASE } from "../../constants";
import { DashboardChrome } from "../../screens/DashboardChrome";
import { DashInbox } from "../../screens/DashInbox";
import { DashOverview } from "../../screens/DashOverview";
import { DashAnalytics } from "../../screens/DashAnalytics";
import { FloatingPanel } from "../components/FloatingPanel";
import { Eyebrow, Line } from "../components/Caption";
import { ACT, L } from "../theme";

const DUR = ACT.A3_SHOWCASE;
const OUT = Easing.bezier(EASE.OUT[0], EASE.OUT[1], EASE.OUT[2], EASE.OUT[3]);

function eased(frame: number, a: number, b: number, from: number, to: number) {
  return interpolate(frame, [a, b], [from, to], {
    easing: OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Act 3 — software, presented the Apple way. We arrive "inside" the display
 * (a match-cut scale settle), then real Syncly panels float in with layered
 * depth and gentle parallax. No feature labels — just the product, breathing.
 */
export function Act3Showcase() {
  const frame = useCurrentFrame();

  // whole stage: match-cut settle, then a slow continuous push-in
  const stageScale = interpolate(frame, [0, 40, DUR], [1.07, 1.0, 1.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // shared slow vertical drift (parallax base)
  const drift = interpolate(frame, [0, DUR], [0, -26]);

  // hero (inbox) settles immediately; side panels rise in, staggered
  const heroOp = eased(frame, 0, 18, 0, 1);
  const leftOp = eased(frame, 22, 50, 0, 1);
  const rightOp = eased(frame, 34, 62, 0, 1);
  const leftIn = eased(frame, 22, 60, 60, 0); // slides inward
  const rightIn = eased(frame, 34, 72, 60, 0);

  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      {/* faint studio wash */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 60% at 50% 38%, rgba(10,10,10,0.018) 0%, transparent 60%)",
        }}
      />

      {/* caption */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 96 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <Eyebrow delay={6}>Everything in one place</Eyebrow>
          <Line delay={12} size={58} weight={500}>
            The modern command center.
          </Line>
        </div>
      </AbsoluteFill>

      {/* floating panels */}
      <AbsoluteFill
        style={{ transform: `scale(${stageScale})`, transformOrigin: "50% 58%" }}
      >
        {/* left — Overview, set back */}
        <FloatingPanel
          width={720}
          chrome
          z={300}
          opacity={leftOp * 0.96}
          tx={-leftIn}
          ty={drift * 0.6}
          rotate={-1.2}
          style={{ left: 96, top: 470 }}
        >
          <DashboardChrome view="dashboard">
            <DashOverview />
          </DashboardChrome>
        </FloatingPanel>

        {/* right — Analytics, set back */}
        <FloatingPanel
          width={720}
          chrome
          z={300}
          opacity={rightOp * 0.96}
          tx={rightIn}
          ty={drift * 0.6}
          rotate={1.2}
          style={{ right: 96, left: "auto", top: 500 }}
        >
          <DashboardChrome view="analytics">
            <DashAnalytics />
          </DashboardChrome>
        </FloatingPanel>

        {/* hero — Inbox, front and centre */}
        <FloatingPanel
          width={1180}
          chrome
          z={0}
          opacity={heroOp}
          ty={drift}
          style={{ left: 370, top: 360 }}
        >
          <DashboardChrome view="inbox">
            <DashInbox />
          </DashboardChrome>
        </FloatingPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
