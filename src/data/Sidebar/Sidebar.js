import { create } from "zustand";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const useSidebarStore = create((set) => ({
  isMobile: window.innerWidth < 768,

  handleResize: () => {
    const isMobile = window.innerWidth < 768;
    set({ isMobile });
  },

  collapsed: cookies.get("collapse") === "true", // Cookie'den başlangıç değeri
  setCollapsed: (value) => {
    set({ collapsed: value });
    cookies.set("collapse", value, { path: "/" }); // Cookie'ye yaz
  },
  toggleCollapse: () =>
    set((state) => {
      const newValue = !state.collapsed;
      cookies.set("collapse", newValue, { path: "/" }); // Cookie'ye yaz
      return { collapsed: newValue };
    }),
}));
