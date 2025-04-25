// src/core/components/BallListSidebar.jsx
import useGameStore from "../../core/state/useGameStore";

export default function BallListSidebar() {
  const ballQueue = useGameStore((state) => state.ballQueue);

  return (
    <div className="sidebar-container">
      <div className="ball-list-container">
        <h4 className="ball-list-title">Daftar Bola</h4>
        <ul className="ball-list">
          {ballQueue.map((ball, index) => (
            <li key={ball.id} className="ball-item">
              <span className="ball-number">{index + 1}.</span> {ball.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
