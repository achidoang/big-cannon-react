// src/core/components/popups/HolePopup.jsx
import React from "react";

export default function HolePopup({ message, onClose }) {
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
