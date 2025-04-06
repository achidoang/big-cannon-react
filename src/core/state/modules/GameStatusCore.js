export const createGameStatusSlice = (set) => ({
  isInGame: false,
  gameFinished: false,
  repeatCount: 1,
  currentIteration: 0,

  startGame: () =>
    set((state) => {
      if (state.ballQueue.length === 0) return;
      return { isInGame: true, currentIteration: 1, gameFinished: false };
    }),

  setGameFinished: (value) => set({ gameFinished: value }),

  setRepeatCount: (count) => set({ repeatCount: count }),
});
