import { create } from 'zustand'
import type { BrandMode, ProjectCategory } from '@/types'

interface AppState {
  brandMode: BrandMode
  activeCategory: ProjectCategory | 'all'
  isMenuOpen: boolean
  isAuthenticated: boolean
  promptText: string
  setPromptText: (text: string) => void
  toggleBrandMode: () => void
  setActiveCategory: (cat: ProjectCategory | 'all') => void
  toggleMenu: () => void
  closeMenu: () => void
  setAuthenticated: (status: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  brandMode: 'professional',
  activeCategory: 'all',
  isMenuOpen: false,
  isAuthenticated: false,
  promptText: '',
  setPromptText: (text) => set({ promptText: text }),
  toggleBrandMode: () =>
    set((s) => ({
      brandMode: s.brandMode === 'professional' ? 'entrepreneur' : 'professional',
    })),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
}))
