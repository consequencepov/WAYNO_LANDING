import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CtaModal } from '@/components/ui';

export function SectionHandoff() {
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  return (
    <section className="relative min-h-screen py-16 lg:py-32 bg-[#050505] border-t border-white/5 z-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6"
          >
            Никаких привязок. <span className="font-serif italic font-light text-accent">Реальный экспорт.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Ваш код принадлежит вам. Публикуйте в один клик, скачивайте исходники или отдавайте разработчикам <span className="font-serif italic text-white/80">чистый React</span>.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Publish */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 flex flex-col group hover:border-white/20 transition-colors"
          >
            <div className="h-48 mb-8 relative rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center overflow-hidden">
               {/* Pulsing server connection animation */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute w-32 h-32 bg-accent/10 rounded-full blur-2xl"
               />
               
               <svg className="absolute inset-0 w-full h-full opacity-30 px-4" preserveAspectRatio="none">
                 <motion.path 
                   d="M0,100 Q40,40 100,100 T200,100" 
                   fill="none" stroke="#C8CFA0" strokeWidth="2" strokeDasharray="5 5"
                   animate={{ strokeDashoffset: [20, 0] }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                 />
                 <motion.path 
                   d="M0,130 Q60,160 120,100 T250,50" 
                   fill="none" stroke="#C8CFA0" strokeWidth="1" strokeDasharray="3 3"
                   animate={{ strokeDashoffset: [15, 0] }}
                   transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                 />
               </svg>

               <div className="relative px-4 py-3 bg-[#0a0a0c] rounded-full border border-accent/30 text-white/90 text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(200,207,160,0.15)] group-hover:shadow-[0_0_30px_rgba(200,207,160,0.3)] transition-all">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/80 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                 </span>
                 wayno.run/your-project
               </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Live публикация</h3>
            <p className="text-white/60 text-sm mb-6 flex-grow">
              Мгновенный деплой на глобальный CDN. <span className="font-serif italic text-accent">Готово к приему</span> трафика сразу после нажатия кнопки.
            </p>
            <button 
              onClick={() => setIsCtaOpen(true)}
              className="group flex w-full items-center justify-center gap-2 px-5 py-3 mt-auto bg-accent/10 border border-accent/20 hover:bg-accent/20 rounded-xl text-accent text-sm font-medium transition-all duration-300"
            >
              Запустить проект
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Card 2: Export */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 flex flex-col group hover:border-white/20 transition-colors"
          >
            <div className="h-48 mb-8 relative rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center p-6 overflow-hidden">
               {/* Animated ZIP Folder */}
               <motion.div 
                 whileHover={{ y: -5, scale: 1.05 }}
                 className="relative w-24 h-20 flex items-end justify-center"
               >
                 <div className="absolute w-24 h-16 bg-white/5 border border-white/10 rounded-lg transform -skew-x-6 origin-bottom" />
                 <motion.div 
                   className="absolute w-22 h-14 bg-accent/10 border border-accent/20 rounded-lg mb-1 flex items-center justify-center overflow-hidden"
                   initial={{ y: 0 }}
                   whileHover={{ y: -10 }}
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                 </motion.div>
                 <div className="absolute w-24 h-16 bg-[#0a0a0c] border border-white/20 rounded-lg transform skew-x-6 origin-bottom shadow-xl flex items-center justify-center z-10">
                   <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">.ZIP</span>
                 </div>
               </motion.div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Исходный код</h3>
            <p className="text-white/60 text-sm mb-6 flex-grow">
              Архив с чистым React, Tailwind CSS и настроенной архитектурой. <span className="font-serif italic text-accent">Никаких закрытых</span> библиотек.
            </p>
            <button 
              onClick={() => setIsCtaOpen(true)}
              className="group flex w-full items-center justify-center gap-2 px-5 py-3 mt-auto bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white text-sm font-medium transition-all duration-300"
            >
              Скачать код
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Card 3: Share/Collab */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 flex flex-col group hover:border-white/20 transition-colors"
          >
            <div className="h-48 mb-8 relative rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center overflow-hidden">
               {/* Animated Avatars Orbiting */}
               <div className="relative w-32 h-32 flex items-center justify-center">
                 <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                 </div>
                 
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute w-full h-full border border-dashed border-white/10 rounded-full"
                 >
                   <div className="absolute top-0 left-1/2 -ml-4 -mt-4 w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-[10px] font-medium text-accent backdrop-blur-md" style={{ transform: 'rotate(0deg)' }}>A</div>
                   <div className="absolute bottom-4 right-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-medium text-white/60 backdrop-blur-md">U</div>
                 </motion.div>
                 
                 {/* Cursors */}
                 <motion.div 
                   animate={{ x: [0, 15, -5, 0], y: [0, -15, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/4 right-1/4 text-white z-20 drop-shadow-md"
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1.5"><path d="M4 4L9 22L12.5 15L20 12L4 4Z" /></svg>
                 </motion.div>
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Совместный доступ</h3>
            <p className="text-white/60 text-sm mb-6 flex-grow">
              Делитесь превью с командой. <span className="font-serif italic text-accent">Сбор фидбека и правки</span> в режиме реального времени на холсте.
            </p>
            <button 
              onClick={() => setIsCtaOpen(true)}
              className="group flex w-full items-center justify-center gap-2 px-5 py-3 mt-auto bg-gradient-to-r from-accent/5 to-white/5 border border-white/10 hover:border-accent/40 rounded-xl text-white hover:text-accent text-sm font-medium transition-all duration-300"
            >
              Пригласить команду
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
        
        <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title="Начать бесплатно" />
      </div>
    </section>
  );
}