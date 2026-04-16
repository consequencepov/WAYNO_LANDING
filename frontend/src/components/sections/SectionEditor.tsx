import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/cn';

const TABS = [
  { id: 'design', label: 'Дизайн', desc: 'Структура, контент и визуал в едином интерактивном холсте. Творите без ограничений.' },
  { id: 'code', label: 'Код', desc: 'Чистый production-ready код на React и Tailwind. Готов к масштабированию с первой секунды.' },
  { id: 'analytics', label: 'Аналитика', desc: 'Детальные метрики, анализ конверсий и AI-советы по улучшению пользовательского опыта.' },
];

export function SectionEditor() {
  const [activeTab, setActiveTab] = useState(TABS[0]?.id || 'design');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen py-16 lg:py-32 flex items-center bg-surface-primary text-content-primary overflow-hidden z-20">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Левая часть: Product Message */}
        <div className="lg:col-span-5 space-y-12 z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display-sm sm:text-5xl md:text-[3.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-8 text-white relative">
              WAYNO — не <br className="hidden lg:block" />
              <span className="font-serif italic font-light text-accent bg-clip-text">черный ящик</span>.
              <br/>
              <span className="text-white/40 block mt-2 text-4xl sm:text-5xl md:text-[3.25rem]">Это полный контроль.</span>
            </h2>
            <p className="text-lg text-content-secondary max-w-[420px] leading-relaxed">
              От визуальной архитектуры до исходного кода и глубокой аналитики. 
              Управляйте каждым аспектом продукта без ограничений шаблонных решений.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 relative">
            {TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-left p-6 sm:p-7 rounded-3xl border transition-all duration-500 relative group overflow-hidden",
                  activeTab === tab.id 
                    ? "bg-surface-elevated/40 border-accent/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
                    : "bg-surface-secondary/20 border-transparent hover:bg-surface-secondary/50 text-content-muted hover:border-white/[0.08]"
                )}
              >
                {/* Мягкий активный фон (Gold Glow) */}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Нумерация для красоты (01, 02, 03) */}
                <div className="absolute top-6 right-6 font-mono text-xs opacity-30 select-none">
                  0{idx + 1}
                </div>

                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-4 mb-1">
                    <div className={cn(
                      "text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-400", 
                      activeTab === tab.id ? "text-content-primary" : "text-content-muted group-hover:text-content-secondary"
                    )}>
                      {tab.label}
                    </div>
                    {/* Анимированная стрелка/значок активного состояния */}
                    <motion.div 
                      initial={false}
                      animate={{ 
                        opacity: activeTab === tab.id ? 1 : 0, 
                        x: activeTab === tab.id ? 0 : -10 
                      }}
                      className="w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center text-accent"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {activeTab === tab.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: 10, marginTop: 0 }} 
                        animate={{ opacity: 1, height: 'auto', y: 0, marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, y: -10, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-content-secondary text-sm md:text-base leading-relaxed pr-8"
                      >
                        {tab.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Правая часть: Product Shell */}
        <div className="lg:col-span-7 relative z-20 perspective-[2000px]">
          <motion.div 
            className="w-full aspect-[4/3] rounded-2xl border border-border bg-surface-primary/80 shadow-2xl backdrop-blur-2xl overflow-hidden relative flex flex-col group transform-gpu"
            style={{
              rotateX: (mousePos.y - window.innerHeight / 2) * -0.005,
              rotateY: (mousePos.x - window.innerWidth / 2) * 0.005,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            {/* Browser/OS Header */}
            <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-surface-secondary/50 relative z-10 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
              </div>
              <div className="text-[10px] font-mono tracking-widest text-content-muted/50 drop-shadow-sm uppercase">{activeTab}.wayno.so</div>
              <div className="w-12" /> {/* Spacer for balance */}
            </div>
            
            {/* Panels Container */}
            <div className="flex-1 relative overflow-hidden bg-surface-primary flex">
              <AnimatePresence mode="popLayout" initial={false}>
                {activeTab === 'design' && (
                  <motion.div 
                    key="design"
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }} 
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex"
                  >
                    {/* Left Sidebar */}
                    <div className="hidden sm:flex w-48 border-r border-border/50 bg-surface-secondary/30 flex-col p-4 gap-4">
                      <div className="h-4 w-20 bg-white/5 rounded" />
                      <div className="space-y-2 mt-2">
                        {[40, 70, 50, 80, 60].map((w, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-white/5 rounded-[3px]" />
                            <div className="h-3 bg-white/5 rounded-sm" style={{ width: `${w}%` }} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 h-4 w-24 bg-white/5 rounded" />
                      <div className="space-y-2 mt-2">
                        <div className="w-full h-8 bg-white/[0.02] border border-white/5 rounded flex items-center px-2"><div className="w-1/2 h-2 bg-white/10 rounded-sm" /></div>
                        <div className="w-full h-8 bg-white/[0.02] border border-white/5 rounded flex items-center px-2"><div className="w-1/3 h-2 bg-white/10 rounded-sm" /></div>
                      </div>
                    </div>
                    {/* Canvas Main */}
                    <div className="flex-1 relative bg-[#0c0c0c] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                      
                      {/* Interactive Canvas Canvas Elements */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-[70%] h-[60%] border border-border/50 bg-surface-elevated/40 rounded-lg shadow-2xl backdrop-blur-sm p-4 flex flex-col gap-4 relative"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-4 bg-white/10 rounded-sm" />
                          <div className="flex gap-2">
                            <div className="w-6 h-2 bg-white/5 rounded-sm" />
                            <div className="w-6 h-2 bg-white/5 rounded-sm" />
                          </div>
                        </div>
                        <div className="flex-1 flex gap-4">
                          <div className="flex-1 flex flex-col gap-3">
                            <motion.div 
                              className="w-full h-8 bg-white/10 rounded-md"
                              animate={{ backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(200, 207, 160, 0.15)', 'rgba(255,255,255,0.1)'] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="w-3/4 h-3 bg-white/5 rounded-sm" />
                            <div className="w-1/2 h-3 bg-white/5 rounded-sm" />
                            <div className="w-24 h-6 border border-accent/30 text-accent/50 text-[8px] flex items-center justify-center rounded uppercase tracking-wider mt-auto">Action</div>
                          </div>
                          <div className="w-1/3 h-full bg-white/5 rounded-md border border-white/5" />
                        </div>

                        {/* Editor selection box */}
                        <motion.div 
                          className="absolute inset-x-3 inset-y-12 border-2 border-accent/40 rounded border-dashed pointer-events-none"
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-surface-primary border border-accent rounded-sm" />
                          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-surface-primary border border-accent rounded-sm" />
                          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-surface-primary border border-accent rounded-sm" />
                          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-surface-primary border border-accent rounded-sm" />
                        </motion.div>
                      </motion.div>

                      {/* Mock Cursor */}
                      <motion.div 
                        initial={{ x: -100, y: 150 }}
                        animate={{ x: [0, 40, -20, 60, 40], y: [40, 20, 80, -10, 20] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-5 h-5 z-30 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L5.5 3.5Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ times: [0, 0.1, 1], duration: 6, repeat: Infinity, delay: 1 }}
                          className="absolute top-6 left-4 bg-accent text-surface-primary text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
                        >
                          Редактировать
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'code' && (
                  <motion.div 
                    key="code"
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }} 
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex w-full"
                  >
                    <div className="w-12 bg-white/[0.01] border-r border-border/50 flex flex-col items-center py-4 gap-4 opacity-50">
                      <div className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><div className="w-3 h-3 border border-white/40" /></div>
                      <div className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><div className="w-3 h-3 rounded-full border border-white/40" /></div>
                    </div>
                    
                    <div className="flex-1 font-mono text-[13px] sm:text-[14px] leading-7 text-content-secondary bg-[#0a0a0a] p-6 sm:p-8 overflow-hidden relative selection:bg-accent/20">
                      <div className="absolute top-4 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(200,207,160,0.8)]"></span>
                        <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Live Sync</span>
                      </div>
                      
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col relative z-10"
                      >
                        <div><span className="text-white">import</span> {'{'} <span className="text-[#89b4fa]">motion</span> {'}'} <span className="text-white">from</span> <span className="text-accent">'framer-motion'</span>;</div>
                        <div><span className="text-white">import</span> <span className="text-[#89b4fa]">clsx</span> <span className="text-white">from</span> <span className="text-accent">'clsx'</span>;</div>
                        <div className="mt-4"><span className="text-white/60">// Auto-generated by Wayno</span></div>
                        <div><span className="text-[#cba6f7]">export function</span> <span className="text-[#f9e2af]">HeroSection</span>() {'{'}</div>
                        <div className="pl-4"><span className="text-[#cba6f7]">return</span> (</div>
                        
                        <div className="pl-8"><span className="text-[#89b4fa]">&lt;motion.section</span></div>
                        <div className="pl-12"><span className="text-[#89dceb]">initial</span>=<span className="text-white">{'{'}</span><span className="text-white">{'{'}</span> opacity: <span className="text-[#fab387]">0</span>, y: <span className="text-[#fab387]">20</span> <span className="text-white">{'}'}</span><span className="text-white">{'}'}</span></div>
                        <div className="pl-12"><span className="text-[#89dceb]">whileInView</span>=<span className="text-white">{'{'}</span><span className="text-white">{'{'}</span> opacity: <span className="text-[#fab387]">1</span> <span className="text-white">{'}'}</span><span className="text-white">{'}'}</span></div>
                        <div className="pl-12"><span className="text-[#89dceb]">className</span>=<span className="text-accent">"relative min-h-[90vh] flex items-center bg-black"</span></div>
                        <div className="pl-8"><span className="text-[#89b4fa]">&gt;</span></div>
                        
                        <motion.div 
                          initial={{ backgroundColor: 'rgba(200,207,160,0)' }}
                          animate={{ backgroundColor: ['rgba(200,207,160,0)', 'rgba(200,207,160,0.08)', 'rgba(200,207,160,0)'] }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
                          className="pl-8 sm:pl-12 border-l-2 border-accent/40 my-2 py-2"
                        >
                          <span className="text-[#89b4fa]">&lt;h1</span> <span className="text-[#89dceb]">className</span>=<span className="text-accent">"text-6xl font-serif text-white/90"</span><span className="text-[#89b4fa]">&gt;</span><br/>
                          <span className="pl-4 text-white">Full Control. Zero Black Box.</span><br/>
                          <span className="text-[#89b4fa]">&lt;/h1&gt;</span>
                        </motion.div>
                        
                        <div className="pl-8"><span className="text-[#89b4fa]">&lt;/motion.section&gt;</span></div>
                        <div className="pl-4">);</div>
                        <div>{'}'}</div>
                      </motion.div>
                      
                      {/* Typing simulation cursor */}
                      <motion.div 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute top-[340px] left-[280px] w-2 h-4 sm:h-5 bg-accent/80"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div 
                    key="analytics"
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }} 
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-6 flex flex-col gap-6 bg-[#0a0a0a]"
                  >
                    <div className="grid grid-cols-2 gap-6 h-32">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-surface-elevated/30 rounded-xl p-5 border border-border/50 relative overflow-hidden flex flex-col justify-end"
                      >
                        <div className="absolute top-5 left-5 text-content-muted text-xs uppercase tracking-widest">Конверсия</div>
                        <div className="text-3xl sm:text-4xl font-light text-white tracking-tight flex items-baseline gap-2">
                          4.8% <span className="text-sm text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">+1.2%</span>
                        </div>
                        {/* Decorative chart line */}
                        <div className="absolute right-0 bottom-0 left-0 h-16 pointer-events-none opacity-40">
                          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                            <path d="M0,50 Q20,40 40,45 T80,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent stroke-[1.5px]"/>
                            <path d="M0,50 Q20,40 40,45 T80,20 T100,5 L100,50 L0,50 Z" fill="url(#grad)" className="opacity-20"/>
                            <defs>
                              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor"/><stop offset="100%" stopColor="transparent"/></linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-surface-elevated/30 rounded-xl p-5 border border-border/50 relative overflow-hidden flex flex-col justify-end"
                      >
                        <div className="absolute top-5 left-5 text-content-muted text-xs uppercase tracking-widest">Посетители</div>
                        <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">12.4k</div>
                        <div className="absolute right-4 top-4 flex items-end gap-1 h-8">
                          {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                            <motion.div 
                              key={i} 
                              className="w-1.5 bg-white/20 rounded-t-sm" 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex-1 bg-surface-elevated/20 rounded-xl p-6 border border-accent/20 flex flex-col justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                       
                       <div className="flex items-start gap-5 relative z-10">
                         <div className="w-10 h-10 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center border border-accent/20">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                         <div className="space-y-3">
                           <div className="text-xs font-mono uppercase tracking-widest text-accent flex items-center gap-2">
                             Wayno AI Insights
                           </div>
                           <p className="text-content-secondary text-sm md:text-base leading-relaxed max-w-md">
                             Обнаружено снижение вовлеченности на Android устройствах в секции Pricing.
                             <br/>
                             <span className="text-white font-medium mt-2 block">Рекомендация:</span> 
                             Оптимизировать анимацию открытия карточек.
                           </p>
                           <motion.button 
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             className="mt-2 px-5 py-2.5 bg-accent text-surface-primary text-sm font-semibold rounded-lg shadow-lg hover:shadow-accent/20 transition-all font-sans"
                           >
                             Применить исправление
                           </motion.button>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}