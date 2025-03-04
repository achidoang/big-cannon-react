// src/core/game/GameCanvas.jsx

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import GameBoard from "./GameBoard";

export default function GameCanvas() {
  return (
    <Canvas shadows>
      {/* Kamera lebih tinggi & sedikit condong ke bawah */}
      <PerspectiveCamera
        makeDefault
        position={[0, 6, 8]}
        rotation={[-0.2, 0, 0]}
        fov={50}
      />

      {/* Kontrol Kamera: Nonaktifkan zoom & batasi rotasi */}
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
      />

      {/* Cahaya */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      {/* Mesin Permainan */}
      <GameBoard />
    </Canvas>
  );
}
