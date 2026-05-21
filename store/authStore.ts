import { create } from "zustand";

export type UserRole = "admin" | "agent" | "builder" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  companyName?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (user, token) => 
    set({ user, token, isAuthenticated: true, error: null }),
    
  logout: () => 
    set({ user: null, token: null, isAuthenticated: false, error: null }),
    
  updateUser: (updatedFields) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedFields } : null,
    })),
    
  setError: (error) => set({ error }),
  
  setLoading: (isLoading) => set({ isLoading }),
}));
