import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CtaModal } from '@/components/ui';

export function SectionCTA() {
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  return (
    <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center bg-[#0a0a0a] text-center px-4 sm:px-6 z-20 pb-16 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent pointer-events-none" />
      <motion.div 
        className="z-10 max-w-3xl flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          Собери. Запусти. Проверь.
        </h2>
        <p className="text-xl text-white/60 mb-12 font-medium">
          От дерзкой идеи до работающего продукта с конверсией. Без компромиссов в качестве.
        </p>
        
        <button 
          onClick={() => setIsCtaOpen(true)}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-surface-primary rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(212,255,0,0.3)] hover:shadow-[0_0_60px_rgba(212,255,0,0.5)]"
        >
          <span className="relative z-10">Создать проект</span>
          <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
        
        <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title="Создать проект" />
        
        <div className="h-16 md:h-32 w-full" /> 
      </motion.div>
    </section>
  );
}