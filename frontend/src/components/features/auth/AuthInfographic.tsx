import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Layers, Rocket, PenTool, CheckCircle2, Settings, Terminal, MousePointer2, Check } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

function PinSection({ children, index }: { children: React.ReactNode, index: number }) {
  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={fadeInUp}
    >
      <div className="absolute top-24 left-8 lg:left-16 text-content-primary/5 font-serif italic text-7xl md:text-9xl select-none -z-10 pointer-events-none">
        0{index}
      </div>
      {children}
    </motion.div>
  )
}

export function AuthInfographic() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Dynamic Background Glow */}
      <div className="fixed top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-accent/10 blur-[150px] rounded-[100%] pointer-events-none -z-10 animate-pulse-slow" />

      {/* SECTION 1: Welcome & Process Cards */}
      <PinSection index={1}>
        <div className="w-full max-w-[600px] space-y-6 mb-16 text-center md:text-left self-start">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-balance leading-[1.1]">
            От идеи до продукта. <br />
            <span className="font-serif italic text-accent font-light">За секунды.</span>
          </h2>
          <p className="text-content-secondary text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            Опишите задачу — WAYNO сгенерирует структуру, дизайн и код, готовый к публикации. Никакой магии, только технологии.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[540px]">
          {/* Mock: Prompt Interface */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className={cn(
              "w-[95%] md:w-[85%] bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl p-6",
              "border border-border-subtle shadow-[0_24px_64px_rgba(0,0,0,0.5)]",
              "relative self-center md:self-start z-10"
            )}
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 shrink-0">
                <PenTool className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-3 w-full">
                <div className="text-sm font-medium text-content-primary/90 hidden sm:block">
                  Собери лендинг для нового крипто-стартапа. Тёмная тема, акцент на безопасность и 3D-графику.
                </div>
                <div className="sm:hidden h-2 w-3/4 bg-border-subtle rounded-full" />
                <div className="sm:hidden h-2 w-full bg-surface-elevated rounded-full" />
                
                {/* Generation skeleton */}
                <div className="pt-4 border-t border-border-subtle/50 space-y-2 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full"
                    animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="h-1.5 w-1/3 bg-accent/30 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-border-subtle rounded-full" />
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 bg-accent text-surface-primary text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-lg">
              Промпт
            </div>
          </motion.div>

          {/* Mock: Canvas / UI generated */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
            className={cn(
              "w-full bg-[#111111]/90 backdrop-blur-2xl rounded-3xl p-2",
              "border border-border-subtle shadow-[0_32px_80px_rgba(0,0,0,0.7)]",
              "relative z-20 overflow-hidden"
            )}
          >
             {/* Mock Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle/50 bg-black/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-content-muted text-[10px] bg-white/5 py-1 px-3 rounded-md">
                <Layers className="w-3 h-3" />
                <span>preview.wayno.ru</span>
              </div>
            </div>
            
            {/* The "Generated UI" */}
            <div className="p-5 space-y-6 bg-gradient-to-b from-surface-primary to-[#0A0A0A] rounded-b-[20px]">
              {/* Hero Element */}
              <div className="text-center space-y-3 pt-4">
                <div className="h-4 sm:h-5 w-2/3 max-w-[200px] bg-content-primary/20 rounded-md mx-auto" />
                <div className="h-3 w-1/2 max-w-[150px] bg-border-subtle rounded-md mx-auto" />
                <div className="flex justify-center gap-3 pt-2">
                   <div className="h-7 sm:h-8 w-24 bg-accent text-surface-primary flex items-center justify-center rounded-full text-[10px] font-bold">Launch</div>
                   <div className="h-7 sm:h-8 w-24 bg-surface-elevated border border-border-subtle rounded-full text-[10px] font-medium flex items-center justify-center text-content-primary">Docs</div>
                </div>
              </div>
              {/* Grid Element */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-20 bg-surface-elevated/50 rounded-xl border border-border-subtle/50 relative overflow-hidden">
                   <div className="absolute top-3 left-3 w-6 h-6 rounded bg-accent/20" />
                </div>
                <div className="h-20 bg-surface-elevated/50 rounded-xl border border-border-subtle/50 relative overflow-hidden">
                   <div className="absolute top-3 left-3 w-6 h-6 rounded bg-accent/20" />
                </div>
              </div>
            </div>

            <div className="absolute -left-6 bottom-16 w-14 h-14 bg-surface-elevated backdrop-blur-xl rounded-full border border-border-subtle flex items-center justify-center shadow-xl">
              <MousePointer2 className="w-6 h-6 text-content-primary -rotate-12" />
            </div>
          </motion.div>

        </div>
      </PinSection>

      {/* SECTION 2: Control & Code */}
      <PinSection index={2}>
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 max-w-[900px]">
          
          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
            {/* Real Code Mock Window */}
            <div className="w-full rounded-2xl bg-[#0d0d0d] border border-border-subtle shadow-2xl overflow-hidden text-xs font-mono relative">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#141414]">
                <div className="flex gap-4">
                  <span className="text-content-primary/50 flex items-center gap-2">
                     <Terminal className="w-3 h-3" /> App.tsx
                  </span>
                </div>
              </div>
              <div className="p-5 text-content-secondary leading-relaxed overflow-x-hidden">
                <p><span className="text-pink-400">import</span> {`{ motion }`} <span className="text-pink-400">from</span> <span className="text-accent">'framer-motion'</span>;</p>
                <p><span className="text-pink-400">import</span> {`{ SplitLayout }`} <span className="text-pink-400">from</span> <span className="text-accent">'@/components'</span>;</p>
                <br/>
                <p><span className="text-blue-400">export default function</span> <span className="text-green-300">Hero</span>() {`{`}</p>
                <p className="pl-4"><span className="text-pink-400">return</span> (</p>
                <p className="pl-8 text-white/40">{`<motion.div `}</p>
                <p className="pl-12"><span className="text-blue-200">initial</span>={`{{ opacity: 0 }}`}</p>
                <p className="pl-12"><span className="text-blue-200">animate</span>={`{{ opacity: 1 }}`}</p>
                <p className="pl-8 text-white/40">{`>`}</p>
                <p className="pl-12 text-content-primary">  {`<SplitLayout />`}</p>
                <p className="pl-8 text-white/40">{`</motion.div>`}</p>
                <p className="pl-4">);</p>
                <p>{`}`}</p>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-accent/20 text-accent px-3 py-1 rounded border border-accent/30 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> <span className="text-[10px] uppercase font-sans tracking-wide">React / TS</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left order-1 lg:order-2">
            <div className="w-14 h-14 rounded-2xl bg-surface-elevated shadow-lg flex items-center justify-center border border-border-subtle mx-auto lg:mx-0">
               <Settings className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Никаких <br className="hidden lg:block" /> <span className="font-serif italic text-accent font-light">чёрных ящиков</span>
            </h2>
            <p className="text-content-secondary text-body leading-relaxed max-w-sm mx-auto lg:mx-0">
              Вы получаете чистый, поддерживаемый код на React/Vite. Экспортируйте компоненты или деплойте прямо из интерфейса. Полная свобода для ваших разработчиков.
            </p>
          </div>

        </div>
      </PinSection>

      {/* SECTION 3: Analytics & Scale */}
      <PinSection index={3}>
        <div className="w-full max-w-[600px] text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
             Аналитика и <span className="font-serif italic text-accent font-light">Метрики</span>
          </h2>
          <p className="text-content-secondary text-lg">Смотрите, как растет конверсия в реальном времени.</p>
        </div>

        <div className="w-full max-w-[700px] bg-[#111]/80 backdrop-blur-3xl rounded-[2rem] p-8 md:p-12 border border-border-subtle shadow-[0_24px_64px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Grid bg pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="relative z-10 flex flex-col gap-12">
            
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="space-y-2">
                <div className="text-sm text-content-muted uppercase tracking-widest">Визиты за месяц</div>
                <div className="text-5xl font-light text-content-primary">124<span className="text-2xl text-content-secondary">,5k</span></div>
                <div className="text-accent text-sm flex items-center gap-1 mt-1">
                  <Rocket className="w-4 h-4" /> +24% к прошлому месяцу
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-content-muted uppercase tracking-widest">Конверсия</div>
                <div className="text-5xl font-serif italic text-content-primary">4.2<span className="text-3xl font-sans not-italic text-content-secondary">%</span></div>
              </div>
            </div>

            {/* Dynamic Graph Mock */}
            <div className="h-40 w-full flex items-end justify-between gap-2 border-b border-white/10 pb-4 relative">
               <div className="absolute left-0 bottom-8 w-full border-t border-dashed border-white/5" />
               <div className="absolute left-0 bottom-24 w-full border-t border-dashed border-white/5" />
               
               {[30, 45, 35, 60, 50, 80, 70, 90, 85, 100].map((h, i) => (
                 <motion.div 
                   key={i}
                   className="w-full bg-border-subtle rounded-t-sm relative group hover:bg-content-secondary transition-colors"
                   style={{ height: `${h}%` }}
                   initial={{ scaleY: 0 }}
                   whileInView={{ scaleY: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                 >
                   {i === 9 && (
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(200,207,160,0.8)]" />
                   )}
                 </motion.div>
               ))}
            </div>

          </div>
        </div>
      </PinSection>

      {/* SECTION 4: Pricing */}
      <PinSection index={4}>
        <div className="w-full max-w-[840px] flex flex-col items-center">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight uppercase leading-[1.15]">
              Мы собрали всё самое нужное <br className="hidden md:block"/>
              <span className="font-serif italic text-accent font-light lowercase">в одном тарифе</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-8 bg-[#111111]/90 backdrop-blur-3xl p-6 lg:p-8 rounded-[2rem] border border-border-subtle shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            
            {/* Left side: Tabs & Text */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-wrap sm:flex-nowrap gap-2 p-1.5 bg-[#0a0a0a] rounded-2xl border border-border-subtle/50 relative overflow-hidden">
                {["Профессионалам", "Предпринимателям", "Индивидуальный подход"].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "relative px-4 py-3 rounded-xl text-[13px] font-medium transition-all z-10 flex-1 whitespace-nowrap outline-none",
                      activeTab === idx ? "text-surface-primary" : "text-content-muted hover:text-content-primary"
                    )}
                  >
                    {activeTab === idx && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-[0_0_16px_rgba(200,207,160,0.4)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[140px] md:min-h-[120px] flex items-start pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-content-secondary leading-relaxed text-[15px]"
                  >
                    {activeTab === 0 && "Быстрый старт проектов по референсам, экспорт чистого кода, удобный визуальный редактор. Экономьте часы на рутине и отдавайте завершённый результат клиентам быстрее."}
                    {activeTab === 1 && "Закрываем полный цикл проверки и создания сайта. С нами ты проверишь и гипотезу, и идею, и узнаешь слабые места, получив советы по улучшению. Запускай проекты без разработчиков."}
                    {activeTab === 2 && "Особые решения для масштабных проектов и сложных интеграций. Перенесем вашу корпоративную систему на новый уровень с кастомными доработками и SLA."}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="mt-auto hidden md:grid grid-cols-2 gap-3 pt-6 border-t border-border-subtle/50">
                 <div className="flex items-center gap-2.5 text-[13px] text-content-primary/70"><Check className="w-3.5 h-3.5 text-accent" /> Безлимитная генерация</div>
                 <div className="flex items-center gap-2.5 text-[13px] text-content-primary/70"><Check className="w-3.5 h-3.5 text-accent" /> Экспорт в React & Vite</div>
                 <div className="flex items-center gap-2.5 text-[13px] text-content-primary/70"><Check className="w-3.5 h-3.5 text-accent" /> Подключение аналитики</div>
                 <div className="flex items-center gap-2.5 text-[13px] text-content-primary/70"><Check className="w-3.5 h-3.5 text-accent" /> Свой субдомен .wayno.ru</div>
              </div>
            </div>

            {/* Right side: Price Card */}
            <div className="w-full md:w-[300px] shrink-0 bg-[#0a0a0a] rounded-[1.5rem] border border-border-subtle p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] -z-10 rounded-full transition-all group-hover:bg-accent/10" />
              <div className="text-content-muted text-[11px] uppercase tracking-widest font-medium mb-2">
                {activeTab === 2 ? "Для крупных задач" : "Единая цена"}
              </div>
              <div className="text-[2.5rem] font-medium tracking-tight mb-8">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block text-content-primary"
                  >
                    {activeTab === 2 ? "Sales" : "1399 ₽"}
                  </motion.span>
                </AnimatePresence>
                {activeTab !== 2 && <span className="text-content-muted text-base tracking-normal">/мес</span>}
              </div>
              
              <div className="mt-auto space-y-3">
                <button className="w-full py-4 text-sm bg-content-primary text-surface-primary rounded-xl font-medium hover:bg-white transition-colors backdrop-blur shadow-[0_4px_14px_rgba(255,255,255,0.15)] focus:ring-2 focus:ring-accent/50 outline-none">
                   {activeTab === 2 ? "Связаться с нами" : "Начать работу"}
                </button>
                <p className="text-[11px] text-content-muted text-center">
                   {activeTab === 2 ? "Обсудим детали и метрики" : "Отменить можно в любой момент"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </PinSection>

    </div>
  )
}
