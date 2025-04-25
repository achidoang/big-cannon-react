// src/App.jsx

import { useEffect, useState } from "react";
import useGameStore from "./core/state/useGameStore";
import useMusicStore from "./core/state/useMusicStore";
import MainMenu from "./pages/MainMenu";
import CanvasScene from "./core/components/CanvasScene";
import GameSidebar from "./core/components/GameSidebar";
import BallListSidebar from "./core/components/BallListSidebar";
import SessionPopup from "./core/components/popups/SessionPopup";
import ConfirmPopup from "./core/components/popups/ConfirmPopup";
import SettingsPopup from "./core/components/popups/SettingsPopup";
import HolePopup from "./core/components/popups/HolePopup";
import "./styles/DaftarBola.css";

function App() {
  const isInGame = useGameStore((state) => state.isInGame);
  const dropBall = useGameStore((state) => state.dropBall);
  const gameFinished = useGameStore((state) => state.gameFinished);
  const setGameFinished = useGameStore((state) => state.setGameFinished);
  const currentIteration = useGameStore((state) => state.currentIteration);

  const toggleMusic = useMusicStore((state) => state.toggleMusic);
  const isMusicPlaying = useMusicStore((state) => state.isPlaying);
  const volume = useMusicStore((state) => state.volume);
  const setVolume = useMusicStore((state) => state.setVolume);

  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const [isDropDisabled, setIsDropDisabled] = useState(false); // ✅ new
  const showHolePopup = useGameStore((state) => state.showHolePopup);
  const holeMessage = useGameStore((state) => state.holeMessage);
  const setHolePopup = useGameStore((state) => state.setHolePopup);

  useEffect(() => {
    if (currentIteration > 1) setShowSessionPopup(true);
  }, [currentIteration]);

  useEffect(() => {
    const initAndPlay = async () => {
      useMusicStore.getState().initAudio();
      try {
        await useMusicStore.getState().playMusic();
      } catch {
        const onUserInteraction = async () => {
          useMusicStore.getState().initAudio();
          await useMusicStore.getState().playMusic();
          window.removeEventListener("click", onUserInteraction);
        };
        window.addEventListener("click", onUserInteraction);
      }
    };
    initAndPlay();
  }, []);

  // ✅ Simulasi pemicu bola masuk lubang
  const handleDrop = () => {
    if (isDropDisabled) return;

    dropBall();
    setIsDropDisabled(true); // ✅ disable tombol
  };

  const handleCloseHolePopup = () => {
    setHolePopup(false);
    setIsDropDisabled(false); // boleh tetap manual disable tombol drop di sini
  };

  if (!isInGame) {
    return (
      <div className="menu-container">
        {gameFinished ? (
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
        ) : (
          <MainMenu />
        )}
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <CanvasScene />
      <GameSidebar
        onSettings={() => setShowSettingsPopup(true)}
        onDrop={handleDrop} // ✅ gunakan handler baru
        onBack={() => setShowConfirmPopup(true)}
        isDropDisabled={isDropDisabled} // ✅ kirim ke GameSidebar
      />
      <BallListSidebar />

      {showSessionPopup && (
        <SessionPopup
          onClose={() => {
            setShowSessionPopup(false);
            setIsDropDisabled(false); // ✅ Enable kembali tombol drop
          }}
        />
      )}

      {showConfirmPopup && (
        <ConfirmPopup onClose={() => setShowConfirmPopup(false)} />
      )}
      {showSettingsPopup && (
        <SettingsPopup
          onClose={() => setShowSettingsPopup(false)}
          toggleMusic={toggleMusic}
          isMusicPlaying={isMusicPlaying}
          volume={volume}
          setVolume={setVolume}
        />
      )}
      {showHolePopup && (
        <HolePopup message={holeMessage} onClose={handleCloseHolePopup} />
      )}
    </div>
  );
}

export default App;
