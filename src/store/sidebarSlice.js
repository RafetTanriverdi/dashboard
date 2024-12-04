import { createSlice } from "@reduxjs/toolkit";


const getLocalStorageValue = (key, defaultValue) => {
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      return localStorage.getItem(key) === "true";
    }
    return defaultValue;
  };
  

const initialState = {
  isCollapsed: getLocalStorageValue("collapse", false), 
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
};



const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    initialize: (state) => {
      state.isCollapsed = getLocalStorageValue("collapse", false);
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
      if (typeof window !== "undefined") {
        localStorage.setItem("collapse", state.isCollapsed);
      }
    },
    setCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("collapse", action.payload);
      }
    },
    handleResize: (state) => {
      if (typeof window !== "undefined") {
        state.isMobile = window.innerWidth < 768;
        state.isCollapsed = state.isMobile
          ? true
          : getLocalStorageValue("collapse", false);
      }
    },
  },
});

export const { initialize, toggleCollapse, setCollapsed, handleResize } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
