import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender } from "remotion";
import * as THREE from "three";
import { PLATFORM_ASSET, C } from "../theme";

export const PLATFORM_ORDER = [
  "instagram",
  "facebook",
  "whatsapp",
  "tiktok",
  "linkedin",
] as const;
export type PlatformKey = (typeof PLATFORM_ORDER)[number];

/** Loads the five platform PNGs as textures, blocking the render until ready. */
export function usePlatformTextures(): Record<PlatformKey, THREE.Texture | null> {
  const [map, setMap] = useState<Record<string, THREE.Texture>>({});

  useEffect(() => {
    const handle = delayRender("ad-platform-icons");
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    Promise.all(
      PLATFORM_ORDER.map(
        (k) =>
          new Promise<[string, THREE.Texture | null]>((resolve) => {
            loader.load(
              PLATFORM_ASSET[k],
              (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                t.anisotropy = 4;
                resolve([k, t]);
              },
              undefined,
              () => resolve([k, null]),
            );
          }),
      ),
    ).then((entries) => {
      if (!cancelled) {
        const next: Record<string, THREE.Texture> = {};
        for (const [k, t] of entries) if (t) next[k] = t;
        setMap(next);
      }
      continueRender(handle);
    });
    return () => {
      cancelled = true;
      continueRender(handle);
    };
  }, []);

  return useMemo(
    () =>
      PLATFORM_ORDER.reduce(
        (acc, k) => ({ ...acc, [k]: map[k] ?? null }),
        {} as Record<PlatformKey, THREE.Texture | null>,
      ),
    [map],
  );
}

function canvas(size: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return { c, x: c.getContext("2d")! };
}

/** Soft round glow sprite (emerald dot / bloom). */
export function makeGlowTexture(hex: string = C.ACCENT, soft = 0.0): THREE.CanvasTexture {
  const S = 256;
  const { c, x } = canvas(S);
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  const r = parseInt(hex.slice(1, 3), 16);
  const gn = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  g.addColorStop(0, `rgba(${r},${gn},${b},${1 - soft})`);
  g.addColorStop(0.4, `rgba(${r},${gn},${b},${0.5 - soft * 0.5})`);
  g.addColorStop(1, `rgba(${r},${gn},${b},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(c);
}

/** A floating "notification" pill: white rounded card with a coloured dot. */
export function makePillTexture(dotHex: string): THREE.CanvasTexture {
  const W = 512;
  const H = 192;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  const r = 34;
  x.shadowColor = "rgba(15,20,30,0.18)";
  x.shadowBlur = 36;
  x.shadowOffsetY = 18;
  x.fillStyle = "#ffffff";
  roundRect(x, 24, 18, W - 48, H - 60, r);
  x.fill();
  x.shadowColor = "transparent";
  x.fillStyle = dotHex;
  x.beginPath();
  x.arc(78, H / 2 - 10, 22, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = "rgba(10,10,11,0.82)";
  roundRect(x, 120, 52, 230, 18, 9);
  x.fill();
  x.fillStyle = "rgba(10,10,11,0.30)";
  roundRect(x, 120, 88, 320, 14, 7);
  x.fill();
  return new THREE.CanvasTexture(c);
}

function roundRect(
  x: CanvasRenderingContext2D,
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}
