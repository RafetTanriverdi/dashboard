import { create } from "zustand";

export const useThemeChangeStore = create((set) => ({
    theme:true,
    setTheme: (theme) => set({theme}),
    changeTheme: () => set((state) => ({theme: !state.theme})),
}))