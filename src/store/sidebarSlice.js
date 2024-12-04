import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed:
    typeof window !== "undefined"
      ? localStorage.getItem("collapse") === "true"
      : false,
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    initialize: (state) => {
      const storedValue = localStorage.getItem("collapse");
      if (storedValue !== null) {
        state.isCollapsed = storedValue === "true";
      }
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
      localStorage.setItem("collapse", state.isCollapsed);
    },
    setCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      localStorage.setItem("collapse", action.payload);
    },
    handleResize: (state) => {
      if (typeof window !== "undefined") {
        state.isMobile = window.innerWidth < 768;
        if (state.isMobile) {
          state.isCollapsed = true;
        }
      }
    },
  },
});

export const { initialize, toggleCollapse, setCollapsed, handleResize } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
