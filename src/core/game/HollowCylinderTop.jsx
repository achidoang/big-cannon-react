import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";

export default function HollowCylinderTop() {
  const outerRadius = 3.5; // Lebih besar dari RotatingFloor
  const innerRadius = 3; // Lubang di tengah, sesuai dengan RotatingFloor
  const height = 0.8; // Setinggi RotatingFloor
  const radialSegments = 32;

  // Buat geometri utama silinder
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  // Buat lubang di tengah
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  // Buat geometri silinder berlubang
  const extrudeSettings = { depth: height, bevelEnabled: false };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(-Math.PI / 2);

  // Konversi ke bentuk fisika
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index?.array || [];

  const [ref] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, 3.5, 0], // Setengah tinggi agar sesuai dengan RotatingFloor
    type: "Static",
    material: "wallMaterial",
  }));

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="red" wireframe={false} />
    </mesh>
  );
}
