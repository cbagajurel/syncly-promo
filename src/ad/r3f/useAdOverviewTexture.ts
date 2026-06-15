import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import * as THREE from "three";
import { C } from "../theme";

/* Loads the premium-skinned overview PNG for the MacBook cameo screen. Mirrors
   the film's useScreenTexture but bound to the ad's own asset. Falls back to a
   clean blue surface until the PNG is rendered. */
function orient(tex: THREE.Texture) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.flipY = true;
  tex.needsUpdate = true;
}

function makeFallback(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1920;
  c.height = 1200;
  const x = c.getContext("2d")!;
  x.fillStyle = "#FFFFFF";
  x.fillRect(0, 0, 1920, 1200);
  x.fillStyle = "#FBFCFE";
  x.fillRect(0, 0, 360, 1200);
  x.fillStyle = C.PRIMARY;
  x.beginPath();
  x.arc(70, 70, 16, 0, Math.PI * 2);
  x.fill();
  const tex = new THREE.CanvasTexture(c);
  orient(tex);
  return tex;
}

export function useAdOverviewTexture(): THREE.Texture {
  const fallback = useMemo(makeFallback, []);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const handle = delayRender("ad-overview-texture");
    let cancelled = false;
    new THREE.TextureLoader().load(
      staticFile("screens/overview-ad.png"),
      (t) => {
        if (cancelled) return;
        orient(t);
        setTex(t);
        continueRender(handle);
      },
      undefined,
      () => {
        if (!cancelled) continueRender(handle);
      },
    );
    return () => {
      cancelled = true;
      continueRender(handle);
    };
  }, []);

  return tex ?? fallback;
}
