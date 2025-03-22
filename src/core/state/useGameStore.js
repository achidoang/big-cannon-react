// src/core/state/useGameStore.js

import { create } from "zustand";

const useGameStore = create((set) => ({
  isInGame: false, // Menentukan apakah pengguna masih di menu utama atau sudah masuk game
  ballQueue: [], // Menyimpan daftar bola yang akan dijatuhkan
  balls: [],
  closedHoles: {}, // Menyimpan status lubang (true jika tertutup)
  holeCounters: {}, // Menyimpan jumlah bola yang sudah dijatuhkan sejak lubang tertutup

  // Memulai game setelah daftar bola dibuat
  startGame: () =>
    set((state) => {
      if (state.ballQueue.length === 0) return; // Cegah start jika tidak ada bola
      return { isInGame: true };
    }),

  // Menyimpan daftar bola sebelum game dimulai
  setBallQueue: (names) =>
    set({ ballQueue: names.map((name, index) => ({ id: index, name })) }),

  // Menghapus daftar bola sebelum game dimulai
  clearBallQueue: () => set({ ballQueue: [] }),

  // Menjatuhkan bola pertama dalam daftar
  dropBall: () =>
    set((state) => {
      if (state.ballQueue.length === 0) return state; // Tidak bisa drop jika tidak ada bola

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

  removeBall: (ballId) =>
    set((state) => ({
      balls: state.balls.filter((ball) => ball.id !== ballId),
    })),

  // Tutup lubang jika bola masuk
  closeHole: (holeIndex) =>
    set((state) => ({
      closedHoles: { ...state.closedHoles, [holeIndex]: true },
      holeCounters: { ...state.holeCounters, [holeIndex]: 0 },
    })),
}));

export default useGameStore;
