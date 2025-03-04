// src/core/game/Ball.jsx

import { useSphere } from "@react-three/cannon";

export default function Ball({ position }) {
  // Menggunakan physics untuk bola
  const [ref] = useSphere(() => ({
    mass: 1, // Berat bola
    position, // Posisi awal bola
    args: [0.2], // Radius bola
    material: "ballMaterial", // Gunakan material fisika
    restitution: 0.9, // efek pantulan tinggi
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
