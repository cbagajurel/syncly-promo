import { AbsoluteFill, useCurrentFrame } from "remotion";
import { kf } from "../../anim";
import { AdStage } from "../r3f/AdStage";
import { ChaosField } from "../r3f/ChaosField";
import { DepthGradient } from "../r3f/DepthGradient";
import { Toast } from "../live/Toast";
import { Caption } from "../ui/Caption";
import { C, PLATFORM } from "../theme";
import { CHAPTER } from "../tokens";

const FEED = [
  { dot: PLATFORM.instagram, title: "maya.rivera", channel: "Instagram", text: "is the linen dress back in stock? 🙏", delay: 6 },
  { dot: PLATFORM.facebook, title: "Daniel O.", channel: "Facebook", text: "do you ship to Spain?", delay: 24 },
  { dot: PLATFORM.whatsapp, title: "+1 (415) 22…", channel: "WhatsApp", text: "order #4821 — where is it?", delay: 44 },
  { dot: PLATFORM.messenger, title: "Priya Shah", channel: "Messenger", text: "loved the new collection!", delay: 66 },
  { dot: PLATFORM.linkedin, title: "Atlas Studio", channel: "LinkedIn", text: "can we collab next month?", delay: 88 },
];

export function S1Chaos() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: C.BG }}>
      <AbsoluteFill style={{ zIndex: 0 }}>
        <AdStage>
          <DepthGradient intensity={0.6} color={CHAPTER.hero.glow} />
          <ChaosField />
        </AdStage>
      </AbsoluteFill>

      <AbsoluteFill style={{ zIndex: 10 }}>
        {FEED.map((f, i) => {
          const t = kf(frame, [[f.delay, 0], [f.delay + 20, 1]]);
          return (
            <div key={f.title} style={{ position: "absolute", right: 150, top: 120 + i * 150 }}>
              <Toast t={t} dot={f.dot} title={f.title} channel={f.channel} text={f.text} accent={f.dot} />
            </div>
          );
        })}
      </AbsoluteFill>

      <Caption
        eyebrow="Every platform · Every message"
        eyebrowDelay={8}
        text="It's a lot to manage."
        textDelay={28}
        size={132}
        accent={C.PRIMARY}
        accentDeep={C.PRIMARY_2}
        accentWord="lot"
      />
    </AbsoluteFill>
  );
}
