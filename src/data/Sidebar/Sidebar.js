import { create } from "zustand";

export const useSidebarStore = create((set) => {
  const initialCollapseState = localStorage.getItem("collapse") === "true";

  return {
    isCollapsed: initialCollapseState,
    isMobile: window.innerWidth < 768,

    setCollapsed: (value) => {
      localStorage.setItem("collapse", value);
      set({ isCollapsed: value });
    },
    handleResize: () => {
      const isMobile = window.innerWidth < 768;
      const storedValue = localStorage.getItem("collapse");
      const isCollapsed = isMobile ? true : storedValue === "true";
      set({ isMobile, isCollapsed });
    },
    toggleCollapse: () =>
      set((state) => {
        const newCollapsedState = !state.isCollapsed;
        localStorage.setItem("collapse", newCollapsedState);
        return { isCollapsed: newCollapsedState };
      }),
  };
});
