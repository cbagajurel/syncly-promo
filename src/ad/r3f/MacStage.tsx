import { useMemo, type ReactNode } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { useVideoConfig } from "remotion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { STAGE } from "../theme";

/* Soft studio IBL so the MacBook aluminium and screen glass read as real,
   baked once from a RoomEnvironment (no HDR file). */
function StudioEnvironment({ intensity = 0.75 }: { intensity?: number }) {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const rt = pmrem.fromScene(room, 0.04);
    scene.environment = rt.texture;
    scene.environmentIntensity = intensity;
    room.dispose();
    pmrem.dispose();
    return rt;
  }, [gl, scene, intensity]);
  return null;
}

/* Transparent canvas + filmic tone mapping (so the cameo composites over the
   premium page and the UI screen stays bright and crisp). */
function RendererConfig() {
  const { gl } = useThree();
  gl.setClearAlpha(0);
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.06;
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;
  return null;
}

/**
 * A bright, transparent studio for the MacBook cameo. Tighter FOV + lifted
 * camera so the dashboard screen dominates while the device stays grounded and
 * never fills the frame. The device itself is animated by the caller (dolly).
 */
export function MacStage({ children }: { children?: ReactNode }) {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows
      camera={{ position: [0, 1.6, 9.4], fov: 28, near: 0.1, far: 100 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
    >
      <RendererConfig />
      <StudioEnvironment intensity={0.8} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 7.5, 5]}
        intensity={2.0}
        color={STAGE.KEY}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={8}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-6, 3.5, 3]} intensity={0.85} color={STAGE.FILL} />
      <directionalLight position={[0, 9, 1]} intensity={0.7} color={STAGE.TOP} />
      {children}
    </ThreeCanvas>
  );
}
