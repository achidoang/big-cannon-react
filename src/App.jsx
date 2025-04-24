// src/App.jsx

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import GameScene from "./pages/GameScene";
import MainMenu from "./pages/MainMenu";
import { OrbitControls } from "@react-three/drei";
import useGameStore from "./core/state/useGameStore";
import useMusicStore from "./core/state/useMusicStore";

import "./styles/DaftarBola.css";

function App() {
  const isInGame = useGameStore((state) => state.isInGame);
  const ballQueue = useGameStore((state) => state.ballQueue);
  const dropBall = useGameStore((state) => state.dropBall);
  const gameFinished = useGameStore((state) => state.gameFinished);
  const setGameFinished = useGameStore((state) => state.setGameFinished);
  const currentIteration = useGameStore((state) => state.currentIteration);

  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const toggleMusic = useMusicStore((state) => state.toggleMusic);
  const playMusic = useMusicStore((state) => state.playMusic);
  const isMusicPlaying = useMusicStore((state) => state.isPlaying);
  const volume = useMusicStore((state) => state.volume);
  const setVolume = useMusicStore((state) => state.setVolume);

  useEffect(() => {
    if (currentIteration > 1) {
      setShowSessionPopup(true);
    }
  }, [currentIteration]);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await playMusic();
      } catch (err) {
        const onUserInteraction = async () => {
          await playMusic();
          window.removeEventListener("click", onUserInteraction);
        };
        window.addEventListener("click", onUserInteraction);
      }
    };
    tryPlay();
  }, [playMusic]);

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

          {/* Sidebar kiri */}
          <div className="left-sidebar-container">
            <button
              className="settings-button"
              onClick={() => setShowSettingsPopup(true)}
            >
              ⚙️ Pengaturan
            </button>

            <button className="drop-ball-button" onClick={dropBall}>
              Drop Ball
            </button>

            <button
              className="back-menu-button"
              onClick={() => setShowConfirmPopup(true)}
            >
              ⬅ Kembali
            </button>
          </div>

          {/* Sidebar kanan */}
          <div className="sidebar-container">
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
          </div>

          {/* Pop-up: Ganti sesi */}
          {showSessionPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>✨ Sesi Baru Dimulai!</h3>
                <p>Silakan lanjut untuk memulai sesi selanjutnya.</p>
                <button
                  className="popup-button"
                  onClick={() => setShowSessionPopup(false)}
                >
                  Lanjut
                </button>
              </div>
            </div>
          )}

          {/* Pop-up: Konfirmasi kembali */}
          {showConfirmPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Konfirmasi</h3>
                <p>
                  Apakah Anda yakin ingin kembali ke menu utama? Semua progres
                  akan direset.
                </p>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="popup-button"
                    onClick={() => window.location.reload()}
                  >
                    Ya, kembali
                  </button>
                  <button
                    className="popup-button"
                    style={{ background: "#ccc", color: "#000" }}
                    onClick={() => setShowConfirmPopup(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pop-up: Pengaturan Musik */}
          {showSettingsPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>⚙️ Pengaturan</h3>
                <button className="popup-button" onClick={toggleMusic}>
                  {isMusicPlaying ? "Matikan Musik 🔇" : "Nyalakan Musik 🔊"}
                </button>

                <div style={{ marginTop: 20 }}>
                  <p style={{ marginBottom: 5 }}>Volume Music:</p>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                  />
                </div>

                <button
                  className="popup-button"
                  style={{ marginTop: 25, background: "#ccc", color: "#000" }}
                  onClick={() => setShowSettingsPopup(false)}
                >
                  ✖ Tutup
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
