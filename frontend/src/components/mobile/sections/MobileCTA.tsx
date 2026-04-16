import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { CtaModal } from '@/components/ui'

export function MobileCTA() {
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  return (
    <section className="relative py-28 bg-[#0a0a0a] px-5 text-center overflow-hidden z-10 rounded-t-[2.5rem] mt-[-2rem] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="w-16 h-16 mx-auto mb-8 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(200,207,160,0.1)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-4xl font-medium tracking-tighter text-white mb-4 leading-tight">
          Собери. <br />
          Запусти. <br />
          <span className="text-accent italic font-serif opacity-90">Проверь.</span>
        </h2>
        
        <p className="text-sm text-white/50 mb-10 pb-8 px-4 font-light leading-relaxed">
          От дерзкой идеи до работающего продукта с высочайшей конверсией.
        </p>

        <button 
          onClick={() => setIsCtaOpen(true)}
          className="w-full relative flex items-center justify-center gap-3 px-6 py-4 bg-accent text-black rounded-2xl font-semibold text-[15px] active:scale-95 transition-transform shadow-[0_0_40px_rgba(212,255,0,0.25)]"
        >
          Начать проект
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
      
      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title="Начать проект" />
    </section>
  )
}