// src/core/game/Ball.jsx

import { useSphere } from "@react-three/cannon";

export default function Ball({ position }) {
  // Menggunakan physics untuk bola
  const [ref] = useSphere(() => ({
    mass: 1, // Berat bola
    position, // Posisi awal bola
    args: [0.2], // Radius bola
    material: "ballMaterial", // Gunakan material fisika
    restitution: 0.9, // efek pantulan tinggi
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// import { useSphere } from "@react-three/cannon";
// import { useEffect } from "react";

// export default function Ball({ position, onRemove }) {
//   const [ref, api] = useSphere(() => ({
//     mass: 1,
//     position,
//     args: [0.2],
//     material: "ballMaterial",
//     restitution: 0.9,
//   }));

//   useEffect(() => {
//     const checkPosition = () => {
//       if (ref.current) {
//         const yPos = ref.current.position.y;
//         if (yPos < -1) {
//           // Jika bola jatuh di bawah lantai
//           api.remove(); // Hapus bola dari physics world
//           onRemove(); // Hapus dari state game
//         }
//       }
//     };

//     const interval = setInterval(checkPosition, 100); // Cek setiap 100ms

//     return () => clearInterval(interval);
//   }, [api, ref, onRemove]);

//   return (
//     <mesh ref={ref} castShadow>
//       <sphereGeometry args={[0.2, 32, 32]} />
//       <meshStandardMaterial color="red" />
//     </mesh>
//   );
// }
