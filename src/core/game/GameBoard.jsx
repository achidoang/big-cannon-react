// src/core/game/GameBoard.jsx
import { useTrimesh, usePlane } from "@react-three/cannon";
import Ball from "./Ball";
import { CylinderGeometry } from "three";
import { setupPhysics } from "../physics/PhysicsConfig";
import useGameStore from "../state/useGameStore";
import RotatingFloor from "./RotatingFloor";

export default function GameBoard() {
  const balls = useGameStore((state) => state.balls);
  const removeBall = useGameStore((state) => state.removeBall); // Tambahkan fungsi removeBall

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

      {/* {balls.map((ball) => (
        <Ball key={ball.id} position={ball.position} />
      ))} */}

      {balls.map((ball) => (
        <Ball
          key={ball.id}
          position={ball.position}
          onRemove={() => removeBall(ball.id)}
        />
      ))}
    </>
  );
}
