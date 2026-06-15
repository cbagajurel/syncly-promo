import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SyncHub } from "../components/SyncHub";
import { Beat, Caption } from "../components/Caption";
import { ACT, L } from "../theme";

const DUR = ACT.A4_STORY;

/**
 * Act 4 — feature storytelling told purely in motion: every channel flows into
 * one calm hub. No labels on the diagram; two quiet lines carry the meaning.
 */
export function Act4Story() {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, DUR], [1.0, 1.03]);

  return (
    <AbsoluteFill style={{ background: L.WHITE }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 55% at 50% 44%, rgba(10,10,10,0.02) 0%, transparent 62%)",
        }}
      />

      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 48%" }}>
        <SyncHub delay={4} />
      </AbsoluteFill>

      <Sequence from={92} durationInFrames={104} layout="none">
        <Beat dur={104}>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 116 }}>
            <Caption lead="Every channel." emphasis="Perfectly synchronized." size={56} />
          </AbsoluteFill>
        </Beat>
      </Sequence>

      <Sequence from={198} durationInFrames={DUR - 198} layout="none">
        <Beat dur={DUR - 198}>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 116 }}>
            <Caption lead="Move faster." emphasis="Without the chaos." size={56} />
          </AbsoluteFill>
        </Beat>
      </Sequence>
    </AbsoluteFill>
  );
}
