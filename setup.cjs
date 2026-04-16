// ═══════════════════════════════════════════════════════════════
// WAYNO BLACK — Full Project Generator
// Run:  node setup.js
// Then: npm install && npm run dev
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, 'frontend');

function write(f, c) {
  const full = path.join(BASE, f);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, c.replace(/^\n/, ''), 'utf8');
  console.log('  \u2713 ' + f);
}

console.log('\n\uD83D\uDE80 WAYNO BLACK \u2014 Generating project...\n');

// ═══════════════════════════════════════
// BACKEND PLACEHOLDER
// ═══════════════════════════════════════

fs.mkdirSync(path.join(__dirname, 'backend'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'backend', '.gitkeep'), '', 'utf8');
console.log('  \u2713 backend/.gitkeep');

// ═══════════════════════════════════════
// CONFIG FILES → frontend/
// ═══════════════════════════════════════

const rootConfigs = [
  'package.json', 'index.html', 'vite.config.ts',
  'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json',
  'tailwind.config.ts', 'postcss.config.js'
];
for (const f of rootConfigs) {
  const src = path.join(__dirname, f);
  if (fs.existsSync(src)) {
    const dest = path.join(BASE, f);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('  \u2713 frontend/' + f + ' (copied)');
  }
}

// ═══════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════

write('src/main.tsx',`import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app/App'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

write('src/vite-env.d.ts', `/// <reference types="vite/client" />
`);

// ═══════════════════════════════════════
// STYLES
// ═══════════════════════════════════════

write('src/styles/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: auto;
  }

  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background-color: #0A0A0A;
    color: #EDEDED;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background-color: rgba(200, 207, 160, 0.3);
    color: #EDEDED;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
  }

  img, video {
    max-width: 100%;
    display: block;
  }
}

@layer components {
  .grain-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
  }
}
`);

// ═══════════════════════════════════════
// LIB
// ═══════════════════════════════════════

write('src/lib/cn.ts', `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`);

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

write('src/types/index.ts', `export interface Project {
  id: string
  number: string
  title: string
  category: ProjectCategory
  description: string
  color: string
}

export interface NavLink {
  label: string
  href: string
}

export interface ClientBrand {
  name: string
  size: 'sm' | 'md' | 'lg'
}

export type BrandMode = 'creative' | 'engineering'
export type ProjectCategory = 'films' | 'design' | 'digital'
`);

// ═══════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════

write('src/constants/site.ts', `export const SITE = {
  name: 'WAYNO BLACK',
  tagline: 'we craft digital experiences',
  taglineAlt: 'с помощью ИИ',
  description: 'A creative & technology collective pushing boundaries in film, design, and digital.',
  email: 'hello@waynoblack.studio',
  phone: '+1 (212) 555-0147',
  offices: ['New York', 'London'] as const,
  social: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
  copyright: "wayno'26. all rights reserved.",
} as const
`);

write('src/constants/navigation.ts', `import type { NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'viewfinder', href: '#showreel' },
  { label: 'work', href: '#projects' },
  { label: 'about', href: '#categories' },
  { label: 'contact', href: '#footer' },
]

export const FOOTER_LINKS = {
  highlights: [
    { label: 'beyond projects', href: '#' },
    { label: 'our process', href: '#' },
    { label: 'contact', href: '#' },
  ],
} as const
`);

write('src/constants/projects.ts', `import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  { id: '1', number: '01', title: 'Midnight Bloom', category: 'films', description: 'Short film', color: '#2A1F3D' },
  { id: '2', number: '02', title: 'Urban Pulse', category: 'design', description: 'Brand identity', color: '#1F2A3D' },
  { id: '3', number: '03', title: 'Neon District', category: 'digital', description: 'Web experience', color: '#3D2A1F' },
  { id: '4', number: '04', title: 'Glass Canyon', category: 'films', description: 'Documentary', color: '#1F3D2A' },
  { id: '5', number: '05', title: 'Echo Chamber', category: 'design', description: 'Visual system', color: '#3D1F2A' },
  { id: '6', number: '06', title: 'Solar Drift', category: 'digital', description: 'Interactive', color: '#2A3D1F' },
  { id: '7', number: '07', title: 'Phantom Thread', category: 'films', description: 'Music video', color: '#1F2A2A' },
  { id: '8', number: '08', title: 'Mineral', category: 'design', description: 'Packaging', color: '#2A1F2A' },
  { id: '9', number: '09', title: 'Wavelength', category: 'digital', description: 'Platform', color: '#2A2A1F' },
  { id: '10', number: '10', title: 'Obsidian', category: 'films', description: 'Campaign', color: '#1F1F2A' },
  { id: '11', number: '11', title: 'Velvet Horizon', category: 'design', description: 'Art direction', color: '#2A1F1F' },
  { id: '12', number: '12', title: 'Cipher', category: 'digital', description: 'App design', color: '#1F2A1F' },
]

export const PROJECT_CATEGORIES = ['films', 'design', 'digital'] as const
`);

