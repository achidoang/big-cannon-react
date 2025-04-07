// src/App.jsx

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GameScene from "./pages/GameScene";
import MainMenu from "./pages/MainMenu";
import useGameStore from "./core/state/useGameStore";
import { OrbitControls } from "@react-three/drei";
import "./styles/DaftarBola.css";

function App() {
  const isInGame = useGameStore((state) => state.isInGame);
  const ballQueue = useGameStore((state) => state.ballQueue);
  const dropBall = useGameStore((state) => state.dropBall);
  const gameFinished = useGameStore((state) => state.gameFinished);
  const setGameFinished = useGameStore((state) => state.setGameFinished);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      {!isInGame ? (
        gameFinished ? (
          <div className="menu-container">
            <div className="menu-content">
              <h2>🎉 Permainan Selesai!</h2>
              <p>Semua bola telah dijatuhkan.</p>
              <button
                className="start-btn"
                onClick={() => setGameFinished(false)}
              >
                Kembali ke Menu
              </button>
            </div>
          </div>
        ) : (
          <MainMenu />
        )
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

          {/* {ballQueue.length > 0 && (
            <div className="ball-list-container">
              <h4 className="ball-list-title">Daftar Bola</h4>
              <ul className="ball-list">
                {ballQueue.map((ball, index) => (
                  <li key={ball.id} className="ball-item">
                    <span className="ball-number">{index + 1}.</span>{" "}
                    {ball.name}
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          <button className="drop-ball-button" onClick={dropBall}>
            Drop Ball
          </button>
        </>
      )}
    </div>
  );
}

export default App;
