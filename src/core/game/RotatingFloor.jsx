// src/core/game/RotatingFloor.jsx
import { useFrame } from "@react-three/fiber";
import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";
import { useRef } from "react";
import HoleCover from "../components/HoleCover";

export default function RotatingFloor() {
  const outerRadius = 3; // Radius luar lantai
  const holeRadius = 0.35; // Radius lubang

  // Membuat bentuk lantai dengan lubang
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const holeConfigs = [
    { count: 4, radius: 1.1 }, // Lubang dalam lingkaran kecil
    { count: 6, radius: 2.2 }, // Lubang dalam lingkaran besar
  ];

  const holePositions = holeConfigs.flatMap(({ count, radius }) =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const hole = new THREE.Path();
      hole.absarc(x, y, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      return { x, y, angle, radius };
    })
  );

  // Membuat geometri lantai dan menyesuaikan orientasinya
  const floorGeometry = new THREE.ShapeGeometry(shape);
  floorGeometry.rotateX(-Math.PI / 2);

  // Mengambil atribut posisi dan indeks untuk keperluan physics
  const vertices = floorGeometry.attributes.position.array;
  const indices = floorGeometry.index?.array || [];

  const floorRef = useRef();

  // Menggunakan physics Trimesh untuk lantai
  const [ref, api] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, -1.5, 0],
    type: "Kinematic",
    material: "floorMaterial",
  }));

  // Rotasi lantai setiap frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;

      // Perbarui quaternion agar physics mengikuti rotasi
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, ref.current.rotation.y, 0)
      );
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
      {/* Mesh lantai */}
      <mesh ref={ref} geometry={floorGeometry}>
        <meshStandardMaterial
          color="green"
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Penutup lubang */}
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
