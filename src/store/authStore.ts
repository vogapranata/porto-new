import { create } from 'zustand'
import type { AuthState } from '../types'
import * as authService from '../services/authService'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  signIn: async (email, password) => {
    const user = await authService.signIn(email, password)
    localStorage.setItem('admin_auth', 'true')
    set({ user, isAuthenticated: true })
  },

  signOut: async () => {
    await authService.signOut()
    localStorage.removeItem('admin_auth')
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const user = await authService.getCurrentUser()
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        const token = localStorage.getItem('admin_auth')
        if (token) {
          set({ isAuthenticated: true, isLoading: false })
        } else {
          set({ isAuthenticated: false, isLoading: false })
        }
      }
    } catch {
      set({ isAuthenticated: false, isLoading: false })
    }
  },
}))
