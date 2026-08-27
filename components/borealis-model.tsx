"use client";

import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

const modelPath = "/assets/borealis/model/legacy-rover-2025-placeholder.glb";

type BorealisModelProps = {
  activeSystem: number;
};

type RoverModelProps = Pick<BorealisModelProps, "activeSystem">;

function RoverModel({ activeSystem }: RoverModelProps) {
  const { scene } = useGLTF(modelPath);
  const scale = 1 + activeSystem * 0.015;

  return (
    <Bounds fit clip margin={1.25} maxDuration={2} observe={false}>
      <Center>
        <group rotation={[0.08, -0.65, 0]} scale={scale}>
          <primitive object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

useGLTF.preload(modelPath);

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

export function BorealisModel({ activeSystem }: BorealisModelProps) {
  return (
    <div className="borealis-model-placeholder" aria-label="Borealis 3D model placeholder" role="img">
      <Canvas
        camera={{ fov: 34, position: [4, 2.8, 6] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#090909"]} />
        <ambientLight intensity={1.6} />
        <directionalLight intensity={3.5} position={[4, 6, 5]} />
        <directionalLight intensity={1.5} position={[-4, 2, -3]} color="#66a9d9" />
        <Suspense fallback={null}>
          <RoverModel activeSystem={activeSystem} />
        </Suspense>
        <OrbitControls enableDamping makeDefault minDistance={2} maxDistance={12} target={[0, 0, 0]} />
        <RightSideFraming />
      </Canvas>
      <div className="model-grid" aria-hidden="true" />
      <div className="borealis-model-overlay" aria-hidden="true">
        <span className="model-label">Borealis / 3D view</span>
        <span className="model-status">Legacy rover model / placeholder</span>
      </div>
    </div>
  );
}
