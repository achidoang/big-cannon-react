// src/core/components/CanvasScene.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GameScene from "../../pages/GameScene";
import { OrbitControls } from "@react-three/drei";

export default function CanvasScene() {
  return (
    <Canvas>
      <OrbitControls
        minDistance={7}
        maxDistance={80}
        enableZoom={false}
        minPolarAngle={Math.PI / 7}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 0, 0]}
      />
      <Suspense fallback={null}>
        <GameScene />
      </Suspense>
    </Canvas>
  );
}
