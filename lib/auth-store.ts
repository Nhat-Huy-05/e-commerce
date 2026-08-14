'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  username?: string | null;
  name: string;
  role: 'customer' | 'admin';
}

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      },
      isAdmin: () => get().user?.role === 'admin',
      isAuthenticated: () => get().user !== null,
    }),
    {
      name: 'nextjs-commerce-auth-storage',
    }
  )
);
