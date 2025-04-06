// src/core/state/modules/HoleStore.js

export const createHoleSlice = (set) => ({
  closedHoles: {},
  holeCounters: {},

  closeHole: (index) =>
    set((state) => ({
      closedHoles: {
        ...state.closedHoles,
        [index]: true,
      },
      holeCounters: {
        ...state.holeCounters,
        [index]: (state.holeCounters[index] || 0) + 1,
      },
    })),
});
