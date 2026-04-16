# ⚠️ MANDATORY DOCUMENTATION RULE
# ANY change in code, architecture, dependencies, sections, components, styles, animations,
# routing, file structure, naming, assets, logic, UI behavior, implementation details,
# or library choices MUST immediately be reflected and recorded in this documentation file.
# This is mandatory and continuous. No code change is allowed to remain undocumented.

---

# WAYNO BLACK — Architecture Documentation (English)

## 1. Architecture Overview

WAYNO BLACK is a single-page React frontend application built with Vite + TypeScript. It implements a premium dark-themed creative agency website inspired by award-level design standards (Awwwards SOTD/SOTM quality).

**Project Structure**: Monorepo with `frontend/` (React SPA) and `backend/` (placeholder for future API).

**Core Architecture Pattern**: Component-based SPA with section composition.

```
frontend/
  index.html → main.tsx → App → BrowserRouter → Layout (Header + Outlet + Footer)
                                                    └→ Home → [Hero, Showreel, ClientTrust, Projects, Categories, Marquee]
```

## 2. Mental Model

The project follows a **section-driven composition** pattern:
- The `Home` page is a vertical stack of autonomous section components
- Each section manages its own animation state via `react-intersection-observer` + `framer-motion`
- Global state (brand mode, category filter) lives in Zustand
- Smooth scrolling is provided by Lenis at the app root
- Typography contrast comes from mixing sans-serif (Plus Jakarta Sans) and serif italic (Playfair Display)
- The grain overlay is a fixed CSS-only element with SVG noise texture

## 3. Dependency Map

```
React 18 ← react-dom, react-router-dom
Styling  ← Tailwind CSS 3.4, clsx, tailwind-merge
Motion   ← Framer Motion 11, GSAP 3.12
Scroll   ← Lenis 1.1
State    ← Zustand 5
Icons    ← Lucide React
Carousel ← Embla Carousel React 8
Observer ← react-intersection-observer 9
```

**Why each dependency:**
- `framer-motion`: Component-level animations, layout animations (tab indicator), stagger
- `gsap`: Reserved for ScrollTrigger-driven effects (not yet fully utilized, planned for polish phase)
- `lenis`: Smooth scroll matching reference site's scrolling feel
- `zustand`: Minimal global state without boilerplate
- `embla-carousel-react`: Lightweight, flexible carousel for Projects section
- `react-intersection-observer`: Trigger section animations on viewport entry

## 4. Section → Component Relationships

| Section | Component File | UI Dependencies | Data Dependencies |
|---------|---------------|-----------------|-------------------|
| Hero | `sections/Hero.tsx` | LogoToggle, ScrollIndicator, HeroTextSVG | `constants/site.ts` |
| PinSectionFeatures | `sections/PinSectionFeatures.tsx` | — | `store/useStore.ts` |
| PinSectionCards | `sections/PinSectionCards.tsx` | — | `store/useStore.ts` |
| PinSectionCatalog | `sections/PinSectionCatalog.tsx` | — | Local CONSTANTS |
| PinSectionPartners | `sections/PinSectionPartners.tsx` | MarqueeText | — |
| Auth | `pages/Auth.tsx` | AuthLayout, AuthForm, AuthInfographic | — |
| Header | `layout/Header.tsx` | — | `constants/site.ts`, `constants/navigation.ts` |
| FloatingPrompt | `ui/FloatingPrompt.tsx` | LogoToggle, PromptInput | `store/useStore.ts` |
| Footer | `layout/Footer.tsx` | — | `constants/site.ts`, `constants/navigation.ts`, `store/useStore.ts` |

## 5. Layout Logic

- **Container**: `max-w-[1440px]` centered, horizontal padding `px-6 md:px-12 lg:px-16`
- **Section spacing**: `py-section` = `clamp(6rem, 10vw, 10rem)` vertical padding
- **Grid**: CSS Grid for footer info, client logos. Flexbox for most layouts.
- **Full-bleed**: Marquee, logo strip, and grain overlay span full viewport width
- **Stacking**: `z-50` for header, `z-9999` for grain overlay, `z-10` for content above backgrounds

## 6. Reusable Primitives

| Primitive | Purpose | Props |
|-----------|---------|-------|
| `SectionHeading` | Section label + heading with in-view animation | `label?`, `children`, `className?` |
| `ProjectCard` | Numbered project card with color bg and hover | `project`, `index` |
| `TabFilter` | Animated category filter with layout-animated indicator | `categories`, `active`, `onSelect` |
| `MarqueeText` | Infinitely scrolling text strip | `text`, `className?`, `speed?` |
| `LogoToggle` | Creative/Engineering brand mode switch | `className?` |
| `ScrollIndicator` | Animated scroll-down cue | — |
| `GrainOverlay` | Fixed noise texture overlay | — |

## 7. Motion System

**Animation Library Allocation:**
- `framer-motion`: All component-level animations (entrance, hover, layout)
- `gsap`: Reserved for complex scroll choreography (future enhancement)
- CSS animations: Marquee, simple keyframes

**Standard Animation Config:**
```
Entrance:  duration 0.6-1.0s, ease [0.16, 1, 0.3, 1] (expo-out)
Stagger:   0.05-0.15s delay between children
Hover:     duration 0.3s, CSS transition
Marquee:   30s linear infinite CSS animation
Scroll:    Lenis, duration 1.2s, exponential easing
```

**Triggers:**
- Section entrance: `useInView` with `triggerOnce: true`
- Hero: Plays on mount with stagger
- Hover: CSS `:hover` or Framer Motion `whileHover`

## 8. Styling System

