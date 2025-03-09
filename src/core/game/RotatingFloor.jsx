// src/core/game/RotatingFloor.jsx
import { useFrame } from "@react-three/fiber";
import { useTrimesh } from "@react-three/cannon";
import * as THREE from "three";
import { useRef } from "react";
import HoleCover from "./HoleCover";

export default function RotatingFloor() {
  const outerRadius = 3;
  const holeRadius = 0.3;

  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const holeConfigs = [
    { count: 4, radius: 1.1 },
    { count: 6, radius: 2.4 },
  ];

  const holePositions = [];

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

  const floorGeometry = new THREE.ShapeGeometry(shape);
  floorGeometry.rotateX(-Math.PI / 2);

  const positionAttr = floorGeometry.attributes.position;
  for (let i = 0; i < positionAttr.count; i++) {
    const x = positionAttr.getX(i);
    const z = positionAttr.getZ(i);
    const distance = Math.sqrt(x * x + z * z);
    const slopeEffect = -0.12 * (outerRadius - distance);
    positionAttr.setY(i, slopeEffect);
  }
  positionAttr.needsUpdate = true;

  const vertices = floorGeometry.attributes.position.array;
  const indices = floorGeometry.index?.array || [];

  const floorRef = useRef();
  const [ref, api] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, -1.5, 0],
    type: "Kinematic",
    material: "floorMaterial",
  }));

  useFrame(() => {
    if (ref.current) {
      const rotationY = ref.current.rotation.y + 0.015;
      ref.current.rotation.y = rotationY;

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
      <mesh ref={ref} geometry={floorGeometry}>
        <meshStandardMaterial
          color="green"
          roughness={0.8}
          side={THREE.DoubleSide}
          displacementScale={0.05}
        />
      </mesh>

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
