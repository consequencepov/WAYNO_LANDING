import { motion } from 'framer-motion'
import { MarqueeText } from '@/components/ui/MarqueeText'

export function PinSectionPartners() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#070707] z-20 py-section overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-surface-primary to-surface-primary pointer-events-none" />
      
      <div className="relative z-10 w-full mb-20 flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm uppercase tracking-widest mb-6"
        >
          Интеграции & Экосистема
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-heading-2 md:text-display-sm text-center max-w-4xl"
        >
          Работает с инструментами, которые <span className="font-serif italic font-normal text-content-muted">вы уже любите</span>
        </motion.h2>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6 transform -rotate-2">
        <MarqueeText 
          text="REACT • NEXT.JS • VITE • TAILWIND • FRAMER MOTION • GSAP •" 
          speed="normal" 
          className="text-4xl sm:text-5xl md:text-[4vw] font-bold text-transparent text-stroke-white opacity-40 hover:opacity-100 transition-opacity duration-500"
        />
        <MarqueeText 
          text="TELEGRAM API • SUPABASE • FIREBASE • STRIPE • NODE.JS •" 
          speed="slow"
          className="text-4xl sm:text-5xl md:text-[4vw] font-bold text-accent opacity-60 hover:opacity-100 transition-opacity duration-500"
        />
        <MarqueeText 
          text="FIGMA • WEBGL • THREE.JS • SPLINE • LENOX • TYPESCRIPT •" 
          speed="normal" 
          className="text-4xl sm:text-5xl md:text-[4vw] font-bold text-transparent text-stroke-white opacity-40 hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      
    </section>
  )
}
