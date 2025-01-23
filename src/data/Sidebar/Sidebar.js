import { create } from "zustand";

export const useSidebarStore = create((set) => {
  const rehydrateState = () => {
    const isCollapsed = localStorage.getItem("collapse") === "true";
    const isMobile = window.innerWidth < 768;
    return { isCollapsed, isMobile };
  };

  return {
    ...rehydrateState(),
    setCollapsed: (value) => {
      localStorage.setItem("collapse", value);
      set({ isCollapsed: value });
    },
    handleResize: () => {
      const isMobile = window.innerWidth < 768;
      set({ isMobile });
    },
    toggleCollapse: () =>
      set((state) => {
        const newCollapsedState = !state.isCollapsed;
        localStorage.setItem("collapse", newCollapsedState);
        return { isCollapsed: newCollapsedState };
      }),
  };
});
