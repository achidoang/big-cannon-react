// src/core/hook/useHoleCoverLogic.js

import { useCylinder } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useGameStore from "../state/useGameStore";
import { computeHolePosition } from "../utils/positionUtils";

export function useHoleCoverLogic(index, radius, angle, floorRef) {
  const coverRef = useRef();

  const isClosed = useGameStore((s) => s.closedHoles[index]);
  const closeHole = useGameStore((s) => s.closeHole);
  const removeBallByBodyId = useGameStore((s) => s.removeBallByBodyId);

  const [physicsRef, physicsApi] = useCylinder(() => ({
    args: [0.5, 0.5, 0.35, 32],
    position: [0, -2, 0],
    type: "Kinematic",
    material: "floorMaterial",
    onCollide: handleBallCollision,
    userData: { type: "holeCover", index },
  }));

  function handleBallCollision(e) {
    const body = e.body;
    if (body?.userData?.type === "ball") {
      const id = body.id;

      // Hapus bola
      removeBallByBodyId(id);
      if (body.remove) body.remove();

      // Tutup lubang
      closeHole(index);
    }
  }

  useFrame(() => {
    if (!coverRef.current || !floorRef.current) return;

    const rotationY = floorRef.current.rotation.y;
    const { x, z } = computeHolePosition(angle, radius, rotationY);
    const y = isClosed ? -1.7 : -2.15;

    coverRef.current.position.set(x, y, z);
    physicsApi.position.set(x, y, z);
  });

  return {
    coverRef,
    physicsRef,
    isClosed,
  };
}
