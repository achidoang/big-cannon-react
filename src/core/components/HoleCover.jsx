// src/core/components/HoleCover.jsx

import { useHoleCoverLogic } from "../hook/UseHoleCoverLogic";

export default function HoleCover({ index, radius, angle, floorRef }) {
  const { coverRef, physicsRef, isClosed } = useHoleCoverLogic(
    index,
    radius,
    angle,
    floorRef
  );

  return (
    <>
      <mesh ref={coverRef} visible={isClosed}>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        <meshStandardMaterial
          color="blue"
          transparent={!isClosed}
          opacity={isClosed ? 1 : 0}
          depthWrite={isClosed}
          renderOrder={isClosed ? 1 : -1}
        />
      </mesh>

      <mesh ref={physicsRef} visible={false}>
        <cylinderGeometry args={[0.75, 0.75, 0.35, 32]} />
      </mesh>
    </>
  );
}
