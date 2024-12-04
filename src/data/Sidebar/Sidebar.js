import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isCollapsed: false, // Varsayılan değer
  isMobile: window.innerWidth < 768,
  initialize: () => {
    const isCollapsed = localStorage.getItem("collapse") === "true";
    set({ isCollapsed });
  },
  setCollapsed: (value) => {
    localStorage.setItem("collapse", value);
    set({ isCollapsed: value });
  },
  handleResize: () => {
    const isMobile = window.innerWidth < 768;
    const isCollapsed = isMobile
      ? true
      : localStorage.getItem("collapse") === "true";
    set({ isMobile, isCollapsed });
  },
  toggleCollapse: () =>
    set((state) => {
      const newCollapsedState = !state.isCollapsed;
      localStorage.setItem("collapse", newCollapsedState);
      return { isCollapsed: newCollapsedState };
    }),
}));
