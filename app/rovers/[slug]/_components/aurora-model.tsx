"use client";

import { Bounds, Center, OrbitControls, useBounds, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

const modelPath = "/assets/aurora/model/aurora-bare-bones-placeholder.glb";

type AuroraModelProps = {
  activeSystem: number;
};

function RoverModel({ activeSystem, onReady }: AuroraModelProps & { onReady: () => void }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Bounds clip margin={1.25}>
      <Center>
        <group rotation={[0.08, -0.65, 0]}>
          <primitive object={scene} />
        </group>
      </Center>
      <CameraFocus activeSystem={activeSystem} onReady={onReady} />
    </Bounds>
  );
}

useGLTF.preload(modelPath);

type OrbitControlsState = {
  target: Vector3;
  update: () => void;
};

type FocusPoint = {
  camera: [number, number, number];
  target: [number, number, number];
  distance: number;
};

const focusPoints: FocusPoint[] = [
  { camera: [1, -0.35, 0], target: [0, -0.35, 0], distance: 0.5 },
  { camera: [3, 3.5, 5], target: [0, 0.2, 0], distance: 0.5 },
  { camera: [2.6, 4, 5.3], target: [0, 0.75, 0], distance: 0.5 },
  { camera: [4.5, 3.6, 4.2], target: [0, 0.9, 0], distance: 0.5 },
  { camera: [2.6, 3.2, 5], target: [0.35, 0.35, 0], distance: 0.5 },
  { camera: [-2.2, 3.7, 5.5], target: [-0.3, 0.65, 0], distance: 0.5 },
];

function isOrbitControlsState(controls: unknown): controls is OrbitControlsState {
  if (!controls || typeof controls !== "object") {
    return false;
  }

  return "target" in controls && "update" in controls;
}

function CameraFocus({ activeSystem, onReady }: AuroraModelProps & { onReady: () => void }) {
  const { camera, controls } = useThree();
  const bounds = useBounds();
  const previousSystem = useRef(activeSystem);
  const initialFocusPending = useRef(true);
  const referenceDistance = useRef<number | null>(null);
  const animation = useRef<{
    fromCamera: Vector3;
    fromTarget: Vector3;
    toCamera: Vector3;
    toTarget: Vector3;
    duration: number;
    progress: number;
  } | null>(null);

  const startFocus = useCallback((system: number, duration = 0.9) => {
    const focusPoint = focusPoints[system] ?? focusPoints[0];
    const orbitControls = isOrbitControlsState(controls) ? controls : null;
    const fromTarget = orbitControls ? orbitControls.target.clone() : new Vector3();
    const toTarget = new Vector3(...focusPoint.target);
    const focusDirection = new Vector3(...focusPoint.camera).sub(toTarget).normalize();

    referenceDistance.current ??= bounds.getSize().distance;

    animation.current = {
      fromCamera: camera.position.clone(),
      fromTarget,
      toCamera: toTarget.clone().add(focusDirection.multiplyScalar(referenceDistance.current * focusPoint.distance)),
      toTarget,
      duration,
      progress: 0,
    };
  }, [bounds, camera, controls]);

  useEffect(() => {
    if (previousSystem.current === activeSystem) {
      return;
    }

    previousSystem.current = activeSystem;
    initialFocusPending.current = false;
    startFocus(activeSystem);
  }, [activeSystem, startFocus]);

  useEffect(() => {
    if (!initialFocusPending.current) {
      return;
    }

    initialFocusPending.current = false;
    bounds.refresh();
    startFocus(0, 2);
    onReady();
  }, [bounds, onReady, startFocus]);

  useFrame((_, delta) => {
    const currentAnimation = animation.current;

    if (!currentAnimation) {
      return;
    }

    const frameDelta = Math.min(delta, 1 / 30);
    currentAnimation.progress = Math.min(
      currentAnimation.progress + frameDelta / currentAnimation.duration,
      1,
    );
    const easedProgress = currentAnimation.progress * currentAnimation.progress
      * (3 - 2 * currentAnimation.progress);
    camera.position.lerpVectors(currentAnimation.fromCamera, currentAnimation.toCamera, easedProgress);

    if (isOrbitControlsState(controls)) {
      controls.target.lerpVectors(currentAnimation.fromTarget, currentAnimation.toTarget, easedProgress);
      controls.update();
    }

    if (currentAnimation.progress >= 1) {
      animation.current = null;
    }
  });

  return null;
}

function RightSideFraming() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!("setViewOffset" in camera)) {
      return undefined;
    }

    camera.setViewOffset(size.width, size.height, -size.width * 0.22, 0, size.width, size.height);
    camera.updateProjectionMatrix();

    return () => {
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
  }, [camera, size.height, size.width]);

  return null;
}

export function AuroraModel({ activeSystem }: AuroraModelProps) {
  const [modelReady, setModelReady] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);

  return (
    <div
      className={`borealis-model-placeholder${modelReady ? " borealis-model-placeholder--ready" : ""}`}
      aria-label="AURORA 3D model placeholder"
      role="img"
    >
      <Canvas
        camera={{ fov: 34, position: [4, 2.8, 6] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
          <color attach="background" args={["#090909"]} />
          <ambientLight intensity={1.6} />
          <directionalLight intensity={3.5} position={[4, 6, 5]} />
          <directionalLight intensity={1.5} position={[-4, 2, -3]} color="#66a9d9" />
          <OrbitControls enableDamping makeDefault minDistance={2} maxDistance={12} target={[0, 0, 0]} />
          <Suspense fallback={null}>
            <RoverModel activeSystem={activeSystem} onReady={handleModelReady} />
          </Suspense>
          <RightSideFraming />
      </Canvas>
      <div className="model-grid" aria-hidden="true" />
      <div className="borealis-model-overlay" aria-hidden="true">
        <span className="model-label">AURORA / 3D view</span>
        <span className="model-status">Bare-bones model / placeholder</span>
      </div>
    </div>
  );
}
