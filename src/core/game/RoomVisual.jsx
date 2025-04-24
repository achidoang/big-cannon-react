// src/components/RoomVisuals.jsx
export default function RoomVisuals() {
  const wallThickness = 0.1;
  const wallHeight = 20;
  const wallLength = 40;

  const wallColor = "#22252a";
  const accentColor = "#00ffd0";

  return (
    <>
      {["left", "right", "front", "back"].map((side) => {
        let position,
          rotation = [0, 0, 0],
          size;

        switch (side) {
          case "left":
            position = [-wallLength / 2, wallHeight / 2 - 4, 0];
            size = [wallThickness, wallHeight, wallLength];
            break;
          case "right":
            position = [wallLength / 2, wallHeight / 2 - 4, 0];
            size = [wallThickness, wallHeight, wallLength];
            break;
          case "front":
            position = [0, wallHeight / 2 - 4, -wallLength / 2];
            size = [wallLength, wallHeight, wallThickness];
            break;
          case "back":
            position = [0, wallHeight / 2 - 4, wallLength / 2];
            size = [wallLength, wallHeight, wallThickness];
            break;
        }

        return (
          <group key={side}>
            {/* Dinding Utama */}
            <mesh position={position} receiveShadow castShadow>
              <boxGeometry args={size} />
              <meshStandardMaterial
                color={wallColor}
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>

            {/* Aksen Strip Horizontal */}
            <mesh position={[position[0], position[1] + 2, position[2]]}>
              <boxGeometry args={[size[0], 0.2, size[2]]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.4}
              />
            </mesh>

            {/* Aksen Strip Tengah */}
            <mesh position={[position[0], position[1] - 2, position[2]]}>
              <boxGeometry args={[size[0], 0.2, size[2]]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
