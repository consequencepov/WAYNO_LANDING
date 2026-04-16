import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { PromptInput } from './PromptInput';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Sparkles, X } from 'lucide-react';
import { LogoToggle } from './LogoToggle';

export default function FloatingPrompt() {
  const { scrollY } = useScroll();
  const [dockState, setDockState] = useState<'hidden' | 'compact' | 'expanded'>('hidden');
  const { promptText } = useStore();

  useEffect(() => {
    return scrollY.on('change', (y) => {
      if (y < window.innerHeight * 0.6) {
        setDockState('hidden');
      } else {
        setDockState(prev => prev === 'hidden' ? 'compact' : prev);
      }
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {dockState !== 'hidden' && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 w-full max-w-4xl px-6 pointer-events-none"
        >
          <div className="pointer-events-auto flex justify-center w-full">
            <LogoToggle />
          </div>
          <div className="pointer-events-auto w-full flex justify-center drop-shadow-2xl">
            {dockState === 'compact' ? (
              <motion.div 
                layoutId="dock"
                onClick={() => setDockState('expanded')}
                className="bg-[#111]/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2rem] flex items-center gap-3 cursor-pointer hover:bg-[#1a1a1a] hover:border-white/20 transition-all shadow-2xl w-full max-w-3xl"
              >
                 <div className="bg-white/10 rounded-full w-10 h-10 flex flex-shrink-0 items-center justify-center text-white">
                   <Sparkles className="w-5 h-5 opacity-80" />
                 </div>
                 <div className="text-white/60 text-sm font-medium px-4 truncate flex-1">
                   {promptText ? promptText : "Опишите вашу идею или вставьте ссылку..."}
                 </div>
                 <div className="bg-white text-black rounded-full px-5 h-10 flex items-center justify-center text-sm font-medium ml-2 shadow-inner flex-shrink-0">
                   Развернуть
                 </div>
              </motion.div>
            ) : (
              <motion.div 
                layoutId="dock"
                className="w-full flex justify-center relative shadow-2xl bg-[#0a0a0a] rounded-[32px] border border-white/10"
              >
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDockState('compact'); }}
                    className="absolute -top-12 right-0 text-white/40 hover:text-white z-20 pointer-events-auto w-10 h-10 flex items-center justify-center bg-[#111] rounded-full border border-white/10 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="w-full max-w-3xl">
                    <PromptInput />
                  </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
