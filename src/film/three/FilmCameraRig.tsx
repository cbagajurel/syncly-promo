import { useThree } from "@react-three/fiber";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { PerspectiveCamera } from "three";
import { EASE } from "../../constants";

export type FilmCamKey = {
  f: number;
  pos: [number, number, number];
  look?: [number, number, number];
  fov?: number;
};

/**
 * Keyframed cinematic camera (position + look-at + optional FOV), driven only
 * by useCurrentFrame() so renders stay deterministic. Editorial ease in/out.
 */
export function FilmCameraRig({ path }: { path: FilmCamKey[] }) {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  const fs = path.map((k) => k.f);
  const ease = Easing.bezier(
    EASE.INOUT[0],
    EASE.INOUT[1],
    EASE.INOUT[2],
    EASE.INOUT[3],
  );
  const opt = {
    easing: ease,
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  };

  const px = interpolate(frame, fs, path.map((k) => k.pos[0]), opt);
  const py = interpolate(frame, fs, path.map((k) => k.pos[1]), opt);
  const pz = interpolate(frame, fs, path.map((k) => k.pos[2]), opt);
  const lx = interpolate(frame, fs, path.map((k) => k.look?.[0] ?? 0), opt);
  const ly = interpolate(frame, fs, path.map((k) => k.look?.[1] ?? 0), opt);
  const lz = interpolate(frame, fs, path.map((k) => k.look?.[2] ?? 0), opt);

  camera.position.set(px, py, pz);
  camera.lookAt(lx, ly, lz);

  if (path.some((k) => k.fov != null)) {
    const fov = interpolate(
      frame,
      fs,
      path.map((k, i) => k.fov ?? path[Math.max(0, i - 1)].fov ?? 35),
      opt,
    );
    const cam = camera as PerspectiveCamera;
    cam.fov = fov;
    cam.updateProjectionMatrix();
  }

  return null;
}
