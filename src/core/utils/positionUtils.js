// src/core/utils/positionUtils.js

export function computeHolePosition(angle, radius, rotationY) {
  const x = Math.cos(angle - rotationY) * radius;
  const z = Math.sin(angle - rotationY) * radius;
  return { x, z };
}
