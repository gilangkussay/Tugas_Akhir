import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  created_at: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock login - in real app, validate with backend
        const user: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          phone: '08123456789',
          address: 'Jl. Sudirman No. 123, Jakarta',
          created_at: new Date().toISOString(),
        }
        
        set({ user, isAuthenticated: true })
        return true
      },
      
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock registration
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          created_at: new Date().toISOString(),
        }
        
        set({ user, isAuthenticated: true })
        return true
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
