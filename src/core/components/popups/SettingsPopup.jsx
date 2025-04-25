// src/core/components/popups/SettingsPopup.jsx
import useMusicStore from "../../state/useMusicStore";

export default function SettingsPopup({ onClose }) {
  const toggleMusic = useMusicStore((state) => state.toggleMusic);
  const isMusicPlaying = useMusicStore((state) => state.isPlaying);
  const volume = useMusicStore((state) => state.volume);
  const setVolume = useMusicStore((state) => state.setVolume);
  return (
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
          onClick={onClose}
        >
          ✖ Tutup
        </button>
      </div>
    </div>
  );
}
