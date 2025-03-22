// src/pages/MainMenu.jsx

import { useState } from "react";
import useGameStore from "../core/state/useGameStore";
import "../styles/MainMenu.css"; // Kita buat file CSS terpisah untuk styling

export default function MainMenu() {
  const startGame = useGameStore((state) => state.startGame);
  const setBallQueue = useGameStore((state) => state.setBallQueue);
  const clearBallQueue = useGameStore((state) => state.clearBallQueue);
  const ballQueue = useGameStore((state) => state.ballQueue);

  const [isFading, setIsFading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleStart = () => {
    if (ballQueue.length === 0) return; // Tidak bisa mulai tanpa bola
    setIsFading(true);
    setTimeout(() => {
      startGame();
    }, 500); // Fade out selama 500ms sebelum masuk game
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetBalls = () => {
    const names = inputValue
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length > 0) {
      setBallQueue(names);
    }
  };

  const handleClearBalls = () => {
    clearBallQueue();
    setInputValue("");
  };

  return (
    <div className={`menu-container ${isFading ? "fade-out" : ""}`}>
      <div className="menu-content">
        <h1>Big Cannon</h1>

        <input
          type="text"
          placeholder="Masukkan nama bola (pisahkan dengan koma)"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSetBalls}>Buat Bola</button>
        <button onClick={handleClearBalls}>Hapus Daftar</button>

        {ballQueue.length > 0 && (
          <div className="ball-list">
            <h3>Daftar Bola:</h3>
            <ul>
              {ballQueue.map((ball) => (
                <li key={ball.id}>{ball.name}</li>
              ))}
            </ul>
            <button onClick={handleStart}>Start</button>
          </div>
        )}
      </div>
    </div>
  );
}
