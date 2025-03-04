// src/core/game/GameScene.jsx

import { useTrimesh, usePlane, useContactMaterial } from "@react-three/cannon";
import Ball from "./Ball";
import { Float32BufferAttribute, CylinderGeometry } from "three";

export default function GameBoard({ balls = [] }) {
  // **Lantai dengan Heightfield**
  const matrix = [
    [-1, 0, 1, 0, -1],
    [0, 1, 2, 1, 0],
    [1, 2, 3, 2, 1],
    [0, 1, 2, 1, 0],
    [-1, 0, 1, 0, -1],
  ]; // Matrix 5x5 untuk permukaan naik turun

  // Papan Dasar
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    args: [matrix.length - 1, matrix[0].length - 1, matrix.flat()],
    position: [0, -4, 0], // Turunkan sedikit agar lebih realistis
    elementSize: 1,
    material: "groundMaterial", // Terapkan material
  }));

  // **Dinding Mesin (Menggunakan Trimesh)**
  const cylinderGeo = new CylinderGeometry(3, 3, 8, 32);
  const vertices = cylinderGeo.attributes.position.array;
  const indices = cylinderGeo.index.array;

  const [wallRef] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, 0, 0],
    type: "Static",
    material: "wallMaterial",
  }));

  // **Material Fisika**
  useContactMaterial("ballMaterial", "groundMaterial", {
    restitution: 0.9, // Bola tetap memantul
    friction: 0.2, // Kurangi gesekan supaya bola lebih liar
  });

  useContactMaterial("ballMaterial", "wallMaterial", {
    restitution: 1, // Supaya bola mantul sempurna di dinding
    friction: 0.05, // Kurangi gesekan agar tidak lengket di dinding
    contactEquationStiffness: 1e8, // Meningkatkan ketegasan kotak
    contactEquationRelaxation: 2, // mengurangi efek tembus
  });

  useContactMaterial("ballMaterial", "ballMaterial", {
    restitution: 1, // Supaya bola mantul sempurna di dinding
    friction: 0.05, // Kurangi gesekan agar tidak lengket di dinding
    contactEquationStiffness: 1e8, // Meningkatkan ketegasan kotak
    contactEquationRelaxation: 2, // mengurangi efek tembus
  });

  return (
    <>
      {/* **Lantai** */}
      <mesh ref={groundRef} receiveShadow>
        <planeGeometry args={[5, 5, 4, 4]} />
        <meshStandardMaterial color="gray" wireframe />
      </mesh>

      {/* **Dinding Mesin (Menggunakan Trimesh)** */}
      <mesh ref={wallRef} castShadow>
        <cylinderGeometry args={[3, 3, 8, 32]} />
        <meshStandardMaterial color="blue" transparent opacity={0.2} />
      </mesh>

      {/* Bola yang dijatuhkan */}
      {balls.map((ball) => (
        <Ball key={ball.id} position={ball.position} />
      ))}
    </>
  );
}
