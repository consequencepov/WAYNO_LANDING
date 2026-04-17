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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Mouse movement only for desktop, throttled to rAF
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    }
  }, []);

  return (
    <section className="relative min-h-screen py-24 lg:py-32 flex flex-col justify-center bg-[#070707] text-white overflow-hidden z-20">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Левая часть: Product Message */}
        <div className="lg:col-span-5 space-y-12 z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-6 text-white relative">
              WAYNO — не <br className="hidden lg:block" />
              <span className="font-serif italic font-light text-accent/90">черный ящик</span>.
              <br/>
              <span className="text-white/40 block mt-2 text-[clamp(2rem,5vw,3rem)]">Это полный контроль.</span>
            </h2>
            <p className="text-[16px] md:text-lg text-white/50 max-w-[420px] leading-relaxed">
              От визуальной архитектуры до исходного кода и глубокой аналитики. 
              Управляйте каждым аспектом.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 relative">
            {TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-left p-5 sm:p-7 rounded-[28px] border transition-all duration-500 relative group overflow-hidden w-full",
                  activeTab === tab.id 
                    ? "bg-white/[0.04] border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.02)] backdrop-blur-md" 
                    : "bg-transparent border-transparent hover:bg-white/[0.02] text-white/40 hover:border-white/5"
                )}
              >
                {/* Мягкий активный фон */}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="active-tab-bg-editor"
                    className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Нумерация */}
                <div className="absolute top-5 right-6 font-mono text-[10px] sm:text-xs opacity-30 select-none">
                  0{idx + 1}
                </div>

                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-4 mb-1">
                    <div className={cn(
                      "text-xl md:text-2xl font-medium tracking-tight transition-colors duration-400", 
                      activeTab === tab.id ? "text-white" : "text-white/40 group-hover:text-white/70"
                    )}>
                      {tab.label}
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {activeTab === tab.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed pr-8"
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

        {/* Правая часть: Product Shell (Fully Mobile Responsive) */}
        <div className="lg:col-span-7 relative z-20 w-full perspective-[2000px] mt-8 lg:mt-0">
          <motion.div 
            className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-3xl overflow-hidden relative flex flex-col group transform-gpu mx-auto max-w-[800px]"
            style={isMobile ? {} : {
              rotateX: (mousePos.y - window.innerHeight / 2) * -0.005,
              rotateY: (mousePos.x - window.innerWidth / 2) * 0.005,
            }}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

            {/* Browser/OS Header */}
            <div className="h-10 sm:h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02] relative z-10 backdrop-blur-md">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/10" />
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white/30 uppercase">{activeTab}.wayno.so</div>
              <div className="w-8 sm:w-12" /> {/* Spacer */}
            </div>
            
            {/* Panels Container */}
            <div className="flex-1 relative overflow-hidden bg-[#0a0a0a] flex">
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
                    {/* Sidebar hidden on small mobile, visible on sm and up */}
                    <div className="hidden sm:flex w-32 md:w-48 border-r border-white/5 bg-white/[0.01] flex-col p-4 gap-4">
                      <div className="h-3 w-16 bg-white/10 rounded" />
                      <div className="space-y-2 mt-2">
                        {[40, 70, 50, 80, 60].map((w, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white/10 rounded-[2px]" />
                            <div className="h-2 bg-white/10 rounded-sm" style={{ width: `${w}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Canvas Main */}
                    <div className="flex-1 relative bg-[#0c0c0c] overflow-hidden flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px]" />
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-[85%] sm:w-[70%] h-[70%] sm:h-[60%] border border-white/10 bg-white/[0.03] rounded-xl shadow-2xl backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between relative"
                      >
                         <div className="w-1/3 h-4 bg-white/10 rounded-sm" />
                         <div className="space-y-3">
                           <div className="w-full h-8 bg-white/5 rounded-md" />
                           <div className="w-4/5 h-8 bg-white/5 rounded-md" />
                         </div>
                         <div className="flex justify-end gap-2">
                           <div className="w-8 h-8 rounded-full bg-white/10" />
                           <div className="w-16 h-8 rounded-full bg-white/20" />
                         </div>
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
                    className="absolute inset-0 flex bg-[#0d0d0d] font-mono text-[10px] sm:text-xs md:text-sm p-4 sm:p-6 lg:p-8 overflow-hidden"
                  >
                    <div className="text-white/30 truncate leading-relaxed">
                      <span className="text-pink-400">export function</span> <span className="text-blue-400">Hero</span>() {'{\n'}
                      <br/>
                      {'  '}return ({'\n'}
                      {'    '}&lt;<span className="text-fuchsia-400">section</span> className=<span className="text-yellow-300">"relative min-h-screen flex"</span>&gt;{'\n'}
                      {'      '}&lt;<span className="text-fuchsia-400">div</span> className=<span className="text-yellow-300">"container mx-auto"</span>&gt;{'\n'}
                      {'        '}&lt;<span className="text-fuchsia-400">motion.h1</span>{'\n'}
                      {'          '}initial={`{{`} opacity: <span className="text-orange-400">0</span>, y: <span className="text-orange-400">20</span> {`}}\n`}
                      {'          '}animate={`{{`} opacity: <span className="text-orange-400">1</span>, y: <span className="text-orange-400">0</span> {`}}\n`}
                      {'          '}className=<span className="text-yellow-300">"text-6xl font-bold text-white"</span>{'\n'}
                      {'        '}&gt;{'\n'}
                      {'          '}Build Faster{'\n'}
                      {'        '}&lt;/<span className="text-fuchsia-400">motion.h1</span>&gt;{'\n'}
                      {'      '}&lt;/<span className="text-fuchsia-400">div</span>&gt;{'\n'}
                      {'    '}&lt;/<span className="text-fuchsia-400">section</span>&gt;{'\n'}
                      {'  '}){'\n'}
                      {'}'}
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
                    className="absolute inset-0 bg-[#0a0a0a] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {['Конверсия', 'Посетители', 'Отказы'].map((metric, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:p-4">
                          <div className="text-white/40 text-[10px] sm:text-xs uppercase mb-1 sm:mb-2">{metric}</div>
                          <div className="text-lg sm:text-2xl font-medium text-white">{i === 0 ? '4.8%' : i === 1 ? '12.4k' : '32%'}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 border border-white/5 bg-white/[0.01] rounded-xl relative overflow-hidden flex items-end px-2 pb-2 sm:px-6 sm:pb-6 gap-2">
                       {/* Mock Chart */}
                       {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="flex-1 bg-gradient-to-t from-white/5 to-white/20 rounded-t-sm sm:rounded-t-md"
                          />
                       ))}
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