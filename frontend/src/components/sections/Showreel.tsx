import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LOGO_STRIP_BRANDS } from '@/constants/clients'

export function Showreel() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="showreel" ref={ref} className="py-section">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading label="возможности">
          полный цикл <span className="font-serif italic text-accent">запуска</span>
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
