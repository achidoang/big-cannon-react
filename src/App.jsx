// src/App.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GameScene from "./pages/GameScene";
import { useState } from "react";
import Ball from "./core/game/Ball";

function App() {
  const [balls, setBalls] = useState([]); // State untuk menyimpan bola

  // Fungsi untuk menjatuhkan bola
  const dropBall = () => {
    setBalls([...balls, { id: Date.now(), position: [0, 3, 0] }]);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
        position: "relative",
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <GameScene balls={balls} /> {/* Kirim data bola ke GameScene */}
        </Suspense>
      </Canvas>

      {/* Tombol Drop Ball */}
      <button
        onClick={dropBall}
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        Drop Ball
      </button>
    </div>
  );
}

export default App;
