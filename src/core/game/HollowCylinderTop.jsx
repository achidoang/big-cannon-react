import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import textureImg from "../../assets/silinder-bottom.png";

export default function HollowCylinderTop() {
  const outerRadius = 3.5;
  const innerRadius = 3;
  const height = 0.8;

  // === 1. Geometry Fisik (ExtrudeGeometry) ===
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings = { depth: height, bevelEnabled: false };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index?.array || [];

  const [ref] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, 3.5, 0], // Posisi fisik tetap
    type: "Static",
    material: "wallMaterial",
  }));

  // === 2. Textured Mesh (selimut luar saja) ===
  const texture = useLoader(THREE.TextureLoader, textureImg);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);

  const sideGeometry = new THREE.CylinderGeometry(
    outerRadius,
    outerRadius,
    height,
    512,
    1,
    true // openEnded
  );
  sideGeometry.rotateX(Math.PI / 2);

  return (
    <>
      {/* Fisik silinder berlubang */}
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial color="#aaa" />
      </mesh>

      {/* Visual selimut luar dengan tekstur */}
      <mesh
        position={[0, 4.3 - height / 2, 0]} // Posisi visual sejajar dengan mesh fisik
        geometry={sideGeometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </>
  );
}
