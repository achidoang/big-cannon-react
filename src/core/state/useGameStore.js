// src/core/state/useGameStore.js

import { create } from "zustand";

const useGameStore = create((set) => ({
  balls: [],
  closedHoles: {}, // Menyimpan status lubang (true jika tertutup)
  holeCounters: {}, // Menyimpan jumlah bola yang sudah dijatuhkan sejak lubang tertutup

  // Tambah bola ke game
  addBall: (position) =>
    set((state) => {
      const newBall = { id: Date.now(), position };

      // Tambah penghitung untuk setiap lubang yang masih tertutup
      const newHoleCounters = { ...state.holeCounters };
      const newClosedHoles = { ...state.closedHoles };

      Object.keys(newHoleCounters).forEach((holeKey) => {
        newHoleCounters[holeKey] += 1;

        // Jika sudah 5 bola dijatuhkan setelah lubang tertutup, buka kembali lubangnya
        if (newHoleCounters[holeKey] >= 5) {
          delete newClosedHoles[holeKey];
          delete newHoleCounters[holeKey];
        }
      });

      return {
        balls: [...state.balls, newBall],
        closedHoles: newClosedHoles,
        holeCounters: newHoleCounters,
      };
    }),

  removeBall: (ballId) =>
    set((state) => ({
      balls: state.balls.filter((ball) => ball.id !== ballId),
    })),

  // Tutup lubang jika bola masuk
  closeHole: (holeIndex) =>
    set((state) => {
      console.log(`Menutup lubang ${holeIndex}`);
      return {
        closedHoles: { ...state.closedHoles, [holeIndex]: true },
        holeCounters: { ...state.holeCounters, [holeIndex]: 0 },
      };
    }),
}));

export default useGameStore;
