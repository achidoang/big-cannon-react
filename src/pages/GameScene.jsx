// src/pages/GameScene.jsx

import { Physics } from "@react-three/cannon";
import { Environment } from "@react-three/drei";
import GameBoard from "../core/game/GameBoard";
import { Debug } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

export default function GameScene({ balls }) {
  return (
    <>
      {/* Cahaya */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Lingkungan 3D */}
      <Environment preset="warehouse" />
      {/* Fisika */}
      <Physics>
        <Debug>
          <GameBoard balls={balls} />
        </Debug>
      </Physics>

      <OrbitControls />
    </>
  );
}
