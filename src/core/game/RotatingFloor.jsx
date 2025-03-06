import { useFrame } from "@react-three/fiber";
import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";

export default function RotatingFloor() {
  // Ukuran utama
  const outerRadius = 3;
  const holeRadius = 0.3; // Ukuran lubang kecil

  // Membuat bentuk utama (cincin luar)
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false); // Bentuk lingkaran luar

  // Konfigurasi jumlah lubang per lingkaran (lebih dekat ke pusat)
  const holeConfigs = [
    { count: 4, radius: 0.7 }, // Lingkaran pertama lebih dekat
    { count: 6, radius: 1.7 }, // Lingkaran kedua lebih dekat
    { count: 10, radius: 2.4 }, // Lingkaran ketiga lebih dekat
  ];

  // Menambahkan lubang-lubang ke dalam shape
  holeConfigs.forEach(({ count, radius }) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2; // Posisi setiap lubang dalam lingkaran
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const hole = new THREE.Path();
      hole.absarc(x, y, holeRadius, 0, Math.PI * 2, true); // Buat lingkaran sebagai lubang
      shape.holes.push(hole);
    }
  });

  // Konversi ke bentuk geometri
  const floorGeometry = new THREE.ShapeGeometry(shape);
  floorGeometry.rotateX(-Math.PI / 2); // Rotasi agar horizontal

  // Menambahkan kemiringan menuju lubang dengan memodifikasi posisi vertex
  const positionAttr = floorGeometry.attributes.position;
  for (let i = 0; i < positionAttr.count; i++) {
    const x = positionAttr.getX(i);
    const z = positionAttr.getZ(i);
    const distance = Math.sqrt(x * x + z * z);
    const slopeEffect = -0.15 * (outerRadius - distance); // Semakin dekat lubang, semakin rendah
    positionAttr.setY(i, slopeEffect);
  }
  positionAttr.needsUpdate = true;

  // Konversi ke bentuk physics
  const vertices = floorGeometry.attributes.position.array;
  const indices = floorGeometry.index?.array || []; // Mencegah error jika index null

  // Membuat bentuk fisika dari geometri lantai
  const [ref, api] = useTrimesh(() => ({
    args: [vertices, indices], // Gunakan geometri berbentuk mesh
    position: [0, -0.8, 0], // Posisi lantai
    type: "Kinematic",
    material: "floorMaterial",
  }));

  // Animasi rotasi lantai
  useFrame(() => {
    if (ref.current) {
      const rotationY = ref.current.rotation.y + 0.01;
      ref.current.rotation.y = rotationY;

      // Update rotasi dalam fisika
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
    <mesh ref={ref} geometry={floorGeometry}>
      <meshStandardMaterial
        color="green"
        roughness={0.8}
        side={THREE.DoubleSide}
        displacementScale={0.1} // Efek tekstur kasar agar bola mengalir ke lubang
      />
    </mesh>
  );
}
