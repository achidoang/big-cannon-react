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

  // Gunakan useRef agar isClosed tetap konsisten di dalam handleBallCollision
  const isClosedRef = useRef(isClosed);

  useEffect(() => {
    isClosedRef.current = isClosed;
  }, [isClosed]);

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
      // Jika HoleCover sedang menutup lubang, bola tidak dihapus
      if (isClosedRef.current) return;

      const id = body.id;
      removeBallByBodyId(id);
      if (body.remove) body.remove();

      // Setelah bola masuk, tutup lubang
      closeHole(index);

      const holeMessages = [
        "1. Hebat! Bola masuk lubang pertama!",
        "2. Nice! Kamu menaklukkan lubang kedua!",
        "3. Keren! Lubang ketiga sudah lewat!",
        "4. Luar biasa! Lubang keempat selesai!",
        "5. Fantastic! Lubang kelima aman!",
        "6. Great shot! Lubang keenam done!",
        "7. Amazing! Lubang ketujuh selesai!",
        "8. Impresif! Lubang kedelapan clear!",
        "9. Gokil! Tinggal satu lagi!",
        "10. Selamat! Semua lubang selesai!",
      ];
      const message = holeMessages[index] || "Bola masuk lubang!";
      useGameStore.getState().setHolePopup(true, message);
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
