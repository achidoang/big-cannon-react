import { PerspectiveCamera } from "@react-three/drei";

export default function GameCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 20, 0]} // Posisikan lebih jauh dan lebih tinggi
      fov={75} // Lebar pandangan, bisa diatur lebih besar/kecil
      near={0.1} // Jarak minimal ke objek
      far={200} // Jarak maksimal yang terlihat
    />
  );
}
