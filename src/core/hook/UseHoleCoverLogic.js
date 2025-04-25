// src/core/hook/useHoleCoverLogic.js

import { useCylinder } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useGameStore from "../state/useGameStore";
import { computeHolePosition } from "../utils/positionUtils";

const themeMessages = {
  Action: [
    "1. Boom! First hole down!",
    "2. Explosive! Second hole conquered!",
    "3. Ka-boom! Third hole completed!",
    "4. Power shot! Fourth hole cleared!",
    "5. Big Bang! Fifth hole secured!",
    "6. Firepower! Sixth hole nailed!",
    "7. Impact! Seventh hole destroyed!",
    "8. Unstoppable! Eighth hole gone!",
    "9. Heavy! Ninth hole finished!",
    "10. Victory! All holes down!",
  ],
  Horor: [
    "1. The first hole is cursed!",
    "2. Dark forces fill the second hole!",
    "3. A chill runs down your spine as the third hole opens!",
    "4. The fourth hole is a portal to the unknown!",
    "5. Shadows surround the fifth hole!",
    "6. The sixth hole holds secrets...",
    "7. A scream echoes as the seventh hole closes!",
    "8. The eighth hole is waiting for its victim!",
    "9. You’re almost there... the ninth hole!",
    "10. You survived... or did you?",
  ],
  Komedi: [
    "1. Haha! Hole one, no problem!",
    "2. Second hole? Piece of cake!",
    "3. Third hole? More like a fun ride!",
    "4. Fourth hole... or is it a prank?",
    "5. Fifth hole? Just a bump in the road!",
    "6. Sixth hole? Is this a joke?",
    "7. Seventh hole... going, going, gone!",
    "8. Eighth hole... not as funny as the last one!",
    "9. Almost there... but this is too easy!",
    "10. Game over? You win the comedy challenge!",
  ],
  Romance: [
    "1. Love at first hole!",
    "2. Our second hole... a deeper connection!",
    "3. Will this hole ever end?",
    "4. The fourth hole... a love story in the making!",
    "5. The fifth hole... sweet like a first kiss!",
    "6. Sixth hole, sixth chance at love!",
    "7. The seventh hole... can we make it last?",
    "8. Eighth hole, but the heart still races!",
    "9. Almost there... does love have an end?",
    "10. You’ve completed all the holes... together!",
  ],
  "Sci-fi": [
    "1. First hole... from another dimension!",
    "2. Second hole... portal activated!",
    "3. Third hole... an alien technology!",
    "4. Fourth hole... preparing for lift-off!",
    "5. Fifth hole... the stars are calling!",
    "6. Sixth hole... the galaxy awaits!",
    "7. Seventh hole... quantum leap achieved!",
    "8. Eighth hole... time travel complete!",
    "9. Ninth hole... on the edge of the universe!",
    "10. Mission complete! You've mastered space!",
  ],
  Survival: [
    "1. The first hole... your survival begins!",
    "2. The second hole... danger around every corner!",
    "3. The third hole... think fast or perish!",
    "4. The fourth hole... only the strong survive!",
    "5. Fifth hole... just another obstacle!",
    "6. Sixth hole... stay alert, stay alive!",
    "7. Seventh hole... survival instincts kicking in!",
    "8. Eighth hole... almost out of resources!",
    "9. The ninth hole... do you have what it takes?",
    "10. You've made it! Survival complete!",
  ],
};

export function useHoleCoverLogic(index, radius, angle, floorRef) {
  const coverRef = useRef();
  const isClosed = useGameStore((s) => s.closedHoles[index]);
  const closeHole = useGameStore((s) => s.closeHole);
  const removeBallByBodyId = useGameStore((s) => s.removeBallByBodyId);
  // Ganti parameter selectedTheme dengan mengambilnya langsung dari store
  const selectedTheme = useGameStore((state) => state.selectedTheme);

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

      const holeMessages =
        themeMessages[selectedTheme] || themeMessages["Action"];
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
