// src/core/state/modules/BallQueueStore.js

export const createBallQueueSlice = (set) => ({
  ballQueue: [],
  ballQueueBackup: [],

  setBallQueue: (names) =>
    set({
      ballQueue: names.map((name, index) => ({ id: index, name })),
      ballQueueBackup: names.map((name, index) => ({ id: index, name })),
    }),

  clearBallQueue: () =>
    set({
      ballQueue: [],
      ballQueueBackup: [],
    }),
});