write('src/constants/clients.ts', `import type { ClientBrand } from '@/types'

export const CLIENTS: ClientBrand[] = [
  { name: 'Apex Studios', size: 'lg' },
  { name: 'Horizon Labs', size: 'md' },
  { name: 'Vertex', size: 'sm' },
  { name: 'Lumina Co', size: 'lg' },
  { name: 'Prism Digital', size: 'md' },
  { name: 'Atlas & Co', size: 'sm' },
  { name: 'Forge Creative', size: 'md' },
  { name: 'Onyx Media', size: 'lg' },
  { name: 'Zephyr', size: 'sm' },
]

export const LOGO_STRIP_BRANDS = [
  'Apex', 'Horizon', 'Vertex', 'Lumina', 'Prism',
  'Atlas', 'Forge', 'Onyx', 'Zephyr', 'Nova',
]
`);

// ═══════════════════════════════════════
// STORE
// ═══════════════════════════════════════

write('src/store/useStore.ts', `import { create } from 'zustand'
import type { BrandMode, ProjectCategory } from '@/types'

interface AppState {
  brandMode: BrandMode
  activeCategory: ProjectCategory | 'all'
  isMenuOpen: boolean
  toggleBrandMode: () => void
  setActiveCategory: (cat: ProjectCategory | 'all') => void
  toggleMenu: () => void
  closeMenu: () => void
}

export const useStore = create<AppState>((set) => ({
  brandMode: 'creative',
  activeCategory: 'all',
  isMenuOpen: false,
  toggleBrandMode: () =>
    set((s) => ({
      brandMode: s.brandMode === 'creative' ? 'engineering' : 'creative',
    })),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}))
`);

// ═══════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════

write('src/hooks/useLenis.ts', `import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    if (lenisInstance) return

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenisInstance?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}
`);

write('src/hooks/useMediaQuery.ts', `import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(max-width: 1023px)')
`);

write('src/hooks/useScrollProgress.ts', `import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
`);

// ═══════════════════════════════════════
// APP
// ═══════════════════════════════════════

write('src/app/App.tsx', `import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import { useLenis } from '@/hooks/useLenis'

function AppInner() {
  useLenis()
  return <AppRouter />
}

export function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
`);

write('src/app/Router.tsx', `import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Home } from '@/pages/Home'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
`);

// ═══════════════════════════════════════
// PAGES
// ═══════════════════════════════════════

write('src/pages/Home.tsx', `import { Hero } from '@/components/sections/Hero'
import { Showreel } from '@/components/sections/Showreel'
import { ClientTrust } from '@/components/sections/ClientTrust'
import { Projects } from '@/components/sections/Projects'
import { Categories } from '@/components/sections/Categories'
import { Marquee } from '@/components/sections/Marquee'

export function Home() {
  return (
    <main>
      <Hero />
      <Showreel />
      <ClientTrust />
      <Projects />
      <Categories />
      <Marquee />
    </main>
  )
}
`);

// ═══════════════════════════════════════
// LAYOUT COMPONENTS
// ═══════════════════════════════════════

write('src/components/layout/index.ts', `export { Layout } from './Layout'
export { Header } from './Header'
export { Footer } from './Footer'
`);

write('src/components/layout/Layout.tsx', `import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
`);

write('src/components/layout/Header.tsx', `import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { SITE } from '@/constants/site'
import { NAV_LINKS } from '@/constants/navigation'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-600',
        scrolled
          ? 'bg-surface-primary/80 backdrop-blur-xl border-b border-border-subtle'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-container mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16 h-16 md:h-20">
        <a href="/" className="text-label uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors duration-300">
          {SITE.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#footer"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-content-primary text-content-inverse text-body-sm font-medium rounded-pill hover:bg-accent transition-all duration-300"
        >
          start a project
        </a>
      </div>
    </motion.header>
  )
}
`);

