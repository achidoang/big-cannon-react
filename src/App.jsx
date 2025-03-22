// src/App.jsx

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GameScene from "./pages/GameScene";
import MainMenu from "./pages/MainMenu";
import useGameStore from "./core/state/useGameStore";
import { OrbitControls } from "@react-three/drei";

function App() {
  const isInGame = useGameStore((state) => state.isInGame);
  const ballQueue = useGameStore((state) => state.ballQueue);
  const dropBall = useGameStore((state) => state.dropBall);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      {!isInGame ? (
        <MainMenu />
      ) : (
        <>
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

          {/* Daftar Bola di Sudut Kanan Atas */}
          {ballQueue.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h4>Daftar Bola:</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {ballQueue.map((ball) => (
                  <li key={ball.id}>{ball.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tombol Drop Ball di Tengah Bawah */}
          <button
            onClick={dropBall}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Drop Ball
          </button>
        </>
      )}
    </div>
  );
}

export default App;
