import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import * as THREE from "three";
import type { ScreenKind } from "../ScreenStills";
import { L } from "../theme";

/* Clean light fallback texture (used only until the real UI PNG has been
   rendered to public/screens/). Reads as a calm, blank Syncly surface. */
function makeFallback(): THREE.CanvasTexture {
  const W = 1920;
  const H = 1200;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = "#ffffff";
  x.fillRect(0, 0, W, H);
  x.fillStyle = L.SURFACE;
  x.fillRect(0, 0, 360, H);
  x.fillStyle = L.ACCENT;
  x.beginPath();
  x.arc(70, 70, 16, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = L.INK;
  x.font = "600 40px sans-serif";
  x.fillText("Syncly", 110, 84);
  const tex = new THREE.CanvasTexture(c);
  orient(tex);
  return tex;
}

/* Deterministic orientation for the 3D MacBook screen: the model's display UVs
   are mirrored in U and use the glTF V convention, so flip accordingly. Done
   once at load so it never depends on per-frame render timing. */
function orient(tex: THREE.Texture) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.flipY = true; // model display UVs need a vertical flip; no mirror
  tex.needsUpdate = true;
}

/**
 * Loads a rendered Syncly UI PNG as a screen texture. Falls back to a clean
 * light canvas if the file isn't present yet. delayRender keeps frames from
 * being captured before the texture is ready.
 */
export function useScreenTexture(kind: ScreenKind): THREE.Texture {
  const fallback = useMemo(makeFallback, []);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const handle = delayRender(`ui-texture-${kind}`);
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      staticFile(`screens/${kind}.png`),
      (t) => {
        if (cancelled) return;
        orient(t);
        setTex(t);
        continueRender(handle);
      },
      undefined,
      () => {
        // PNG not rendered yet — keep the fallback, don't block the render.
        if (!cancelled) continueRender(handle);
      },
    );
    return () => {
      cancelled = true;
      continueRender(handle);
    };
  }, [kind]);

  return tex ?? fallback;
}
