// src/pages/MainMenu.jsx

import { useState } from "react";
import useGameStore from "../core/state/useGameStore";
import "../styles/MainMenu.css"; // Kita buat file CSS terpisah untuk styling

export default function MainMenu() {
  const startGame = useGameStore((state) => state.startGame);
  const setBallQueue = useGameStore((state) => state.setBallQueue);
  const setRepeatCount = useGameStore((state) => state.setRepeatCount);
  const clearBallQueue = useGameStore((state) => state.clearBallQueue);
  const ballQueue = useGameStore((state) => state.ballQueue);

  const [isFading, setIsFading] = useState(false);
  const [ballInput, setBallInput] = useState("");
  const [repeatInput, setRepeatInput] = useState("1");

  const handleStart = () => {
    if (ballQueue.length === 0) return;
    const repeatCount = Math.max(1, parseInt(repeatInput, 10) || 1);
    setRepeatCount(repeatCount);
    setIsFading(true);
    setTimeout(() => {
      startGame();
    }, 500);
  };

  const handleBallInputChange = (e) => {
    setBallInput(e.target.value);
  };

  const handleRepeatInputChange = (e) => {
    setRepeatInput(e.target.value);
  };

  const handleSetBalls = () => {
    const names = ballInput
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length > 0) {
      setBallQueue(names);
    }
  };

  const handleClearBalls = () => {
    clearBallQueue();
    setBallInput("");
  };

  return (
    <div className={`menu-container ${isFading ? "fade-out" : ""}`}>
      <div className="menu-content">
        <h1>Big Cannon</h1>

        <input
          type="text"
          placeholder="Masukkan nama bola (pisahkan dengan koma)"
          value={ballInput}
          onChange={handleBallInputChange}
        />
        <button onClick={handleSetBalls}>Buat Bola</button>
        <button className="danger" onClick={handleClearBalls}>
          Hapus Daftar
        </button>

        {ballQueue.length > 0 && (
          <div className="ball-list">
            <h3>Daftar Bola:</h3>
            <p>{ballQueue.map((ball) => ball.name).join(", ")}</p>

            <input
              type="number"
              min="1"
              placeholder="Jumlah pengulangan"
              value={repeatInput}
              onChange={handleRepeatInputChange}
            />

            <button className="start-btn" onClick={handleStart}>
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
