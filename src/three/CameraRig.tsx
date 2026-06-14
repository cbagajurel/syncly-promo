import { useThree } from "@react-three/fiber";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../constants";

export type CamKey = {
  f: number;
  pos: [number, number, number];
  look?: [number, number, number];
};

/**
 * Animates the camera along a keyframed path. Driven entirely by
 * useCurrentFrame() (never useFrame) so renders stay deterministic.
 */
export function CameraRig({ path }: { path: CamKey[] }) {
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

  return null;
}
