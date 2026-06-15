import type { ReactNode } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { useVideoConfig } from "remotion";
import * as THREE from "three";

/** Transparent canvas so the DOM dashboard composites through. */
function Transparent() {
  const { gl } = useThree();
  gl.setClearAlpha(0);
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMapping = THREE.NoToneMapping;
  return null;
}

/**
 * The ad's Three.js world: a transparent stage with soft, flat editorial light.
 * It sits behind (or in front of) the DOM UI via the parent's zIndex. No
 * background colour — the page colour shows through.
 */
export function AdStage({
  children,
  fov = 35,
  z = 9,
  style,
}: {
  children?: ReactNode;
  fov?: number;
  z?: number;
  style?: React.CSSProperties;
}) {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 0, z], fov, near: 0.1, far: 100 }}
      style={{ position: "absolute", inset: 0, ...style }}
      gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
    >
      <Transparent />
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-5, 2, 3]} intensity={0.5} color="#e6ecf6" />
      {children}
    </ThreeCanvas>
  );
}
