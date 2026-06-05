import { Composition } from "remotion";
import { SynclyPromo } from "./Composition";
import { FPS, TOTAL_FRAMES } from "./constants";

export const Root = () => {
  return (
    <Composition
      id="SynclyPromo"
      component={SynclyPromo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
