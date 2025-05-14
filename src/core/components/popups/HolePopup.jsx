// src/core/components/popups/HolePopup.jsx
import React, { useEffect } from "react";

export default function HolePopup({ message, onClose }) {
  useEffect(() => {
    const audio = new Audio("/public/sound/questions-effect.wav");
    audio.play().catch((e) => {
      console.warn("Gagal memutar audio:", e);
    });
  }, []); // hanya jalan sekali saat komponen muncul

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">🎉 Pertanyaan!</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          Lanjutkan Permainan
        </button>
      </div>
    </div>
  );
}
