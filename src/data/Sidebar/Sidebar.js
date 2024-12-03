import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isCollapsed: false, 
  isMobile: window.innerWidth < 768,
  initialize: () => {
    const isCollapsed = localStorage.getItem("collapse") === "true";
    set({
      isCollapsed,
      isMobile: window.innerWidth < 768,
    });
  },
  setCollapsed: (value) => {
    localStorage.setItem("collapse", value);
    set({ isCollapsed: value });
  },
  handleResize: () => {
    const isMobile = window.innerWidth < 768;
    set({
      isMobile,
      isCollapsed: isMobile
        ? true
        : localStorage.getItem("collapse") === "true",
    });
  },
  toggleCollapse: () =>
    set((state) => {
      const newCollapsedState = !state.isCollapsed;
      localStorage.setItem("collapse", newCollapsedState);
      return { isCollapsed: newCollapsedState };
    }),
}));
