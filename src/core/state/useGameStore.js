// src/core/state/useGameStore.js
import { create } from "zustand";

const useGameStore = create((set) => ({
  balls: [],
  closedHoles: {}, // Menyimpan status lubang tertutup

  addBall: (position) =>
    set((state) => ({
      balls: [...state.balls, { id: Date.now(), position }],
    })),

  closeHole: (holeIndex) =>
    set((state) => {
      const newClosedHoles = { ...state.closedHoles, [holeIndex]: 5 }; // Tertutup sampai 5 bola masuk
      return { closedHoles: newClosedHoles };
    }),

  updateClosedHoles: () =>
    set((state) => {
      const newClosedHoles = {};
      Object.entries(state.closedHoles).forEach(([key, count]) => {
        if (count > 1) {
          newClosedHoles[key] = count - 1;
        }
      });
      return { closedHoles: newClosedHoles };
    }),
}));

export default useGameStore;