write('src/components/layout/Footer.tsx', `import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, ArrowUp, Instagram, Youtube, Linkedin } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SITE } from '@/constants/site'
import { FOOTER_LINKS } from '@/constants/navigation'
import { useStore } from '@/store/useStore'

export function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { brandMode, toggleBrandMode } = useStore()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="footer" ref={ref} className="relative bg-surface-primary border-t border-border-subtle">
      {/* CTA */}
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-section">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display leading-tight max-w-2xl"
          >
            {"let's create something "}
            <span className="font-bold">EXTRAORDINARY</span>{' '}
            <span className="font-serif italic text-accent">together.</span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={toggleBrandMode}
            className="flex items-center gap-3 text-body-sm text-content-secondary"
          >
            <span className={cn(brandMode === 'creative' && 'text-content-primary')}>wayno creative</span>
            <div className="relative w-12 h-6 bg-surface-elevated rounded-full border border-border">
              <div className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-accent transition-transform duration-300',
                brandMode === 'engineering' ? 'translate-x-6' : 'translate-x-0.5'
              )} />
            </div>
            <span className={cn(brandMode === 'engineering' && 'text-content-primary')}>wayno engineering</span>
          </motion.button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="border-t border-border-subtle">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">highlights</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.highlights.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-300 inline-flex items-center gap-1">
                      {link.label} <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">time</h4>
              <div className="space-y-1 text-body-sm text-content-secondary">
                <p>EST &mdash; New York</p>
                <p>GMT &mdash; London</p>
              </div>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">reach out</h4>
              <div className="space-y-1 text-body-sm text-content-secondary">
                <a href={'mailto:' + SITE.email} className="block hover:text-content-primary transition-colors duration-300">{SITE.email}</a>
                <p>{SITE.phone}</p>
              </div>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">offices</h4>
              <p className="text-body-sm text-content-secondary">{SITE.offices.join(' | ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, label: 'Instagram', href: SITE.social.instagram },
              { icon: Youtube, label: 'YouTube', href: SITE.social.youtube },
              { icon: Linkedin, label: 'LinkedIn', href: SITE.social.linkedin },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="text-content-muted hover:text-content-primary transition-colors duration-300" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-label text-content-muted">&copy; {SITE.copyright}</p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
`);

// ═══════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════

write('src/components/ui/index.ts', `export { GrainOverlay } from './GrainOverlay'
export { SectionHeading } from './SectionHeading'
export { ProjectCard } from './ProjectCard'
export { TabFilter } from './TabFilter'
export { MarqueeText } from './MarqueeText'
export { LogoToggle } from './LogoToggle'
export { ScrollIndicator } from './ScrollIndicator'
`);

write('src/components/ui/GrainOverlay.tsx', `export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}
`);

write('src/components/ui/SectionHeading.tsx', `import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  label?: string
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ label, children, className }: SectionHeadingProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className={cn('mb-12 md:mb-16', className)}>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-label uppercase tracking-widest text-content-muted mb-4"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-heading-1"
      >
        {children}
      </motion.h2>
    </div>
  )
}
`);

write('src/components/ui/ProjectCard.tsx', `import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="group flex-shrink-0 w-[280px] md:w-[360px] cursor-pointer"
    >
      <div
        className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative"
        style={{ backgroundColor: project.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-4 left-4 text-[72px] md:text-[96px] font-light leading-none text-white/[0.07] font-serif select-none">
          {project.number}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-body font-medium group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-body-sm text-content-muted mt-1">{project.description}</p>
        </div>
        <span className="text-label uppercase text-content-muted flex-shrink-0">{project.category}</span>
      </div>
    </motion.article>
  )
}
`);

write('src/components/ui/TabFilter.tsx', `import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface TabFilterProps {
  categories: readonly string[]
  active: string
  onSelect: (cat: string) => void
}

export function TabFilter({ categories, active, onSelect }: TabFilterProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-surface-secondary border border-border-subtle">
      {['all', ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            'relative px-4 py-2 text-body-sm capitalize rounded-full transition-colors duration-300',
            active === cat ? 'text-content-primary' : 'text-content-muted hover:text-content-secondary'
          )}
        >
          {active === cat && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-surface-elevated rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  )
}
`);

