// src/core/physics/PhysicsConfig.js
import { useContactMaterial } from "@react-three/cannon";

export const setupPhysics = () => {
  useContactMaterial("ballMaterial", "groundMaterial", {
    restitution: 0.9,
    friction: 0.2,
  });

  useContactMaterial("ballMaterial", "wallMaterial", {
    restitution: 1.5,
    friction: 0.05,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 2,
  });

  useContactMaterial("ballMaterial", "ballMaterial", {
    restitution: 1,
    friction: 0.05,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 2,
  });

  useContactMaterial("ballMaterial", "floorMaterial", {
    restitution: 0.9,
    friction: 0.5,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 2,
  });
};
