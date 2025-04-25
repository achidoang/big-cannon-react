// src/pages/MainMenu.jsx

import { useState } from "react";
import useGameStore from "../core/state/useGameStore";
import useMusicStore from "../core/state/useMusicStore";
import "../styles/MainMenu.css";

export default function MainMenu() {
  const startGame = useGameStore((state) => state.startGame);
  const setBallQueue = useGameStore((state) => state.setBallQueue);
  const setRepeatCount = useGameStore((state) => state.setRepeatCount);
  const clearBallQueue = useGameStore((state) => state.clearBallQueue);
  const ballQueue = useGameStore((state) => state.ballQueue);

  const isMusicPlaying = useMusicStore((state) => state.isPlaying);
  const toggleMusic = useMusicStore((state) => state.toggleMusic);
  const volume = useMusicStore((state) => state.volume);
  const setVolume = useMusicStore((state) => state.setVolume);

  const [isFading, setIsFading] = useState(false);
  const [ballInput, setBallInput] = useState("");
  const [repeatInput, setRepeatInput] = useState("1");
  const [showSettings, setShowSettings] = useState(false);

  const selectedTheme = useGameStore((state) => state.selectedTheme);
  const setSelectedTheme = useGameStore((state) => state.setSelectedTheme);

  const handleStart = () => {
    if (ballQueue.length === 0) return;
    const repeatCount = Math.max(1, parseInt(repeatInput, 10) || 1);
    setRepeatCount(repeatCount);
    setIsFading(true);
    setTimeout(() => startGame(selectedTheme), 200);
  };

  const handleBallInputChange = (e) => setBallInput(e.target.value);
  const handleRepeatInputChange = (e) => setRepeatInput(e.target.value);
  const handleSetBalls = () => {
    const names = ballInput
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    if (names.length > 0) setBallQueue(names);
  };

  const handleClearBalls = () => {
    clearBallQueue();
    setBallInput("");
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme); // Mengubah tema di store
  };

  return (
    <div className={`menu-container ${isFading ? "fade-out" : ""}`}>
      <div className="menu-content">
        <h1>🎯 Big Cannon Game</h1>

        <label className="label">Nama Bola (pisahkan dengan koma):</label>
        <input
          type="text"
          placeholder="contoh: Bola1, Bola2, Bola3"
          value={ballInput}
          onChange={handleBallInputChange}
        />

        <div className="button-group">
          <button onClick={handleSetBalls}>✔ Buat Bola</button>
          <button className="danger" onClick={handleClearBalls}>
            🗑 Hapus Daftar
          </button>
          <button onClick={() => setShowSettings(true)}>⚙️ Pengaturan</button>
        </div>

        {ballQueue.length > 0 && (
          <div className="ball-list">
            <h3>🎱 Daftar Bola:</h3>
            <div className="ball-scroll">
              <ul className="ball-items">
                {ballQueue.map((ball, index) => (
                  <li key={index} className="ball-item">
                    <span>{index + 1}.</span> <span>{ball.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="repeat-control">
              <label className="label">🔁 Jumlah Pengulangan:</label>
              <input
                type="number"
                min="1"
                value={repeatInput}
                onChange={handleRepeatInputChange}
              />
              <div className="section">
                <label className="label">🎨 Pilih Tema:</label>
                <select value={selectedTheme} onChange={handleThemeChange}>
                  <option value="Action">Aksi</option>
                  <option value="Horor">Horor</option>
                  <option value="Komedi">Komedi</option>
                  <option value="Romance">Romantis</option>
                  <option value="Sci-fi">Sci-Fi</option>
                  <option value="Survival">Survival</option>
                </select>
              </div>

              <button className="start-btn" onClick={handleStart}>
                🚀 Mulai Permainan
              </button>
            </div>
          </div>
        )}
      </div>

      {showSettings && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>⚙️ Pengaturan</h3>
            <button className="popup-button" onClick={toggleMusic}>
              {isMusicPlaying ? "🔇 Matikan Musik" : "🔊 Nyalakan Musik"}
            </button>

            <div style={{ marginTop: 20 }}>
              <p style={{ marginBottom: 5 }}>Volume Musik:</p>
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
              onClick={() => setShowSettings(false)}
            >
              ✖ Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
