import { motion } from 'framer-motion';
import { Lock, ChevronRight, Terminal, CheckCircle2, LayoutTemplate } from 'lucide-react';

import { CtaModal } from '@/components/ui';
import { useState } from 'react';

const STEPS = [
  {
    id: '01',
    tag: 'Функция для старта',
    title: 'Не просто копируем сайт по URL',
    desc: 'Мы глубоко анализируем структуру, сетку и бизнес-логику референса, бережно адаптируя их под вашу уникальную концепцию и задачи.',
    cta: 'Начать бесплатно'
  },
  {
    id: '02',
    tag: 'Функция для популяризации',
    title: 'Создаем уникальный визуальный язык',
    desc: 'Никакого прямого плагиата. Нейросеть генерирует современный дизайн-код, типографику и палитру, которые выделят ваш бренд среди конкурентов.',
    cta: 'Запустить пилот'
  },
  {
    id: '03',
    tag: 'Функция для масштабирования',
    title: 'Получаете чистый код, готовый к деплою',
    desc: 'Мгновенный экспорт в React/Tailwind. Вы получаете не просто макет, а работающий интерфейс с продуманным UX и адаптивной версткой.',
    cta: 'Получить доступ'
  }
];

function Card({ step, index }: { step: typeof STEPS[0], index: number }) {
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  // Different button styles based on index for unique visual design
  const getBtnStyles = (idx: number) => {
    if (idx === 0) return "bg-white/5 border-white/10 hover:bg-white text-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]";
    if (idx === 1) return "bg-accent/10 border-accent/20 hover:bg-accent text-accent hover:text-surface-primary shadow-[0_0_20px_rgba(212,255,0,0.05)] hover:shadow-[0_0_30px_rgba(212,255,0,0.2)]";
    return "bg-gradient-to-r from-white/5 to-white/10 border-white/10 hover:from-white/10 hover:to-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-100px' }}
      style={{ top: `calc(15vh + ${index * 40}px)` }}
      className="relative lg:sticky w-full max-w-5xl mx-auto rounded-[2.5rem] border border-white/[0.08] bg-[#0c0c0e] p-6 sm:p-8 md:p-14 shadow-[0_0_80px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
    >
      <div className="lg:w-[45%] space-y-6">
        <div className="text-accent text-[11px] uppercase tracking-widest font-mono opacity-80">
          {step.tag}
        </div>
        <h3 className="text-3xl md:text-3xl font-medium text-white leading-tight tracking-tight">
          {step.title}
        </h3>
        <p className="text-white/50 leading-relaxed text-lg font-light mb-2">
          {step.desc}
        </p>
        <button 
          onClick={() => setIsCtaOpen(true)}
          className={`group flex items-center gap-3 px-7 py-3.5 border rounded-full text-sm font-medium transition-all duration-500 ease-out active:scale-95 ${getBtnStyles(index)}`}
        >
          {step.cta}
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title={step.cta} />
      </div>
      <div className="lg:w-[55%] w-full aspect-[4/3] bg-[#050505] rounded-[2rem] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-inner">
        
        {index === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="w-full h-full relative bg-[#131316] overflow-hidden flex flex-col"
          >
            <div className="h-12 border-b border-white/10 bg-[#0a0a0c] flex items-center px-4 gap-3 relative z-10 w-full shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="mx-auto flex items-center justify-center gap-2 bg-[#131316] border border-white/10 rounded-md px-3 py-1.5 text-xs text-white/50 w-full max-w-[280px]">
                <Lock className="w-3 h-3" />
                <span>dribbble.com/awwwards-site</span>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col gap-5 relative bg-[#0a0a0c]">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '100%' }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: 'circInOut' }}
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-20" 
              />
              
              <div className="flex flex-col items-center gap-4 mt-2">
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-[80%] h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5" 
                />
                <motion.div className="w-[50%] h-4 bg-white/5 rounded-md" />
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: [0.95, 1, 0.95], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-4 px-6 py-2 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20"
                >
                  Анализ структуры и логики...
                </motion.div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 + 1, repeat: Infinity, repeatDelay: 3 }}
                    className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/[0.01] rounded-xl border border-white/10 p-3 flex flex-col gap-2.5"
                  >
                     <div className="w-8 h-8 rounded-lg bg-accent/20 mb-auto" />
                     <div className="h-2 w-full bg-white/10 rounded" />
                     <div className="h-2 w-2/3 bg-white/5 rounded" />
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        )}
        
        {index === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="w-full h-full relative bg-[#09090b] p-6 flex flex-col overflow-hidden items-center justify-center"
          >
            <motion.div 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden sm:block absolute top-4 right-4 w-44 bg-[#18181b]/95 border border-white/10 rounded-xl shadow-2xl p-4 z-20 backdrop-blur-xl"
            >
              <div className="text-[10px] font-semibold text-white/40 uppercase mb-3 flex items-center gap-2">
                <LayoutTemplate className="w-3 h-3" /> Стилевой движок
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-black border-2 border-white/20 ring-2 ring-accent/30 cursor-pointer shadow-[0_0_12px_rgba(200,207,160,0.3)]" />
                <div className="w-6 h-6 rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer" />
                <div className="w-6 h-6 rounded-full bg-accent/80 hover:bg-accent transition-colors cursor-pointer" />
              </div>
              <div className="space-y-2.5">
                <div className="h-8 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 justify-between">
                  <span className="text-xs text-white/70">Geist Sans</span>
                  <ChevronRight className="w-3 h-3 text-white/40" />
                </div>
                <div className="h-8 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 justify-between">
                  <span className="text-xs text-white/70">Темная тема</span>
                  <div className="w-6 h-3.5 rounded-full bg-accent flex items-center justify-end px-[2px]">
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="w-[85%] mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#09090b] rounded-2xl border border-accent/20 p-8 flex flex-col justify-center relative shadow-2xl">
               <motion.div 
                 animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 className="absolute -right-20 -top-20 w-64 h-64 bg-accent/20 blur-[64px] rounded-full pointer-events-none" 
               />
               <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md shadow-lg">
                   <LayoutTemplate className="w-6 h-6 text-accent" />
                 </div>
                 <h4 className="text-white font-medium text-2xl mb-3 tracking-tight leading-tight max-w-[200px]">
                   Уникальная<br />эстетика
                 </h4>
                 <p className="text-white/60 text-sm leading-relaxed max-w-[240px] pt-1.5">
                   Строгая типографика, выверенные отступы и идеальный баланс контраста.
                 </p>
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   className="mt-6 px-5 py-2.5 bg-accent text-black rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(200,207,160,0.2)] transition-shadow w-max"
                 >
                   Применить тему
                 </motion.button>
               </div>
            </div>
          </motion.div>
        )}

        {index === 2 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="w-full h-full relative bg-[#0d0d0f] overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex">
              <div className="hidden sm:flex w-32 border-r border-white/5 bg-[#0a0a0c] p-4 flex-col gap-3 shrink-0">
                <div className="text-[10px] font-mono text-white/30 mb-1 tracking-wider">EXPLORER</div>
                {['src', 'app', 'components', 'styles'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <ChevronRight className="w-3 h-3 opacity-50" />
                    {item}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-[11px] text-accent mt-1 pl-4 border-l-2 border-accent">
                  page.tsx
                </div>
              </div>
              
              <div className="flex-1 p-5 bg-[#0d0d0f] font-mono text-[11px] text-white/50 leading-[2] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-3 flex gap-2">
                   <span className="text-[9px] px-2 py-1 bg-white/5 rounded text-white/40">React</span>
                   <span className="text-[9px] px-2 py-1 bg-white/5 rounded text-white/40">Tailwind</span>
                </div>
                <span className="text-white/80">export default</span> <span className="text-accent">function</span> <span className="text-white">Page</span>() {'{\n'}
                {'  '} <span className="text-white/80">return</span> (\n
                {'    '} &lt;<span className="text-accent">main</span> <span className="text-white/60">className</span>=<span className="text-white/40">"bg-black text-white"</span>&gt;\n
                {'      '} &lt;<span className="text-accent">HeroSection</span> /&gt;\n
                {'      '} &lt;<span className="text-accent">FeaturesGrid</span> /&gt;\n
                {'      '} &lt;<span className="text-accent">Footer</span> /&gt;\n
                {'    '} &lt;/<span className="text-accent">main</span>&gt;\n
                {'  '} );\n
                {'}'}
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-1.5 h-3 bg-white/40 ml-1 translate-y-0.5"
                />
              </div>
            </div>
            
            <div className="h-[35%] min-h-[120px] border-t border-white/10 bg-[#08080a] p-4 font-mono text-[11px] flex flex-col gap-2.5 relative">
              <div className="flex items-center gap-2 mb-1 text-white/40 border-b border-white/5 pb-2">
                <Terminal className="w-3.5 h-3.5" />
                ТЕРМИНАЛ
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                className="text-white/50 flex items-center gap-2"
              >
                <span className="text-accent font-bold">&gt;</span> wayno export --react --tailwind
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                className="text-white/80 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Успешно сгенерировано 12 компонентов
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 1.6, duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                className="text-black flex items-center gap-2 font-medium bg-accent w-max px-3 py-1.5 rounded-md mt-1"
              >
                Готово к деплою 🚀
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function SectionTransformation() {
  return (
    <section className="relative bg-[#050505] z-20 py-16 lg:py-32 px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="sticky top-[10vh] text-center mb-24 max-w-4xl mx-auto z-0 pb-8">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-4"
        >
          Wayno Pipeline
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]"
        >
          От первого клика <span className="text-white/40">к готовому продукту.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          WAYNO не использует шаблонные решения. Мы переосмысляем логику и создаем работающий исходный дизайн-код для вашего стартапа.
        </motion.p>
      </div>

      <div className="w-full relative max-w-[1440px] px-4 md:px-8 mx-auto flex flex-col gap-16 lg:gap-[75vh] pb-16 lg:pb-[20vh] z-10 pt-4 lg:pt-[5vh]">
        
        {/* Animated Connecting Infographic */}
        <div className="absolute top-[18vh] bottom-[18vh] left-1/2 -translate-x-1/2 w-full max-w-[800px] pointer-events-none hidden lg:block z-[-1]">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 2000" fill="none">
            {/* Background thin dashed line */}
            <path 
              d="M500,0 C800,400 200,900 500,1000 C800,1400 200,1800 500,2000" 
              stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" 
            />
            {/* Animated solid line drawn on scroll */}
            <motion.path 
              d="M500,0 C800,400 200,900 500,1000 C800,1400 200,1800 500,2000" 
              stroke="url(#solidGradient)" strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ margin: "10% 0px -20% 0px", once: false }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            {/* Floating dots on points */}
            <motion.circle cx="500" cy="0" r="4" fill="#C8CFA0" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} />
            <motion.circle cx="500" cy="1000" r="4" fill="#C8CFA0" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5 }} />
            <motion.circle cx="500" cy="2000" r="4" fill="#C8CFA0" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.5 }} />
            
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8CFA0" stopOpacity="0" />
                <stop offset="50%" stopColor="#C8CFA0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C8CFA0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="solidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8CFA0" stopOpacity="0" />
                <stop offset="20%" stopColor="#C8CFA0" stopOpacity="1" />
                <stop offset="80%" stopColor="#C8CFA0" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8CFA0" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {STEPS.map((step, index) => (
          <Card key={step.id} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
