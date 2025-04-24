// src/pages/MainMenu.jsx

import { useState } from "react";
import useGameStore from "../core/state/useGameStore";
import "../styles/MainMenu.css";
import useMusicStore from "../core/state/useMusicStore";

export default function MainMenu() {
  const startGame = useGameStore((state) => state.startGame);
  const setBallQueue = useGameStore((state) => state.setBallQueue);
  const setRepeatCount = useGameStore((state) => state.setRepeatCount);
  const clearBallQueue = useGameStore((state) => state.clearBallQueue);
  const ballQueue = useGameStore((state) => state.ballQueue);

  const [isFading, setIsFading] = useState(false);
  const [ballInput, setBallInput] = useState("");
  const [repeatInput, setRepeatInput] = useState("1");

  const isMusicPlaying = useMusicStore((state) => state.isPlaying);
  const toggleMusic = useMusicStore((state) => state.toggleMusic);

  const handleStart = () => {
    if (ballQueue.length === 0) return;
    const repeatCount = Math.max(1, parseInt(repeatInput, 10) || 1);
    setRepeatCount(repeatCount);
    setIsFading(true);
    setTimeout(() => startGame(), 500);
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

          <button onClick={toggleMusic}>
            {isMusicPlaying ? "🔊 Musik: ON" : "🔇 Musik: OFF"}
          </button>
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

              <button className="start-btn" onClick={handleStart}>
                🚀 Mulai Permainan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
