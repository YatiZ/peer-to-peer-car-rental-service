"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/services/auth/type";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null });
      },
      setLoading: (loading) => set({ isLoading: loading }),
      initializeAuth: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: "drive-easy-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
