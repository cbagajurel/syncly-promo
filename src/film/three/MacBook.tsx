import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MacBookModel } from "./MacBookModel";

export type MacBookProps = {
  screen: THREE.Texture;
  scene?: THREE.Group | null;
  lidOpen?: number;
  screenOn?: number;
};

/* ── This project's photoreal model ──────────────────────────────────────
   MacBook Pro M3 16" by jackbaeten (Sketchfab, CC-BY-4.0). Obfuscated names,
   so the anchors below were resolved by inspecting the glTF: the lid subtree,
   the hinge line, and the emissive display material we re-skin with live UI.  */
const MODEL = staticFile("models/macbook_pro_m3_16_inch_2024.glb");
const LID_NODE = "VCQqxpxkUlzqcJI_62"; // lid/display subtree root
const SCREEN_MAT = "sfCQkHOWyrsLmor"; // emissive display material (#36)
const HINGE = new THREE.Vector3(0, 0.36, -11.82); // model-space hinge axis point

const TARGET_W = 5.0; // world width to scale the model to
const BASE_Y = -0.62; // sit the base just below origin (matches camera framing)
// hinge travel: open (lidOpen=1) → 0; closed (lidOpen=0) → CLOSED radians.
// Positive X folds the lid forward over the keyboard (screen face down).
const CLOSED = 1.95;

/* Module-cached loader. MUST be called from the Remotion React tree (an act /
   Hero component), NOT inside <ThreeCanvas> — delayRender + setState only flush
   to the captured frame outside the R3F reconciler. */
let cached: THREE.Group | null = null;
let loadPromise: Promise<void> | null = null;
function loadOnce(): Promise<void> {
  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve) => {
      new GLTFLoader().load(
        MODEL,
        (gltf) => {
          cached = gltf.scene;
          resolve();
        },
        undefined,
        () => resolve(), // missing/failed → procedural fallback
      );
    });
  }
  return loadPromise;
}

export function useMacBookScene(): THREE.Group | null {
  const [, force] = useState(0);
  useEffect(() => {
    if (cached) return;
    const handle = delayRender("macbook-glb");
    let cancelled = false;
    loadOnce().then(() => {
      if (!cancelled) force((n) => n + 1);
      continueRender(handle);
    });
    return () => {
      cancelled = true;
      continueRender(handle);
    };
  }, []);
  return cached;
}

/* Soft round contact shadow (radial gradient) for gentle grounding. */
function useContactShadow(): THREE.CanvasTexture {
  return useMemo(() => {
    const S = 512;
    const c = document.createElement("canvas");
    c.width = S;
    c.height = S;
    const x = c.getContext("2d")!;
    const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, "rgba(20,22,28,0.20)");
    g.addColorStop(0.55, "rgba(20,22,28,0.07)");
    g.addColorStop(1, "rgba(20,22,28,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(c);
  }, []);
}

function MacBookGLB({
  scene,
  screen,
  lidOpen = 1,
  screenOn = 1,
}: { scene: THREE.Group } & MacBookProps) {
  const contact = useContactShadow();

  // Prepare once: shadows, locate the screen meshes, set up a hinge pivot, and
  // compute the fit transform (scale + recenter).
  const { root, pivot, fit, screenMeshes } = useMemo(() => {
    const root = scene.clone(true);
    const screenMeshes: THREE.Mesh[] = [];
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      if (mats.some((mat) => mat && (mat as THREE.Material).name === SCREEN_MAT)) {
        // give the screen its own material instance so we can mutate per clone
        m.material = (m.material as THREE.MeshStandardMaterial).clone();
        screenMeshes.push(m);
      }
    });

    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = TARGET_W / size.x;

    // Hinge pivot. Ancestor nodes carry axis-conversion matrices, so HINGE
    // (world space) must be converted into the lid parent's local space.
    const lid = root.getObjectByName(LID_NODE);
    let pivot: THREE.Group | null = null;
    if (lid && lid.parent) {
      const parent = lid.parent;
      pivot = new THREE.Group();
      pivot.name = "lidPivot";
      pivot.position.copy(parent.worldToLocal(HINGE.clone()));
      parent.add(pivot);
      pivot.attach(lid); // preserves the lid's world transform
    }

    return {
      root,
      pivot,
      screenMeshes,
      fit: { s, cx: center.x, cz: center.z, minY: box.min.y },
    };
  }, [scene]);

  // Re-skin the display with the live Syncly UI (orientation is baked into the
  // texture in useScreenTexture, so just assign + drive the glow).
  screenMeshes.forEach((m) => {
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.map = screen;
    mat.emissiveMap = screen;
    mat.emissive = new THREE.Color("#ffffff");
    mat.emissiveIntensity = 0.78 * screenOn;
    mat.toneMapped = true;
    mat.needsUpdate = true;
  });

  if (pivot) pivot.rotation.x = CLOSED * (1 - lidOpen);

  return (
    <group position={[0, BASE_Y, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0.1]}>
        <planeGeometry args={[TARGET_W * 1.7, TARGET_W * 1.25]} />
        <meshBasicMaterial map={contact} transparent depthWrite={false} />
      </mesh>
      <primitive
        object={root}
        scale={fit.s}
        position={[-fit.cx * fit.s, -fit.minY * fit.s, -fit.cz * fit.s]}
      />
    </group>
  );
}

export function MacBook({ scene, ...props }: MacBookProps) {
  if (scene) return <MacBookGLB scene={scene} {...props} />;
  return <MacBookModel {...props} />; // fallback while loading / if absent
}