- **Framework**: Tailwind CSS 3.4 with custom theme extensions
- **Custom Tokens**: Defined in `tailwind.config.ts` (colors, fonts, spacing, animations, easing)
- **Utility Function**: `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge)
- **Global Styles**: `src/styles/globals.css` with `@layer base` resets and `@layer components` for grain overlay
- **No CSS Modules, no styled-components** — pure Tailwind utility classes

**Color Token Mapping:**
- `surface-*`: Background colors (primary, secondary, elevated)
- `content-*`: Text colors (primary, secondary, muted, inverse)
- `accent`: Sage/olive highlight color
- `border-*`: Border colors with opacity variants

## 9. Routing Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | `Home` | Main landing page (all sections) |
| `/auth` | `Auth` | Standalone split-screen authentication page |

Currently single-page. Router structure supports future multi-page expansion.

## 10. State Map

**Zustand Store** (`src/store/useStore.ts`):

| State | Type | Default | Used By |
|-------|------|---------|---------|
| `brandMode` | `'creative' \| 'engineering'` | `'creative'` | LogoToggle, Footer |
| `activeCategory` | `ProjectCategory \| 'all'` | `'all'` | Projects, TabFilter |
| `isMenuOpen` | `boolean` | `false` | Header (future mobile menu) |

## 11. Implementation Rules

1. All components use named exports (no default exports)
2. Path aliases use `@/` prefix (maps to `src/`)
3. Animations use expo-out easing `[0.16, 1, 0.3, 1]` as default
4. Section components trigger animations via `useInView` with `triggerOnce: true`
5. Colors, fonts, spacing use Tailwind tokens — no hardcoded values in components
6. Interactive elements must have `aria-label` attributes
7. All hover states use `transition-colors duration-300` minimum
8. Serif font (`font-serif`) used only for accent words in italic

## 12. Constraints

- No backend — frontend-only SPA
- No CMS integration (data is static in constants files)
- No proprietary code, text, or assets from reference site
- Video placeholder — no actual video assets
- Client logos — text-only placeholders
- Project images — solid color backgrounds as placeholders
- Fonts loaded via Google Fonts CDN (could be self-hosted later)

## 13. Current Status

| Phase | Status |
|-------|--------|
| Reference audit | ✅ Complete |
| DevTools inspection | ✅ Complete |
| Stack confirmation | ✅ Complete |
| Project structure | ✅ Complete (frontend/ + backend/) |
| Documentation (RU) | ✅ Complete |
| Documentation (EN) | ✅ Complete |
| Source code generation | ✅ Complete (setup.js → 37+ files in frontend/) |
| Auto-install + launch | ✅ Complete (setup.js auto-runs npm install + dev) |
| Dependencies installed | ⏳ Pending (run: node setup.js) |
| Dev server running | ⏳ Pending |
| Visual comparison | ⏳ Pending |
| Polish pass | ⏳ Pending |

**Bootstrap**: Run `node setup.js` from project root (or double-click `create_dirs.bat`). This creates all directories, writes all source files, copies config files into `frontend/`, runs `npm install`, and starts the dev server.

## 14. Progress Tracking

### Generated Files (37 total)
- [x] Core: main.tsx, vite-env.d.ts
- [x] Styles: globals.css
- [x] Lib: cn.ts
- [x] Types: index.ts
- [x] Constants: site.ts, navigation.ts, projects.ts, clients.ts
- [x] Store: useStore.ts
- [x] Hooks: useLenis.ts, useMediaQuery.ts, useScrollProgress.ts
- [x] App: App.tsx, Router.tsx
- [x] Pages: Home.tsx
- [x] Layout: Layout.tsx, Header.tsx, Footer.tsx, index.ts
- [x] UI: 7 components + index.ts
- [x] Sections: 6 sections + index.ts
- [x] Utils: index.ts
- [x] Public: favicon.svg

## 15. Known Issues / Gaps

1. **No GSAP ScrollTrigger integration yet** — Framer Motion handles all current animations. GSAP integration planned for scroll-choreographed effects during polish phase.
2. **No mobile menu** — Header hides nav links on mobile but doesn't have a hamburger menu yet.
3. **No real video** — Showreel section has a placeholder, not actual video playback.
4. **No real images** — Project cards use solid color backgrounds.
5. **No page transitions** — Single page app, transitions between pages not needed yet.
6. **No prefers-reduced-motion** — Should add media query to disable animations.
7. **Lenis singleton pattern** — Current implementation uses module-level singleton; could cause issues with HMR.

## 16. Improvement Opportunities

1. Add GSAP ScrollTrigger for parallax effects and scroll-driven section animations
2. Add mobile hamburger menu with full-screen overlay
3. Add WebGL/three.js hero background effect (subtle particle system or gradient mesh)
4. Add page transition animations for multi-page routing
5. Add cursor follower effect for premium feel
6. Add real video playback with custom player controls
7. Add image loading with blur-up placeholder technique
8. Self-host fonts for better performance
9. Add prefers-reduced-motion support
10. Add SEO meta tags and Open Graph data

## 17. Change Log

| Date | Change |
|------|--------|
| Current | Initial project generation: complete structure, all components, design system, configuration, documentation |
| [2026-03-17] | Added "Pricing" (Цены) dropdown in Header navigation. Created `/pricing` route with UXI design, split-screen layout (left info, right dynamic pricing card), and tab switcher for Pro, Business, and Custom plans. |
| 2026-03-17 | Replaced Hero top text with liquid-glass search input (`PromptInput`), redesigned `LogoToggle` & Header navigation with liquid-glass styling, added "Создать сайт" button, updated switch labels. |
| 2026-03-17 (Auth) | Created new standalone `/auth` route (login page) inspired by product login flows. Implemented `AuthLayout` (split-screen), `AuthForm` (Yandex + Email auth, glassmorphism), and `AuthInfographic` (animated cards showcase using Framer Motion). |

