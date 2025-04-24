// src/core/game/GameBoard.jsx
import { useTrimesh, usePlane } from "@react-three/cannon";
import Ball from "../components/Ball";
import { CylinderGeometry } from "three";
import { setupPhysics } from "../physics/PhysicsConfig";
import useGameStore from "../state/useGameStore";
import RotatingFloor from "./RotatingFloor";
import HollowCylinder from "./HollowCylinder";
import HollowCylinderTop from "./HollowCylinderTop";
import RoomVisuals from "./RoomVisual";
import BarrierTube from "./BarrierTube";
import { Grid } from "@react-three/drei";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import floorTextureImg from "../../assets/hexagon.jpg";

export default function GameBoard() {
  const balls = useGameStore((s) => s.balls);

  const spotlightRef = useRef();
  const spotlightTarget = useRef();

  setupPhysics();

  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -4, 0],
    material: "groundMaterial",
  }));

  const cylinderGeo = new CylinderGeometry(3, 3, 8, 32);
  const vertices = cylinderGeo.attributes.position.array;
  const indices = cylinderGeo.index.array;

  const [wallRef] = useTrimesh(() => ({
    args: [vertices, indices],
    position: [0, 0, 0],
    type: "Static",
    material: "wallMaterial",
  }));

  // Load tekstur lantai
  const floorTexture = useLoader(THREE.TextureLoader, floorTextureImg);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4); // ubah ini sesuai kebutuhan

  useEffect(() => {
    if (spotlightRef.current && spotlightTarget.current) {
      spotlightRef.current.target = spotlightTarget.current;
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />

      <spotLight
        ref={spotlightRef}
        position={[0, 25, 0]}
        angle={Math.PI / 6}
        penumbra={0.4}
        intensity={3}
        color={"#fff3b0"}
        castShadow
      />
      <mesh ref={spotlightTarget} position={[0, 0, 0]} />

      {/* Lantai dengan tekstur PNG + warna putih */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -4.01, 0]}
        ref={groundRef}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          map={floorTexture}
          color="white"
          roughness={1}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      <RoomVisuals />

      <mesh ref={wallRef}>
        <cylinderGeometry args={[3, 3, 8, 32]} />
        <meshStandardMaterial color="blue" transparent opacity={0.2} />
      </mesh>

      <RotatingFloor />
      <HollowCylinder />
      <HollowCylinderTop />

      {balls.map((ball) => (
        <Ball key={ball.id} position={ball.position} />
      ))}

      {/* Tambahkan 8 buah BarrierTube di sekitar tabung utama */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2; // Rotasi setiap tabung
        const x = Math.cos(angle) * 2.9;
        const z = Math.sin(angle) * 2.9;
        return (
          <BarrierTube
            key={i}
            position={[x, 0, z]} // Posisi sesuai dengan radius lantai
            rotation={[0, angle, 0]} // Rotasi menghadap tabung utama
          />
        );
      })}
    </>
  );
}
