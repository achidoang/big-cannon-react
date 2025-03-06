// src/core/game/GameCanvas.jsx
import { Canvas } from "@react-three/fiber";
import GameBoard from "./GameBoard";
import GameCamera from "./GameCamera";

export default function GameCanvas() {
  return (
    <Canvas shadows>
      {/* Kontrol Kamera: Nonaktifkan zoom & batasi rotasi */}
      <GameCamera />

      {/* Cahaya */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Mesin Permainan */}
      <GameBoard />
    </Canvas>
  );
}
