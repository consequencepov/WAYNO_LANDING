import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { LogoToggle } from '@/components/ui/LogoToggle'
import { CtaModal } from '@/components/ui'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/cn'
import { X, LayoutTemplate, Type, Sparkles, Link2, ArrowRight } from 'lucide-react'

const DESIGNS = [
  { id: 'minimal', label: 'Минимализм', desc: 'Светлый, чистый SaaS интерфейс', bg: 'from-zinc-600/30 to-zinc-900/50', icon: LayoutTemplate },
  { id: 'brutalism', label: 'Брутализм', desc: 'Дерзкая типографика и контраст', bg: 'from-accent/30 to-black/50', icon: Type },
  { id: 'luxury', label: 'Премиум', desc: 'Элегантность и плавные линии', bg: 'from-amber-500/20 to-[#1a1105]/50', icon: Sparkles }
]

export function MobileHero() {
  const { brandMode } = useStore()
  
  const [view, setView] = useState<'prompt' | 'design' | 'url'>('prompt')
  const [inputValue, setInputValue] = useState('')
  const [urlValue, setUrlValue] = useState('')
  const [selectedDesign, setSelectedDesign] = useState<typeof DESIGNS[0] | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const content = {
    professional: {
      headline: (
        <>
          Создавай сайты <span className="font-serif italic font-light text-accent">&amp;</span><br />
          копируй <span className="font-serif italic font-light text-accent">референсы</span>
        </>
      )
    },
    entrepreneur: {
      headline: (
        <>
          Переноси бизнес<br />
          в <span className="font-serif italic font-light text-accent">цифровую среду</span>
        </>
      )
    }
  }

  const currentContent = content[brandMode as keyof typeof content] || content.professional

  const canSubmitLead = Boolean(inputValue.trim() || urlValue.trim() || selectedDesign)

  const resetPromptDraft = () => {
    setInputValue('')
    setUrlValue('')
    setSelectedDesign(null)
    setView('prompt')
  }

  const openLeadCapture = () => {
    if (!canSubmitLead) {
      return
    }

    setIsLeadModalOpen(true)
  }

  return (
    <section className="relative min-h-[90svh] flex flex-col pt-16 pb-12 overflow-hidden bg-[#0a0a0a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-60"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full px-5 flex flex-col items-center justify-center flex-1 mt-4">
        
        {/* Toggle - Moved slightly down and closer to the title */}
        <div className="w-full flex justify-center mb-8 scale-[0.85] origin-bottom">
          <LogoToggle />
        </div>

        {/* Headline & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center select-none"
        >
          <h1 className="text-[2.5rem] leading-[1.05] tracking-tight text-white font-medium text-center">
            {currentContent.headline}
          </h1>
          <p className="text-white/40 mt-5 text-center text-sm font-light px-2 max-w-[300px]">
            Умная среда для проектирования без <span className="font-serif italic text-accent/80">лишних действий</span>.
          </p>
        </motion.div>

        {/* Inline Dynamic Interaction Area */}
        <div className="w-full max-w-sm mt-12 relative z-50 h-[220px]">
          <AnimatePresence mode="wait">
            {view === 'prompt' && (
              <motion.div 
                key="prompt"
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-surface-elevated/40 backdrop-blur-2xl border border-white/10 rounded-[1.75rem] p-2 shadow-2xl flex flex-col gap-2 mix-blend-plus-lighter"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl ring-1 ring-white/5 focus-within:ring-accent/50 transition-all">
                  <label className="flex items-center justify-center shrink-0 w-8 h-8 -ml-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-white/50 hover:text-white">
                    <input type="file" className="hidden" multiple />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </label>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Опишите проект или задачу..."
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/30 truncate" 
                  />
                  <button 
                    disabled={!inputValue.trim()}
                    onClick={openLeadCapture}
                    className={cn(
                      "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300",
                      inputValue.trim() 
                        ? "bg-gradient-to-tr from-accent/90 to-accent text-black shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:shadow-[0_0_30px_rgba(212,255,0,0.6)] scale-100 hover:scale-105 active:scale-95" 
                        : "bg-white/5 border border-white/10 text-white/20 scale-95"
                    )}
                  >
                    <ArrowRight className={cn("w-5 h-5 transition-transform duration-300", inputValue.trim() ? "translate-x-0.5" : "")} />
                  </button>
                </div>
                <div className="flex items-center gap-2 px-2 pb-1">
                   <button 
                     onClick={() => setView('url')}
                     className="flex-1 border bg-white/5 border-white/5 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-xl py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-all duration-300"
                   >
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                     Копировать сайт
                   </button>
                   <button 
                     onClick={() => setView('design')}
                     className={cn(
                       "flex-1 border rounded-xl py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-all duration-300",
                       selectedDesign 
                         ? "bg-accent/10 border-accent/30 text-accent" 
                         : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                     )}
                   >
                     {selectedDesign ? (
                       <>
                         <selectedDesign.icon className="w-3.5 h-3.5" />
                         {selectedDesign.label}
                       </>
                     ) : (
                       <>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                         Выбрать дизайн
                       </>
                     )}
                   </button>
                </div>
              </motion.div>
            )}

            {view === 'design' && (
              <motion.div 
                key="design"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full absolute top-0 left-0 bg-[#0a0a0c]/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between px-2 pt-1 pb-2">
                  <span className="text-white/90 font-medium font-serif italic text-lg tracking-tight px-1">Эстетика</span>
                  <button onClick={() => setView('prompt')} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors active:scale-90"><X className="w-4 h-4" /></button>
                </div>
                
                <div className="flex flex-col gap-2">
                   {DESIGNS.map(d => (
                       <button 
                         key={d.id}
                         onClick={() => { setSelectedDesign(d); setView('prompt'); }} 
                         className="flex items-center gap-4 p-3 rounded-2xl border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-left group overflow-hidden relative"
                       >
                          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${d.bg} blur-xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity`} />
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.bg} border border-white/10 flex items-center justify-center relative z-10`}>
                             <d.icon className="w-5 h-5 text-white/80" />
                          </div>
                          <div className="relative z-10">
                              <div className="text-white font-medium text-[15px]">{d.label}</div>
                              <div className="text-white/40 text-[11px] mt-0.5">{d.desc}</div>
                          </div>
                          <div className="ml-auto w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 relative z-10">
                            <ArrowRight className="w-3.5 h-3.5 text-white/60" />
                          </div>
                       </button>
                   ))}
                </div>
              </motion.div>
            )}

            {view === 'url' && (
              <motion.div 
                key="url"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full absolute top-0 left-0 bg-surface-elevated/40 backdrop-blur-2xl border border-white/10 rounded-[1.75rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-2 mix-blend-plus-lighter z-50"
              >
                <div className="flex items-center justify-between px-3 pt-2 pb-1">
                  <span className="text-white/80 font-medium text-sm flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-accent/80" /> Вставить ссылку
                  </span>
                  <button onClick={() => setView('prompt')} className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors active:scale-90"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl ring-1 ring-white/5 focus-within:ring-accent/50 transition-all border border-white/[0.02]">
                  <input 
                    type="url" 
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="https://dribbble.com/..."
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/30 truncate" 
                  />
                  <button 
                    disabled={!urlValue.trim()}
                    onClick={openLeadCapture}
                    className={cn(
                      "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300",
                      urlValue.trim() 
                        ? "bg-gradient-to-tr from-accent/90 to-accent text-black shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:shadow-[0_0_30px_rgba(212,255,0,0.6)] scale-100 hover:scale-105 active:scale-95" 
                        : "bg-white/5 border border-white/10 text-white/20 scale-95"
                    )}
                  >
                    <ArrowRight className={cn("w-5 h-5 transition-transform duration-300", urlValue.trim() ? "translate-x-0.5" : "")} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CtaModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          title="Оставить заявку"
          leadSource="mobile_prompt"
          promptDraft={{
            promptText: inputValue.trim(),
            attachedUrls: urlValue.trim() ? [urlValue.trim()] : [],
            selectedDesign: selectedDesign?.label ?? null,
          }}
          onSubmitted={() => {
            resetPromptDraft()
            setIsLeadModalOpen(false)
          }}
        />
      </div>
    </section>
  )
}