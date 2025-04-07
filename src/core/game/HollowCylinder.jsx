import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import textureImg from "../../assets/silinder-bottom.png";

export default function HollowCylinder() {
  const outerRadius = 3.5;
  const innerRadius = 3;
  const height = 3;

  // === 1. Geometry untuk dinding dan alas pakai ExtrudeGeometry ===
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings = { depth: height, bevelEnabled: false };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index?.array || [];

  const [ref] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, -4.4, 0],
    type: "Static",
    material: "wallMaterial",
  }));

  // === 2. Buat tekstur untuk selimut luar saja ===
  const texture = useLoader(THREE.TextureLoader, textureImg);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const sideMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const invisibleMaterial = new THREE.MeshStandardMaterial({ visible: false });

  // Cylinder untuk selimut luar (hollow, open-ended)
  const sideGeometry = new THREE.CylinderGeometry(
    outerRadius,
    outerRadius,
    height,
    512,
    1,
    true // openEnded
  );
  sideGeometry.rotateX(Math.PI / 2); // Agar selaras dengan ExtrudeGeometry

  return (
    <>
      {/* Bagian fisik + alas + sisi dalam */}
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial color="#aaa" />
      </mesh>

      {/* Selimut luar dengan tekstur */}
      <mesh
        position={[0, -2.9, 0]}
        geometry={sideGeometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}
