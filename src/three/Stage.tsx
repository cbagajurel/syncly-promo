import type { ReactNode } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import { STAGE } from "../constants";
import { CameraRig, type CamKey } from "./CameraRig";

/**
 * The shared 3D stage: a deep cinematic backdrop with emerald key light.
 * `children` are 3D nodes; a sibling HTML overlay is rendered by each scene
 * on top of this canvas, both locked to the same frame.
 */
export function Stage({
  children,
  camPath,
  fov = 42,
}: {
  children?: ReactNode;
  camPath?: CamKey[];
  fov?: number;
}) {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 0, 7], fov }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[STAGE.BG]} />
      <fog attach="fog" args={[STAGE.FOG, 10, 30]} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 9, 7]} intensity={2.4} />
      <pointLight
        position={[-7, -2, 5]}
        intensity={55}
        color={STAGE.EMERALD}
        distance={30}
        decay={2}
      />
      <pointLight
        position={[7, 5, -3]}
        intensity={40}
        color="#3a6ad6"
        distance={30}
        decay={2}
      />

      {camPath && <CameraRig path={camPath} />}
      {children}
    </ThreeCanvas>
  );
}
