// src/core/state/useGameStore.js
import { create } from "zustand";

const useGameStore = create((set) => ({
  balls: [],
  addBall: (position) =>
    set((state) => ({
      balls: [...state.balls, { id: Date.now(), position }],
    })),
}));

export default useGameStore;
