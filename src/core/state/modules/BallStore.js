// src/core/state/modules/BallStore.js

export const createBallSlice = (set) => ({
  balls: [],

  updateBallBodyId: (bodyId, ref) =>
    set((state) => ({
      balls: state.balls.map((ball) =>
        !ball.bodyId &&
        ref.current?.position.toArray().every((v, i) => v === ball.position[i])
          ? { ...ball, bodyId }
          : ball
      ),
    })),

  removeBallByBodyId: (id) =>
    set((state) => {
      const remaining = state.balls.filter((ball) => ball.bodyId !== id);
      return { balls: remaining };
    }),

  dropBall: () =>
    set((state) => {
      if (state.ballQueue.length === 0) {
        if (state.currentIteration < state.repeatCount) {
          return {
            ballQueue: [...state.ballQueueBackup],
            currentIteration: state.currentIteration + 1,
          };
        }
        return {
          isInGame: false,
          currentIteration: 0,
          gameFinished: true,
          balls: [],
        };
      }

      const [nextBall, ...remainingBalls] = state.ballQueue;
      const newBall = {
        id: Date.now(),
        position: [0, 3, 0],
        name: nextBall.name,
        bodyId: null,
      };

      return {
        balls: [...state.balls, newBall],
        ballQueue: remainingBalls,
      };
    }),
});
