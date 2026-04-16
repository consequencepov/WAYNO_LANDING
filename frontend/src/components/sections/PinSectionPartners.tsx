import { motion } from 'framer-motion'
import { Database, Zap, Globe, Layers, Link as LinkIcon, Smartphone, Hexagon, LayoutTemplate, ArrowRight } from 'lucide-react'

// Анимированные плавающие карточки-интеграции (Apple-style, Fully Mobile Responsive)
const integrations = [
  { icon: Globe, name: "Next.js", desc: "SSR / SSG Framework", color: "text-white" },
  { icon: Smartphone, name: "React", desc: "UI Library", color: "text-blue-400" },
  { icon: Layers, name: "Tailwind", desc: "Utility CSS", color: "text-cyan-400" },
  { icon: Database, name: "Supabase", desc: "Postgres DB", color: "text-emerald-400" },
  { icon: Hexagon, name: "Framer", desc: "Motion API", color: "text-pink-400" },
  { icon: Zap, name: "Vite", desc: "Build Tool", color: "text-yellow-400" },
  { icon: LinkIcon, name: "REST API", desc: "Custom Endpoints", color: "text-fuchsia-400" },
]

export function PinSectionPartners() {
  return (
    <section className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center bg-[#050505] z-20 overflow-hidden border-t border-white/5">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 top-[-20%] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/70">
            Бесшовная интеграция
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.04em] text-white font-medium text-center max-w-4xl"
        >
          Работает с инструментами, <br className="hidden md:block"/>
          <span className="text-white/40">которые вы уже любите.</span>
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           viewport={{ once: true }}
           className="mt-8 text-[16px] md:text-[18px] text-white/50 text-center max-w-xl"
        >
          Экосистема Wayno легко подключается к вашему текущему стеку через API, базы данных и современные фронтенд-фреймворки.
        </motion.p>
        
        {/* Инфографика - Централизованный стеклянный граф (Отлично скейлится в мобилке) */}
        <div className="mt-20 md:mt-32 w-full relative">
          
          {/* Декоративные линии соединений */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

          {/* Ядро (Center) */}
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-20 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mx-auto rounded-[2rem] border border-white/20 bg-black backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.15)] overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
             <LayoutTemplate className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" />
             <div className="absolute inset-0 rounded-[2rem] border border-white/10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
          </motion.div>

          {/* Плавающие плитки партнеров */}
          <div className="relative z-10 mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {integrations.map((item, idx) => (
                <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group flex flex-col p-6 rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05] hover:scale-[1.02] hover:-translate-y-1 shadow-lg"
                >
                   <div className="flex items-center justify-between mb-8">
                     <div className={`w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-inner ${item.color}`}>
                       <item.icon className="w-5 h-5" />
                     </div>
                     <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors -rotate-45" />
                   </div>
                   <div className="mt-auto">
                     <h4 className="text-[1.1rem] md:text-[1.25rem] font-medium text-white tracking-[-0.02em]">{item.name}</h4>
                     <p className="text-[13px] text-white/40 mt-1 uppercase tracking-[0.1em]">{item.desc}</p>
                   </div>
                </motion.div>
             ))}
             {/* Доп карточка для симметрии */}
             <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                   className="group flex flex-col items-center justify-center p-6 rounded-[24px] border border-dashed border-white/20 bg-transparent transition-colors duration-500 hover:bg-white/[0.02] cursor-pointer"
                >
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                   </div>
                   <span className="text-[13px] text-white/50 uppercase tracking-[0.1em] font-medium">Больше интеграций</span>
             </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
