import { motion } from 'framer-motion'
import { MarqueeText } from '@/components/ui/MarqueeText'

export function MobilePartners() {
  return (
    <section className="relative flex flex-col justify-center bg-[#050505] z-20 py-24 overflow-hidden border-t border-white/5">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-[#050505] to-[#050505] pointer-events-none" />
      
      <div className="relative z-10 w-full mb-12 flex flex-col items-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-[10px] uppercase tracking-[0.2em] mb-4 text-center"
        >
          Интеграции
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl font-medium tracking-tight text-center text-white"
        >
          Работает с тем, <br />
          что <span className="font-serif italic font-light text-white/40">вы любите</span>
        </motion.h2>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-4 transform -rotate-2 scale-105">
        <MarqueeText 
          text="REACT • NEXT.JS • VITE • TAILWIND • FRAMER MOTION •" 
          speed="normal" 
          className="text-3xl font-bold text-transparent text-stroke-white opacity-40"
        />
        <MarqueeText 
          text="TELEGRAM API • SUPABASE • FIREBASE • STRIPE • NODE.JS •" 
          speed="slow"
          className="text-3xl font-bold text-accent opacity-80"
        />
        <MarqueeText 
          text="FIGMA • WEBGL • THREE.JS • SPLINE • LENOX • TYPESCRIPT •" 
          speed="normal" 
          className="text-3xl font-bold text-transparent text-stroke-white opacity-40"
        />
      </div>
    </section>
  )
}