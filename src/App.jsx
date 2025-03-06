// src/App.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GameScene from "./pages/GameScene";
import useGameStore from "./core/state/useGameStore";
import { OrbitControls } from "@react-three/drei";

function App() {
  const addBall = useGameStore((state) => state.addBall);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas>
        {/* Tambahkan OrbitControls di sini */}
        <OrbitControls
          // enableZoom={true}
          minDistance={7}
          maxDistance={80}
          enableZoom={false}
          minPolarAngle={Math.PI / 7}
          maxPolarAngle={Math.PI / 2.5}
          target={[0, 0, 0]}
        />
        <Suspense fallback={null}>
          <GameScene />
        </Suspense>
      </Canvas>

      <button
        onClick={() => addBall([0, 3, 0])}
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Drop Ball
      </button>
    </div>
  );
}

export default App;
