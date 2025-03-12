// src/core/game/RotatingFloor.jsx
import { useFrame } from "@react-three/fiber";
import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";
import { useRef } from "react";
import HoleCover from "./HoleCover";

export default function RotatingFloor() {
  // Radius luar lantai
  const outerRadius = 3;
  // Radius lubang pada lantai
  const holeRadius = 0.35;

  // Membuat bentuk dasar lantai
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  // Konfigurasi jumlah dan posisi lubang dalam 2 lingkaran
  const holeConfigs = [
    { count: 4, radius: 1.1 }, // 4 lubang dalam lingkaran kecil
    { count: 6, radius: 2.4 }, // 6 lubang dalam lingkaran besar
  ];

  const holePositions = [];

  // Membuat lubang pada lantai berdasarkan konfigurasi
  holeConfigs.forEach(({ count, radius }) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const hole = new THREE.Path();
      hole.absarc(x, y, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      holePositions.push({ x, y, angle, radius });
    }
  });

  // Membuat geometri lantai dengan lubang yang sudah dibuat
  const floorGeometry = new THREE.ShapeGeometry(shape);
  // Memutar geometri agar menjadi lantai horizontal
  floorGeometry.rotateX(-Math.PI / 2);

  // Mengambil atribut posisi dan indeks untuk collision physics
  const vertices = floorGeometry.attributes.position.array;
  const indices = floorGeometry.index?.array || [];

  const floorRef = useRef();

  // Membuat physics mesh menggunakan Trimesh (untuk collision)
  const [ref, api] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, -1.5, 0], // Menempatkan lantai sedikit ke bawah
    type: "Kinematic", // Lantai bergerak tetapi tidak terpengaruh oleh physics
    material: "floorMaterial",
  }));

  // Menggunakan useFrame untuk memutar lantai setiap frame
  useFrame(() => {
    if (ref.current) {
      const rotationY = ref.current.rotation.y + 0.01; // Menambah rotasi secara bertahap
      ref.current.rotation.y = rotationY;

      // Mengupdate quaternion agar physics mengikuti rotasi
      const quaternion = new THREE.Quaternion();
      quaternion.setFromEuler(new THREE.Euler(0, rotationY, 0));
      api.quaternion.set(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
      );
    }
  });

  return (
    <>
      {/* Mesh visual untuk lantai */}
      <mesh ref={ref} geometry={floorGeometry}>
        <meshStandardMaterial
          color="green"
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Menambahkan penutup lubang */}
      {holePositions.map((pos, index) => (
        <HoleCover
          key={index}
          index={index}
          radius={pos.radius}
          angle={pos.angle}
          floorRef={ref}
        />
      ))}
    </>
  );
}
