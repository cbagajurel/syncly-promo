import type { ReactNode } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import { STAGE } from "../constants";
import { CameraRig, type CamKey } from "./CameraRig";

/**
 * Neutral studio stage for the 3D product showcase. No neon point lights, no
 * fog — a soft warm key with shadows, a cool rim, and gentle ambient fill.
 * Think a real product photo set, not a sci-fi backdrop.
 */
export function Stage({
  children,
  camPath,
  fov = 38,
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
      shadows
      camera={{ position: [0, 1.2, 7], fov }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[STAGE.BG]} />

      {/* ambient fill */}
      <ambientLight intensity={0.55} />

      {/* warm key light (casts the soft shadow) */}
      <directionalLight
        position={[4, 8, 6]}
        intensity={2.6}
        color={STAGE.KEY}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />

      {/* cool rim from behind for edge separation */}
      <directionalLight position={[-6, 4, -5]} intensity={1.1} color={STAGE.RIM} />

      {/* low fill to lift shadow underside */}
      <pointLight position={[0, -3, 4]} intensity={6} color="#ffffff" distance={20} decay={2} />

      {camPath && <CameraRig path={camPath} />}
      {children}
    </ThreeCanvas>
  );
}
