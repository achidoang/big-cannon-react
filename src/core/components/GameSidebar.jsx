// src/core/components/GameSidebar.jsx
export default function GameSidebar({
  onSettings,
  onDrop,
  onBack,
  isDropDisabled,
}) {
  return (
    <div className="left-sidebar-container">
      <button className="settings-button general" onClick={onSettings}>
        ⚙️ Pengaturan
      </button>
      {/* <button
        className="drop-ball-button"
        onClick={onDrop}
        disabled={isDropDisabled} // ✅ ini dia
      >
        Drop Ball
      </button> */}

      <button
        onClick={onDrop}
        disabled={isDropDisabled}
        className={`drop-ball-button ${isDropDisabled ? "disabled" : ""}`}
      >
        {isDropDisabled ? "Menunggu..." : "Drop Ball"}
      </button>

      <button className="back-menu-button general" onClick={onBack}>
        ⬅ Kembali
      </button>
    </div>
  );
}
