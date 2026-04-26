import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, Hexagon, Code2, Globe2, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_CASE_NARRATIVES, SEO_CASE_STUDIES } from '@/constants/seoCaseStudies'
import { CtaModal } from '@/components/ui/CtaModal'
import { cn } from '@/lib/cn'

type SeoCaseStudiesProps = {
  compact?: boolean
}

// Абстрактные элементы интерфейса (Apple-style charts/metrics)
const AbstractGraphic = ({ index }: { index: number }) => {
  const icons = [Hexagon, Code2, Globe2, Cpu]
  const IconComponent = icons[index % icons.length] as React.ElementType
  
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center"
      >
        {/* Абстрактные орбиты/окружности (glassmorphism/minimal) */}
        <div className="absolute w-[280px] md:w-[400px] aspect-square rounded-full border border-white/5 bg-gradient-to-tr from-white/[0.02] to-transparent animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[200px] md:w-[280px] aspect-square rounded-full border border-white/10 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <IconComponent className="w-8 h-8 text-white/80" strokeWidth={1} />
        </div>
      </motion.div>
    </div>
  )
}

export function SeoCaseStudies({ compact = false }: SeoCaseStudiesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const caseStudies = useMemo(() => compact ? SEO_CASE_STUDIES.slice(0, 4) : SEO_CASE_STUDIES, [compact])
  const narratives = useMemo(() => compact ? SEO_CASE_NARRATIVES.slice(0, 2) : SEO_CASE_NARRATIVES, [compact])
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Autoplay timer — only runs when section is visible in viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let timer: ReturnType<typeof setInterval> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % caseStudies.length)
          }, 5000)
        } else {
          if (timer) { clearInterval(timer); timer = null }
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (timer) clearInterval(timer)
    }
  }, [caseStudies.length])

  return (
    <>
      <section ref={sectionRef} className="relative px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden bg-black border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_20%_-20%,rgba(140,140,140,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative max-w-[1280px] mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 backdrop-blur-md">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                Wayno Workflows
              </span>
            </div>
            
            <h2 className="mt-2 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white font-medium">
              Достигайте целей. <br />
              <span className="text-white/40">Для каждого сценария.</span>
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-white/50 max-w-xl">
              AI-сборка как прозрачный, эластичный слой: от валидации идеи SaaS-продукта до B2B модернизации и образовательных платформ.
            </p>
          </motion.div>

          {/* Интерактивный интефейс: табы слева, визуал - справа (Apple style) */}
          <div className="mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col gap-2"
            >
              {caseStudies.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.title}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative text-left w-full rounded-[24px] p-6 transition-all duration-500 overflow-hidden",
                      isActive ? "bg-white/[0.04] border border-white/10 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.05)] backdrop-blur-md" : "hover:bg-white/[0.02]"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabBadge" 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 rounded-r-full" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={cn("text-[10px] uppercase tracking-[0.25em] font-medium transition-colors duration-300", isActive ? "text-white/60" : "text-white/30")}>
                          {item.segment}
                        </div>
                        <h3 className={cn("mt-2 text-[1.4rem] md:text-[1.6rem] leading-[1.1] tracking-[-0.03em] font-medium transition-colors duration-300", isActive ? "text-white" : "text-white/50 group-hover:text-white/80")}>
                          {item.title}
                        </h3>
                      </div>
                      <ChevronRight className={cn("w-5 h-5 transition-transform duration-300", isActive ? "text-white/80 translate-x-1" : "text-white/20")} />
                    </div>
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative h-[400px] md:h-[500px] w-full rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(255,255,255,0.02)]"
            >
              {/* Контент таба */}
              <AnimatePresence mode="wait">
                <AbstractGraphic key={`graphic-${activeIndex}`} index={activeIndex} />
                <motion.div 
                  key={`content-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                >
                  <p className="text-[15px] md:text-[17px] leading-relaxed text-white/70 max-w-lg mb-6">
                    {caseStudies[activeIndex]?.summary}
                  </p>
                  <Link
                    to={caseStudies[activeIndex]?.href || '#'}
                    className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:text-white/60"
                  >
                    Открыть сценарий <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          <div className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {narratives.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-10 backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.06]"
                >
                  <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40 group-hover:text-white/60 transition-colors">
                    {item.label}
                  </div>
                  <h3 className="mt-4 text-[1.6rem] md:text-[1.8rem] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/50">{item.description}</p>
                  <div className="mt-8 pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                    <Link
                      to={item.href}
                      className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/80 transition-colors duration-300 group-hover:text-white"
                    >
                      Изучить детальнее
                    </Link>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="mx-auto mt-12 md:mt-16 text-center max-w-sm"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[20px] bg-white px-8 py-5 text-sm md:text-base font-medium text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Оставить заявку
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>    
      
      <CtaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Обсудить ваш проект"
      />
    </>
  )
}