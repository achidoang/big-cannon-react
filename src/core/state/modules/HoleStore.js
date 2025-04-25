// src/core/state/modules/HoleStore.js

export const createHoleSlice = (set) => ({
  closedHoles: {},
  holeCounters: {},

  showHolePopup: false,
  holeMessage: "",

  setHolePopup: (show, message = "") =>
    set(() => ({
      showHolePopup: show,
      holeMessage: message,
    })),

  closeHole: (index) =>
    set((state) => ({
      closedHoles: {
        ...state.closedHoles,
        [index]: true,
      },
      holeCounters: {
        ...state.holeCounters,
        [index]: 0, // Mulai counter dari nol saat lubang ditutup
      },
    })),

  incrementHoleCounters: () =>
    set((state) => {
      const updatedCounters = {};
      const updatedClosedHoles = { ...state.closedHoles };

      for (const index in state.closedHoles) {
        if (state.closedHoles[index]) {
          const count = (state.holeCounters[index] || 0) + 1;
          updatedCounters[index] = count;

          if (count >= 5) {
            updatedClosedHoles[index] = false;
            updatedCounters[index] = 0;
          }
        }
      }

      return {
        holeCounters: {
          ...state.holeCounters,
          ...updatedCounters,
        },
        closedHoles: updatedClosedHoles,
      };
    }),

  resetHoles: () =>
    set(() => ({
      closedHoles: {},
      holeCounters: {},
    })),
});
