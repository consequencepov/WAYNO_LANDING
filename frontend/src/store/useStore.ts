import { create } from 'zustand'
import type { BrandMode, ProjectCategory } from '@/types'

interface AppState {
  brandMode: BrandMode
  activeCategory: ProjectCategory | 'all'
  isMenuOpen: boolean
  isAuthenticated: boolean
  promptText: string
  isVideoReady: boolean
  startVideo: boolean
  setPromptText: (text: string) => void
  toggleBrandMode: () => void
  setActiveCategory: (cat: ProjectCategory | 'all') => void
  toggleMenu: () => void
  closeMenu: () => void
  setAuthenticated: (status: boolean) => void
  setVideoReady: (status: boolean) => void
  setStartVideo: (status: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  brandMode: 'professional',
  activeCategory: 'all',
  isMenuOpen: false,
  isAuthenticated: false,
  promptText: '',
  isVideoReady: false,
  startVideo: false,
  setPromptText: (text) => set({ promptText: text }),
  toggleBrandMode: () =>
    set((s) => ({
      brandMode: s.brandMode === 'professional' ? 'entrepreneur' : 'professional',
    })),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setVideoReady: (status) => set({ isVideoReady: status }),
  setStartVideo: (status) => set({ startVideo: status }),
}))
