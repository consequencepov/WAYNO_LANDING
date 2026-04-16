import { motion } from 'framer-motion'
import { LayoutTemplate, Terminal, Layers, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { CtaModal } from '@/components/ui'

const CARDS = [
  {
    tag: 'Дизайн & Структура',
    title: 'Полный контроль холста',
    desc: 'Редактируйте каждый пиксель интерфейса. Никаких черных ящиков — чистый визуальный редактор.',
    icon: LayoutTemplate,
    color: 'from-accent/20 to-transparent',
    type: 'feature'
  },
  {
    tag: 'Стилевой Движок',
    title: 'Уникальная эстетика',
    desc: 'Мы не делаем клонов. Нейросеть генерирует уникальную палитру и типографику под ваш референс.',
    icon: Layers,
    color: 'from-blue-500/20 to-transparent',
    type: 'feature'
  },
  {
    tag: 'Export & Code',
    title: 'Чистый React код',
    desc: 'Готовый к деплою код с Tailwind CSS. Экспортируйте и продолжайте разработку у себя.',
    icon: Terminal,
    color: 'from-purple-500/20 to-transparent',
    type: 'feature'
  },
  {
    tag: 'Готовы начать?',
    title: 'Оставьте заявку',
    desc: 'Запустите свой проект уже сегодня с полным контролем над кодом и дизайном.',
    icon: ArrowRight,
    color: 'from-accent/30 to-transparent',
    type: 'form'
  }
]

export function MobileFeatures() {
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  return (
    <section className="relative py-20 bg-[#050505] z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="px-5 mb-10">
        <h2 className="text-3xl font-medium tracking-tight text-white leading-tight">
          Мощный движок<br />
          <span className="text-white/40 italic font-serif">в вашем кармане.</span>
        </h2>
      </div>

      {/* Horizontal Scroll Snap Cards for Mobile */}
      <div className="flex overflow-x-auto gap-4 px-5 pb-10 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {CARDS.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
            className={`min-w-[85vw] snap-center rounded-[2rem] bg-[#0a0a0c] border border-white/5 p-6 sm:p-8 flex flex-col relative overflow-hidden backdrop-blur-2xl ${
              card.type === 'form' ? 'ring-1 ring-accent/20' : ''
            }`}
          >
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${card.color} blur-[50px] pointer-events-none rounded-full mix-blend-screen opacity-60`} />
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative z-10 shadow-inner">
              <card.icon className={card.type === 'form' ? "w-6 h-6 text-accent" : "w-6 h-6 text-white"} />
            </div>

            <div className="mt-auto relative z-10 flex-1 flex flex-col justify-end">
              <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">
                {card.tag}
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 leading-tight">
                {card.title}
              </h3>
              
              {card.type === 'feature' ? (
                <p className="text-white/50 text-sm leading-relaxed pb-4">
                  {card.desc}
                </p>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <input 
                    type="email" 
                    placeholder="Ваш Email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-accent/50 transition-colors"
                  />
                  <button 
                    onClick={() => setIsCtaOpen(true)}
                    className="w-full bg-accent text-black font-semibold rounded-xl px-4 py-3 text-sm active:scale-95 transition-transform flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(212,255,0,0.2)]"
                  >
                    Запросить доступ
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {/* Extra spacing at the end so the last card can be fully centered */}
        <div className="min-w-[5vw]" />
      </div>

      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title="Запросить доступ" />
    </section>
  )
}