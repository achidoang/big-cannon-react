import { PerspectiveCamera } from "@react-three/drei";

export default function GameCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 30, 35]} // Posisikan lebih jauh dan lebih tinggi
      fov={60} // Lebar pandangan, bisa diatur lebih besar/kecil
      near={0.1} // Jarak minimal ke objek
      far={200} // Jarak maksimal yang terlihat
    />
  );
}
