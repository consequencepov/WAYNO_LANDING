import { lazy, Suspense } from 'react'
import { MobileHero } from './sections/MobileHero'
import { MobileFeatures } from './sections/MobileFeatures'
import { MobileCTA } from './sections/MobileCTA'
import { MobilePartners } from './sections/MobilePartners'

const SeoCaseStudies = lazy(() => import('@/components/sections/SeoCaseStudies').then(m => ({ default: m.SeoCaseStudies })))
const SeoClusters = lazy(() => import('@/components/sections/SeoClusters').then(m => ({ default: m.SeoClusters })))

export function MobileHome() {
  // Mobile Home completely overwrites the layout with an optimized stacked interface
  return (
    <main className="relative bg-[#0a0a0a] min-h-screen overscroll-none pb-[env(safe-area-inset-bottom)]">
      <MobileHero />
      <MobileFeatures />
      <MobilePartners />
      <Suspense fallback={null}>
        <SeoCaseStudies compact />
        <SeoClusters compact />
      </Suspense>
      <MobileCTA />
    </main>
  )
}