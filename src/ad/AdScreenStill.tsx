import { AbsoluteFill } from "remotion";
import { DashboardChrome } from "../screens/DashboardChrome";
import { DashOverview } from "../screens/DashOverview";
import { CHAPTER, skinCss } from "./tokens";

/* The overview dashboard re-skinned to the premium palette, rendered to PNG
   (via `remotion still`) for the MacBook cameo's screen texture — so the device
   shows the same blue-violet product as the rest of the ad. Separate from the
   film's screens/*.png so SynclyFilm stays untouched. */
export function AdScreenStill() {
  return (
    <AbsoluteFill id="adscreen" className="dash-root dash-light" style={{ background: "#fff" }}>
      <style>{skinCss("adscreen", CHAPTER.hero)}</style>
      <DashboardChrome view="dashboard">
        <DashOverview />
      </DashboardChrome>
    </AbsoluteFill>
  );
}
