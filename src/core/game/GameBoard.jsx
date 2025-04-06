// src/core/game/GameBoard.jsx
import { useTrimesh, usePlane } from "@react-three/cannon";
import Ball from "../components/Ball";
import { CylinderGeometry } from "three";
import { setupPhysics } from "../physics/PhysicsConfig";
import useGameStore from "../state/useGameStore";
import RotatingFloor from "./RotatingFloor";
import HollowCylinder from "./HollowCylinder";
import HollowCylinderTop from "./HollowCylinderTop";
import BarrierTube from "./BarrierTube";

export default function GameBoard() {
  // const balls = useGameStore((state) => state.balls);
  const balls = useGameStore((s) => s.balls);

  setupPhysics();

  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -4, 0],
    material: "groundMaterial",
  }));

  const cylinderGeo = new CylinderGeometry(3, 3, 8, 32);
  const vertices = cylinderGeo.attributes.position.array;
  const indices = cylinderGeo.index.array;

  const [wallRef] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, 0, 0],
    type: "Static",
    material: "wallMaterial",
  }));

  return (
    <>
      <mesh ref={groundRef}>
        <planeGeometry args={[30, 30, 8, 8]} />
        <meshStandardMaterial color="gray" wireframe />
      </mesh>

      <mesh ref={wallRef}>
        <cylinderGeometry args={[3, 3, 8, 32]} />
        <meshStandardMaterial color="blue" transparent opacity={0.2} />
      </mesh>

      <RotatingFloor />
      <HollowCylinder />
      <HollowCylinderTop />

      {balls.map((ball) => (
        <Ball key={ball.id} position={ball.position} />
      ))}

      {/* Tambahkan 8 buah BarrierTube di sekitar tabung utama */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2; // Rotasi setiap tabung
        const x = Math.cos(angle) * 2.9;
        const z = Math.sin(angle) * 2.9;
        return (
          <BarrierTube
            key={i}
            position={[x, 0, z]} // Posisi sesuai dengan radius lantai
            rotation={[0, angle, 0]} // Rotasi menghadap tabung utama
          />
        );
      })}
    </>
  );
}
