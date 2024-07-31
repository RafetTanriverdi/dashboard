import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: null,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),    
  
}));

