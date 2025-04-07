// src/core/state/useGameStore.js

import { create } from "zustand";
import { createGameStatusSlice } from "./modules/GameStatusStore";
import { createBallQueueSlice } from "./modules/BallQueueStore";
import { createBallSlice } from "./modules/BallStore";
import { createHoleSlice } from "./modules/HoleStore";

const useGameStore = create((set) => ({
  ...createGameStatusSlice(set),
  ...createBallQueueSlice(set),
  ...createBallSlice(set),
  ...createHoleSlice(set),
}));

export default useGameStore;
