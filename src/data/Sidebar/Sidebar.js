import { create } from "zustand";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const useSidebarStore = create((set) => ({
  isMobile: window.innerWidth < 768,

  handleResize: () => {
    const isMobile = window.innerWidth < 768;
    set({ isMobile });
  },

  collapsed: cookies.get("collapse") === "true", 
  setCollapsed: (value) => {
    set({ collapsed: value });
    cookies.set("collapse", value, {
      path: "/",
      domain: "d3o0qmvpbmut8f.cloudfront.net", 
      secure: true, 
      sameSite: "Strict", 
    }); 
  },
  toggleCollapse: () =>
    set((state) => {
      const newValue = !state.collapsed;
      cookies.set("collapse", newValue, {
        path: "/",
        domain: "d3o0qmvpbmut8f.cloudfront.net", 
        secure: true, 
        sameSite: "Strict", 
      }); 
      return { collapsed: newValue };
    }),
}));
