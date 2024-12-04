import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: localStorage.getItem("collapse") === "true" || false,
  isMobile: window.innerWidth < 768,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    initialize: (state) => {
      const storedValue = localStorage.getItem("collapse");
      state.isCollapsed = storedValue === "true";
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
      state.isMobile = window.innerWidth < 768;
      const storedValue = localStorage.getItem("collapse");
      state.isCollapsed = state.isMobile ? true : storedValue === "true";
    },
  },
});

export const {
  initialize,
  toggleCollapse,
  setCollapsed,
  handleResize,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
