import { useMemo, type ReactNode } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { useVideoConfig } from "remotion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { STAGE_L } from "../theme";
import { FilmCameraRig, type FilmCamKey } from "./FilmCameraRig";

/* Soft studio image-based lighting for realistic reflections on aluminium and
   the screen glass. Baked once from a RoomEnvironment via PMREM — no HDR file. */
function StudioEnvironment({ intensity = 0.7 }: { intensity?: number }) {
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

/* Filmic tone mapping + soft shadows + correct colour. Set imperatively so it
   works regardless of how @remotion/three forwards canvas props. */
function RendererConfig() {
  const { gl } = useThree();
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.04;
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;
  return null;
}

/**
 * Bright, white studio stage for the MacBook hero. Natural softbox lighting:
 * a warm key (soft shadow), a broad cool fill, and a wide top light — plus IBL
 * for believable reflections. No neon, no fog, no coloured glow.
 */
export function FilmStage({
  children,
  camPath,
  fov = 34,
}: {
  children?: ReactNode;
  camPath?: FilmCamKey[];
  fov?: number;
}) {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows
      camera={{ position: [0, 1.1, 7], fov, near: 0.1, far: 100 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[STAGE_L.BG]} />
      <RendererConfig />
      <StudioEnvironment intensity={0.75} />

      {/* gentle ambient base */}
      <ambientLight intensity={0.45} />

      {/* warm key — the only shadow caster, kept soft */}
      <directionalLight
        position={[4, 7.5, 5]}
        intensity={2.1}
        color={STAGE_L.KEY}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-radius={9}
        shadow-bias={-0.0003}
      />

      {/* broad cool fill from the opposite side */}
      <directionalLight position={[-6, 3.5, 3]} intensity={0.85} color={STAGE_L.FILL} />

      {/* wide soft top light (softbox feel) */}
      <directionalLight position={[0, 9, 1]} intensity={0.7} color={STAGE_L.TOP} />

      {camPath && <FilmCameraRig path={camPath} />}
      {children}
    </ThreeCanvas>
  );
}
