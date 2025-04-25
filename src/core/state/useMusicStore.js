// src/core/state/useMusicStore.js
import { create } from "zustand";

const useMusicStore = create((set, get) => ({
  isPlaying: false,
  volume: 0.5,
  audio: null, // simpan objek audio di state

  initAudio: () => {
    if (!get().audio) {
      const audio = new Audio("/sound/music.mp3");
      audio.loop = true;
      audio.volume = get().volume;
      set({ audio });
    }
  },

  toggleMusic: async () => {
    const { isPlaying, audio } = get();
    if (!audio) return;

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
    const audio = get().audio;
    if (!audio) return;

    try {
      await audio.play();
      set({ isPlaying: true });
    } catch (err) {
      console.error("Play error:", err);
    }
  },

  pauseMusic: () => {
    const audio = get().audio;
    if (!audio) return;
    audio.pause();
    set({ isPlaying: false });
  },

  setVolume: (value) => {
    const vol = Math.max(0, Math.min(1, value));
    const audio = get().audio;
    if (audio) audio.volume = vol;
    set({ volume: vol });
  },
}));

export default useMusicStore;
