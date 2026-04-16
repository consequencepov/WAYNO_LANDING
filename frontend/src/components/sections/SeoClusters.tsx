import { motion } from 'framer-motion'
import { BarChart3, BoxSelect, Cpu, Layers, Sparkles, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_LANDING_PAGES } from '@/constants/seoLandings'

type SeoClustersProps = {
  compact?: boolean
}

// Абстрактные иконки для карточек (инфографика)
const ICONS = [BoxSelect, Workflow, BarChart3, Cpu, Sparkles, Layers]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: [0.16, 1, 0.3, 1] }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function SeoClusters({ compact = false }: SeoClustersProps) {
  const pages = compact ? SEO_LANDING_PAGES.slice(0, 6) : SEO_LANDING_PAGES

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden bg-black">
      {/* Мягкий градиент на фоне (Apple-style) */}
      <div className="absolute inset-0 top-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 backdrop-blur-md">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
              Wayno Search Surface
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white font-medium">
            Сценарии запуска.
            <br />
            <span className="text-white/40">Точные запросы.</span>
          </h2>
          <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-white/50 max-w-xl">
            Охватываем точные поисковые метрики: от SaaS сервисов до B2B, EdTech 
            и запуска абсолютно новых продуктов.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[320px]"
        >
          {pages.map((page, index) => {
            const IconComponent = ICONS[index % ICONS.length] as React.ElementType
            // Bento Grid: разные размеры карточек
            const isLarge = index === 0 || index === 3 || index === 4 || index === 7
            const spanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1'
            
            return (
              <motion.div
                key={page.slug}
                variants={itemVariants}
                className={spanClass}
              >
                <Link
                  to={page.path}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.05)]"
                >
                  {/* Внутреннее свечение (Glassmorphism) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  
                  {/* Абстрактная фоновая графика */}
                  <div className="absolute -right-8 -top-8 text-white/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white/10">
                    <IconComponent strokeWidth={0.5} className="w-64 h-64" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-inner">
                        <IconComponent className="w-4 h-4 text-white/80" />
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-medium">
                        {page.eyebrow}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="text-[1.75rem] md:text-[2rem] leading-[1.1] tracking-[-0.03em] text-white font-medium">
                        {page.navLabel}
                      </h3>
                      {/* Оставляем минимум текста */}
                      {isLarge && (
                        <p className="mt-3 text-[15px] leading-relaxed text-white/50 max-w-sm line-clamp-2">
                          {page.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-2">
                        {page.audience.slice(0, isLarge ? 3 : 2).map((item) => (
                          <span key={item} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white/60 backdrop-blur-md">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}