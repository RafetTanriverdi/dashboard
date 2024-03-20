import { create } from "zustand";

export const UseUserDataStore = create((set) => ({
  userData: {},
  setUserData: (userData) => set({ userData }),
}));
