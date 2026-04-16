import { MobileHero } from './sections/MobileHero'
import { MobileFeatures } from './sections/MobileFeatures'
import { MobileCTA } from './sections/MobileCTA'
import { MobilePartners } from './sections/MobilePartners'
import { SeoCaseStudies } from '@/components/sections/SeoCaseStudies'
import { SeoClusters } from '@/components/sections/SeoClusters'

export function MobileHome() {
  // Mobile Home completely overwrites the layout with an optimized stacked interface
  return (
    <main className="relative bg-[#0a0a0a] min-h-screen overscroll-none pb-[env(safe-area-inset-bottom)]">
      <MobileHero />
      <MobileFeatures />
      <MobilePartners />
      <SeoCaseStudies compact />
      <SeoClusters compact />
      <MobileCTA />
    </main>
  )
}