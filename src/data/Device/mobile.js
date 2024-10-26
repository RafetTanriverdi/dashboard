import { create } from "zustand";

export const useDeviceStore = create((set) => ({
  isMobile: window.innerWidth < 768,
  setIsMobile: (value) => set({ isMobile: value }),
  handleResize: () => {
    set({ isMobile: window.innerWidth < 768 });
  },
}));
