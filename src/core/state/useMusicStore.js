// src/core/state/useMusicStore.js
import { create } from "zustand";

const audio = new Audio("/sound/music.mp3");
audio.loop = true;

const useMusicStore = create((set) => ({
  isPlaying: false,

  toggleMusic: async () => {
    set((state) => {
      if (state.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      return { isPlaying: !state.isPlaying };
    });
  },

  playMusic: async () => {
    try {
      await audio.play();
      set({ isPlaying: true });
    } catch (err) {
      console.error("Error playing music:", err);
    }
  },

  pauseMusic: () => {
    audio.pause();
    set({ isPlaying: false });
  },
}));

export default useMusicStore;
