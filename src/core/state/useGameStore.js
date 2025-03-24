// src/core/state/useGameStore.js

import { create } from "zustand";

const useGameStore = create((set) => ({
  isInGame: false,
  ballQueue: [],
  balls: [],
  closedHoles: {},
  holeCounters: {},
  repeatCount: 1, // Menyimpan jumlah pengulangan game
  currentIteration: 0, // Iterasi game saat ini

  // Memulai game setelah daftar bola dibuat
  startGame: () =>
    set((state) => {
      if (state.ballQueue.length === 0) return;
      return { isInGame: true, currentIteration: 1 };
    }),

  // Menyimpan daftar bola sebelum game dimulai
  setBallQueue: (names) =>
    set({ ballQueue: names.map((name, index) => ({ id: index, name })) }),

  // Menyetel jumlah pengulangan
  setRepeatCount: (count) => set({ repeatCount: count }),

  // Menghapus daftar bola sebelum game dimulai
  clearBallQueue: () => set({ ballQueue: [] }),

  // Menjatuhkan bola pertama dalam daftar
  dropBall: () =>
    set((state) => {
      if (state.ballQueue.length === 0) {
        // Jika bola habis dan masih ada pengulangan, restart game
        if (state.currentIteration < state.repeatCount) {
          return {
            ballQueue: state.ballQueueBackup, // Mengembalikan urutan bola awal
            currentIteration: state.currentIteration + 1,
          };
        }
        return { isInGame: false, currentIteration: 0 }; // Selesai semua pengulangan
      }

      const [nextBall, ...remainingBalls] = state.ballQueue;
      const newBall = {
        id: Date.now(),
        position: [0, 3, 0],
        name: nextBall.name,
      };

      return {
        balls: [...state.balls, newBall],
        ballQueue: remainingBalls,
      };
    }),
}));

export default useGameStore;
