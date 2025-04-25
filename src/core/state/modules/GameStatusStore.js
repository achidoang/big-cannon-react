// src/core/state/modules/GameStatusStore.js

export const createGameStatusSlice = (set) => ({
  isInGame: false,
  gameFinished: false,
  repeatCount: 1,
  currentIteration: 0,
  selectedTheme: "Action", // default
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),

  startGame: () =>
    set((state) => {
      if (state.ballQueue.length === 0) return;
      state.resetHoles?.();

      return { isInGame: true, currentIteration: 1, gameFinished: false };
    }),

  setGameFinished: (value) => set({ gameFinished: value }),

  setRepeatCount: (count) => set({ repeatCount: count }),
});
