// src/core/state/useMusicStore.js
import { create } from "zustand";

const audio = new Audio("/public/sound/music.mp3");
audio.loop = true;
audio.volume = 0.5; // default volume

const useMusicStore = create((set, get) => ({
  isPlaying: false,
  volume: 0.5,

  toggleMusic: async () => {
    const { isPlaying } = get();
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (e) {
        console.error("Playback error:", e);
      }
    }
    set({ isPlaying: !isPlaying });
  },

  playMusic: async () => {
    try {
      await audio.play();
      set({ isPlaying: true });
    } catch (err) {
      console.error("Play error:", err);
    }
  },

  pauseMusic: () => {
    audio.pause();
    set({ isPlaying: false });
  },

  setVolume: (value) => {
    const vol = Math.max(0, Math.min(1, value)); // clamp
    audio.volume = vol;
    set({ volume: vol });
  },
}));

export default useMusicStore;
