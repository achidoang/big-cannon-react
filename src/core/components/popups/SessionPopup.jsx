// src/core/components/popups/SessionPopup.jsx
export default function SessionPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>✨ Sesi Baru Dimulai!</h3>
        <p>Silakan lanjut untuk memulai sesi selanjutnya.</p>
        <button className="popup-button" onClick={onClose}>
          Lanjut
        </button>
      </div>
    </div>
  );
}
