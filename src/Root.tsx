import "./styles/index.css";
import { Composition } from "remotion";
import { SynclyPromo } from "./Composition";
import { FPS, TOTAL_FRAMES } from "./constants";
import { SynclyAd } from "./ad/SynclyAd";
import { AdScreenStill } from "./ad/AdScreenStill";
import { AdThumbnail } from "./ad/AdThumbnail";
import {
  FPS as AD_FPS,
  TOTAL as AD_TOTAL,
  CANVAS as AD_CANVAS,
} from "./ad/theme";
import { SynclyFilm } from "./film/SynclyFilm";
import { ScreenStill, type ScreenKind } from "./film/ScreenStills";
import {
  FPS as FILM_FPS,
  TOTAL as FILM_TOTAL,
  SCREEN_W,
  SCREEN_H,
} from "./film/theme";

const SCREEN_KINDS: ScreenKind[] = [
  "overview",
  "inbox",
  "compose",
  "analytics",
];

export const Root = () => {
  return (
    <>
      {/* Software-first product commercial — the dashboard is the hero */}
      <Composition
        id="SynclyAd"
        component={SynclyAd}
        durationInFrames={AD_TOTAL}
        fps={AD_FPS}
        width={AD_CANVAS.W}
        height={AD_CANVAS.H}
      />

      {/* Clean editorial poster still → out/ad-thumbnail.png */}
      <Composition
        id="AdThumbnail"
        component={AdThumbnail}
        durationInFrames={1}
        fps={AD_FPS}
        width={AD_CANVAS.W}
        height={AD_CANVAS.H}
      />

      {/* Premium-skinned overview → public/screens/overview-ad.png (cameo texture) */}
      <Composition
        id="AdScreen-overview"
        component={AdScreenStill}
        durationInFrames={120}
        fps={AD_FPS}
        width={1920}
        height={1200}
      />

      {/* Apple-style light product film */}
      <Composition
        id="SynclyFilm"
        component={SynclyFilm}
        durationInFrames={FILM_TOTAL}
        fps={FILM_FPS}
        width={1920}
        height={1080}
      />

      {/* Real Syncly UI → rendered to public/screens/*.png as 3D textures.
          Short comps so the still can be grabbed at a settled frame (90). */}
      {SCREEN_KINDS.map((kind) => (
        <Composition
          key={kind}
          id={`Screen-${kind}`}
          component={ScreenStill}
          durationInFrames={260}
          fps={FILM_FPS}
          width={SCREEN_W}
          height={SCREEN_H}
          defaultProps={{ kind }}
        />
      ))}

      {/* Original dark narrative promo (kept intact) */}
      <Composition
        id="SynclyPromo"
        component={SynclyPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
