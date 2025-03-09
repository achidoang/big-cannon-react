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

  // Bentuk fisik dari penutup lubang
  const [physicsRef, physicsApi] = useCylinder(() => ({
    args: [0.3, 0.3, 0.05, 32],
    position: [0, -1.7, 0],
    type: "Static",
    material: "floorMaterial",
    onCollide: (e) => {
      console.log("Collision detected with:", e.body?.userData?.type);

      if (e.body?.userData?.type === "ball") {
        console.log(`Bola masuk ke lubang ${index}`);
        setTimeout(() => {
          closeHole(index);
        }, 350); // Beri delay kecil 100ms sebelum menutup lubang
        e.body.remove();
      }
    },
  }));

  useFrame(() => {
    if (coverRef.current && floorRef.current) {
      const rotationY = floorRef.current.rotation.y;

      // Hitung posisi berdasarkan rotasi lantai
      const x = Math.cos(angle - rotationY) * radius;
      const z = Math.sin(angle - rotationY) * radius;

      // Jika lubang tertutup, penutup naik ke permukaan. Jika tidak, turun ke bawah.
      const yPosition = closedHoles[index] ? -1.7 : -2.25;

      console.log(
        `Lubang ${index} - Status: ${closedHoles[index]}, Posisi Y: ${yPosition}`
      );

      // Update posisi mesh visual
      coverRef.current.position.set(x, yPosition, z);

      // DETEKSI JIKA ADA BOLA DEKAT LUBANG
      balls.forEach((ball) => {
        const ballPos = ball.position;
        const distance = Math.sqrt(
          (ballPos[0] - x) ** 2 + (ballPos[2] - z) ** 2
        );

        if (distance < 0.2 && !closedHoles[index]) {
          console.log(`Bola masuk ke lubang ${index} berdasarkan jarak`);
          closeHole(index);
        }
      });

      // Update posisi physics
      physicsApi.position.set(x, yPosition, z);
    }
  });

  return (
    <>
      {/* Mesh Visual (Penutup Lubang) */}
      <mesh ref={coverRef}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Mesh Fisik (Tak Terlihat, Hanya untuk Physics) */}
      <mesh ref={physicsRef} visible={false}>
        <cylinderGeometry args={[0.64, 0.64, 0.4, 32]} />
      </mesh>
    </>
  );
}
