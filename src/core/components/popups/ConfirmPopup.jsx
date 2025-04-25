// src/core/components/popups/ConfirmPopup.jsx
export default function ConfirmPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Konfirmasi</h3>
        <p>
          Apakah Anda yakin ingin kembali ke menu utama? Semua progres akan
          direset.
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
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
