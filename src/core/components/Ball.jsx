// src/core/components/Ball.jsx

import { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import useGameStore from "../state/useGameStore";

export default function Ball({ id, position }) {
  const [ref] = useSphere(() => ({
    mass: 1.5,
    position,
    args: [0.2],
    material: "ballMaterial",
    userData: { type: "ball", id }, // Penting!
  }));

  const updateBallBodyId = useGameStore((s) => s.updateBallBodyId);

  useEffect(() => {
    if (ref.current) {
      updateBallBodyId(ref.current.id, ref);
    }
  }, [ref.current]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