write('src/components/ui/MarqueeText.tsx', `import { cn } from '@/lib/cn'

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: 'normal' | 'slow'
}

export function MarqueeText({ text, className, speed = 'normal' }: MarqueeTextProps) {
  const separator = ' \\u2022 '
  const content = Array.from({ length: 8 }, () => text).join(separator) + separator

  return (
    <div className={cn('overflow-hidden whitespace-nowrap select-none', className)}>
      <div className={cn(
        'inline-flex',
        speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'
      )}>
        <span className="inline-block px-4">{content}</span>
        <span className="inline-block px-4">{content}</span>
      </div>
    </div>
  )
}
`);

write('src/components/ui/LogoToggle.tsx', `import { cn } from '@/lib/cn'
import { useStore } from '@/store/useStore'

interface LogoToggleProps {
  className?: string
}

export function LogoToggle({ className }: LogoToggleProps) {
  const { brandMode, toggleBrandMode } = useStore()

  return (
    <button
      onClick={toggleBrandMode}
      className={cn('flex items-center gap-3 text-body-sm', className)}
      aria-label="Toggle brand mode"
    >
      <span className={cn(
        'transition-colors duration-300',
        brandMode === 'creative' ? 'text-content-primary' : 'text-content-muted'
      )}>
        wayno creative
      </span>
      <div className="relative w-12 h-6 bg-surface-elevated rounded-full border border-border">
        <div className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full bg-accent transition-transform duration-300',
          brandMode === 'engineering' ? 'translate-x-6' : 'translate-x-0.5'
        )} />
      </div>
      <span className={cn(
        'transition-colors duration-300',
        brandMode === 'engineering' ? 'text-content-primary' : 'text-content-muted'
      )}>
        wayno engineering
      </span>
    </button>
  )
}
`);

write('src/components/ui/ScrollIndicator.tsx', `import { motion } from 'framer-motion'

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-label uppercase tracking-widest text-content-muted">scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="w-px h-8 bg-gradient-to-b from-content-muted to-transparent"
      />
    </motion.div>
  )
}
`);

// ═══════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════

write('src/components/sections/index.ts', `export { Hero } from './Hero'
export { Showreel } from './Showreel'
export { ClientTrust } from './ClientTrust'
export { Projects } from './Projects'
export { Categories } from './Categories'
export { Marquee } from './Marquee'
`);

write('src/components/sections/Hero.tsx', `import { motion } from 'framer-motion'
import { SITE } from '@/constants/site'
import { LogoToggle } from '@/components/ui/LogoToggle'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,207,160,0.04),transparent_70%)]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.p variants={fadeUp} className="text-label uppercase tracking-[0.3em] text-content-muted mb-6">
          {SITE.name}
        </motion.p>

        <motion.h1 variants={fadeUp} className="text-display-xl font-light mb-4 text-balance">
          {SITE.tagline}
        </motion.h1>

        <motion.p variants={fadeUp} className="text-heading-3 font-serif italic text-accent mb-12">
          {SITE.taglineAlt}
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center">
          <LogoToggle />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
`);

write('src/components/sections/Showreel.tsx', `import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LOGO_STRIP_BRANDS } from '@/constants/clients'

export function Showreel() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="showreel" ref={ref} className="py-section">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading label="watch the reel">
          our finest <span className="font-serif italic text-accent">scenes</span>
        </SectionHeading>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video bg-surface-secondary rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-content-primary/10 backdrop-blur-sm border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Play size={28} className="text-content-primary ml-1" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logo Strip */}
      <div className="mt-16 overflow-hidden border-y border-border-subtle py-6">
        <div className="flex animate-marquee">
          {[...LOGO_STRIP_BRANDS, ...LOGO_STRIP_BRANDS].map((brand, i) => (
            <div key={i} className="flex-shrink-0 px-8 md:px-12 flex items-center">
              <span className="text-body-sm uppercase tracking-[0.15em] text-content-muted/40 whitespace-nowrap font-medium">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`);

