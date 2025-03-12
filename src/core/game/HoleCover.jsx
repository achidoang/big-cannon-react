// src/core/game/HoleCover.jsx
import { useRef } from "react";
import { useCylinder } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import useGameStore from "../state/useGameStore";

export default function HoleCover({ index, radius, angle, floorRef }) {
  const coverRef = useRef();
  const closedHoles = useGameStore((state) => state.closedHoles);
  const closeHole = useGameStore((state) => state.closeHole);
  const balls = useGameStore((state) => state.balls);

  // Physics body for the hole cover (invisible but functional)
  const [physicsRef, physicsApi] = useCylinder(() => ({
    args: [0.5, 0.5, 0.35, 32],
    position: [0, -1.7, 0],
    type: "Static",
    material: "floorMaterial",
    onCollide: (e) => handleBallCollision(e),
  }));

  // Handles ball collision with the hole
  const handleBallCollision = (e) => {
    if (e.body?.userData?.type === "ball") {
      console.log(`Ball entered hole ${index}`);
      setTimeout(() => closeHole(index), 500); // Small delay before closing the hole
      e.body.remove();
    }
  };

  useFrame(() => {
    if (!coverRef.current || !floorRef.current) return;

    const rotationY = floorRef.current.rotation.y;
    const x = Math.cos(angle - rotationY) * radius;
    const z = Math.sin(angle - rotationY) * radius;
    const yPosition = closedHoles[index] ? -1.7 : -2.15;

    coverRef.current.position.set(x, yPosition, z);
    physicsApi.position.set(x, yPosition, z);

    // Detect if a ball is near an open hole
    balls.forEach((ball) => {
      const [ballX, , ballZ] = ball.position;
      const distance = Math.hypot(ballX - x, ballZ - z);

      if (distance < 0.2 && !closedHoles[index]) {
        console.log(`Ball entered hole ${index} based on proximity`);
        closeHole(index);
      }
    });
  });

  return (
    <>
      {/* Visual representation of the hole cover */}
      <mesh ref={coverRef}>
        <cylinderGeometry args={[0.37, 0.3, 0.35, 32]} />
        <meshStandardMaterial
          color="blue"
          transparent={!closedHoles[index]}
          opacity={closedHoles[index] ? 1 : 0.5}
        />
      </mesh>

      {/* Invisible physics mesh */}
      <mesh ref={physicsRef} visible={false}>
        <cylinderGeometry args={[0.5, 0.5, 0.35, 32]} />
      </mesh>
    </>
  );
}
