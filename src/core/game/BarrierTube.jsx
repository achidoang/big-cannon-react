// src/core/game/BarrierTube.jsx
import { useTrimesh } from "@react-three/cannon";
import { useRef } from "react";
import * as THREE from "three";

export default function BarrierTube({ position, rotation }) {
  const outerRadius = 0.26; // Radius luar tabung kecil
  const height = 8.2; // Tinggi tabung kecil
  const segments = 64; // Jumlah segmen agar bentuk halus

  // Membuat tabung kecil penuh tanpa pemotongan
  const geometry = new THREE.CylinderGeometry(
    outerRadius,
    outerRadius,
    height,
    segments,
    1,
    false // Tabung dengan sisi atas dan bawah
  );

  const ref = useRef();
  useTrimesh(() => ({
    args: [geometry.attributes.position.array, geometry.index.array],
    position,
    rotation,
    type: "Static", // Tabung ini tidak boleh bergerak
    material: "barierMaterial",
  }));

  return (
    <mesh ref={ref} geometry={geometry} position={position} rotation={rotation}>
      <meshStandardMaterial
        color="white"
        roughness={0.8}
        transparent
        opacity={0.4}
        // side={THREE.DoubleSide}
      />
    </mesh>
  );
}