write('src/components/sections/ClientTrust.tsx', `import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CLIENTS } from '@/constants/clients'
import { cn } from '@/lib/cn'

const sizeClasses = {
  sm: 'text-body-sm',
  md: 'text-heading-3',
  lg: 'text-heading-2',
} as const

export function ClientTrust() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section ref={ref} className="py-section bg-surface-secondary/50">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading>
          trusted by <span className="font-serif italic text-accent">visionaries</span>
        </SectionHeading>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center min-h-[280px] py-8">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={cn(
                'text-content-muted/40 hover:text-content-secondary transition-colors duration-500 font-light cursor-default',
                sizeClasses[client.size]
              )}
            >
              {client.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
`);

write('src/components/sections/Projects.tsx', `import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { TabFilter } from '@/components/ui/TabFilter'
import { PROJECTS, PROJECT_CATEGORIES } from '@/constants/projects'
import { useStore } from '@/store/useStore'

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { activeCategory, setActiveCategory } = useStore()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={ref} className="py-section relative">
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading label="selected" className="mb-0">
            our <span className="font-serif italic text-accent">work</span>
          </SectionHeading>
          <TabFilter
            categories={PROJECT_CATEGORIES}
            active={activeCategory}
            onSelect={(cat) => setActiveCategory(cat as 'all' | 'films' | 'design' | 'digital')}
          />
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-8"
        >
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <a href="#" className="text-body-sm text-content-secondary hover:text-accent transition-colors duration-300">
            see all projects &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
`);

write('src/components/sections/Categories.tsx', `import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/cn'

const CATEGORIES = [
  { title: 'FILMS', description: 'Cinematic storytelling that moves audiences' },
  { title: 'DESIGN', description: 'Visual systems that define brands' },
  { title: 'DIGITAL', description: 'Experiences that push boundaries' },
]

export function Categories() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="categories" ref={ref} className="py-section-sm">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'group border-b border-border-subtle py-12 md:py-16 flex items-center justify-between cursor-pointer',
              'hover:border-accent transition-colors duration-500',
              i === 0 && 'border-t'
            )}
          >
            <h3 className="font-serif text-display font-bold tracking-tight group-hover:text-accent transition-colors duration-500">
              {cat.title}
            </h3>
            <p className="hidden md:block text-body text-content-muted group-hover:text-content-secondary transition-colors duration-500 max-w-sm text-right">
              {cat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
`);

write('src/components/sections/Marquee.tsx', `import { MarqueeText } from '@/components/ui/MarqueeText'

export function Marquee() {
  return (
    <section className="py-10 md:py-14 border-y border-border-subtle overflow-hidden">
      <MarqueeText
        text="defy the expected"
        className="text-display font-serif font-bold text-content-primary/[0.08]"
      />
    </section>
  )
}
`);

// ═══════════════════════════════════════
// UTILS
// ═══════════════════════════════════════

write('src/utils/index.ts', `export function formatNumber(n: number, digits = 2): string {
  return String(n).padStart(digits, '0')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
`);

// ═══════════════════════════════════════
// FEATURES (placeholder)
// ═══════════════════════════════════════

write('src/features/.gitkeep', '');

// ═══════════════════════════════════════
// PUBLIC ASSETS
// ═══════════════════════════════════════

write('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0A0A0A"/>
  <text x="16" y="22" text-anchor="middle" fill="#EDEDED" font-family="system-ui" font-size="16" font-weight="700">W</text>
</svg>
`);

write('public/fonts/.gitkeep', '');

// ═══════════════════════════════════════
console.log('\n\u2705 All 37+ source files generated!');
console.log('  frontend/  \u2190 React app (all source + config)');
console.log('  backend/   \u2190 placeholder for future API\n');

// ═══════════════════════════════════════
// AUTO INSTALL & LAUNCH
// ═══════════════════════════════════════

const { execSync, spawn } = require('child_process');

console.log('\uD83D\uDCE6 Installing dependencies in frontend/...\n');
try {
  execSync('npm install', { cwd: BASE, stdio: 'inherit' });
  console.log('\n\u2705 Dependencies installed!\n');

  console.log('\uD83D\uDE80 Starting dev server...\n');
  const dev = spawn(/^win/i.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    cwd: BASE,
    stdio: 'inherit',
    shell: true,
  });
  dev.on('error', (err) => {
    console.error('Failed to start dev server:', err.message);
    console.log('Run manually: cd frontend && npm run dev');
  });
} catch (err) {
  console.error('\n\u274C npm install failed:', err.message);
  console.log('\nRun manually:');
  console.log('  cd frontend');
  console.log('  npm install');
  console.log('  npm run dev\n');
}
