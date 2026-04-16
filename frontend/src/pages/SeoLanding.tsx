import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, CheckCircle2, Zap, Layers } from 'lucide-react'
import { CtaModal } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import { type SeoLandingPage, getSeoLandingBySlug } from '@/constants/seoLandings'
import { SITE } from '@/constants/site'
import { cn } from '@/lib/cn'

type SeoLandingProps = {
  slug: string
}

function buildStructuredData(page: SeoLandingPage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: page.title,
        url: `${SITE.url}${page.path}`,
        description: page.description,
        inLanguage: 'ru-RU',
        isPartOf: {
          '@id': `${SITE.url}/#website`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'WAYNO',
            item: SITE.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.navLabel,
            item: `${SITE.url}${page.path}`,
          },
        ],
      },
    ],
  }
}

export function SeoLanding({ slug }: SeoLandingProps) {
  const [isCtaOpen, setIsCtaOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const page = getSeoLandingBySlug(slug)

  if (!page) {
    return null
  }

  const relatedPages = useMemo(
    () => page.relatedSlugs.map((item) => getSeoLandingBySlug(item)).filter(Boolean) as SeoLandingPage[],
    [page.relatedSlugs]
  )

  const structuredData = buildStructuredData(page)

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        keywords={page.keywords}
        structuredData={structuredData}
      />
      <main className="relative min-h-screen overflow-hidden bg-black pt-32 pb-24 font-sans selection:bg-white/30">
        
        {/* Apple-style background: deep black with subtle cinematic gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[2000px] pointer-events-none">
           <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[120%] h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]" />
           <div className="absolute top-[20%] left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(200,207,160,0.03),transparent_60%)]" />
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 px-6 md:px-12 lg:px-16 max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
            >
              <Zap className="w-4 h-4 text-white/70" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                {page.badge} • {page.eyebrow}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[18ch] text-[clamp(3.5rem,7vw,6.5rem)] leading-[1] tracking-[-0.04em] text-white font-medium"
            >
              {page.headline}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-[17px] md:text-[20px] leading-relaxed text-white/50"
            >
              {page.lead}
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
               className="mt-12 flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={() => setIsCtaOpen(true)}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-[15px] font-medium text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Начать проект
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Визуальная композиция: Apple-style proof points (Glass Pills) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 lg:mt-28 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {page.proofPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl px-5 py-3 shadow-xl transition-colors hover:bg-white/[0.04]">
                <CheckCircle2 className="h-4 w-4 text-white/40" />
                <span className="text-[14px] font-medium text-white/70">{item}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* OUTCOMES - Плавная инфографика-ось */}
        <section className="relative z-10 px-6 md:px-12 lg:px-16 mt-32">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-tight tracking-[-0.03em] text-white">
                Результаты и метрики
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Фоновая соединительная линия */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {page.outcomes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-center px-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-xl flex items-center justify-center mb-6 shadow-[inset_0_4px_20px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/[0.05]">
                     <span className="text-xl font-mono text-white/80">0{index + 1}</span>
                  </div>
                  <h3 className="text-[1.3rem] leading-snug tracking-[-0.02em] text-white font-medium mb-3">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-white/50">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW - Графический пайплайн */}
        <section className="relative z-10 px-6 md:px-12 lg:px-16 mt-32 lg:mt-48">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
              <div>
                <Layers className="w-10 h-10 text-white/30 mb-8" />
                <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-white">
                  Архитектура процесса
                </h2>
                <p className="mt-6 text-[17px] leading-relaxed text-white/50 max-w-sm">
                  WAYNO выстраивает прозрачный pipeline: от первых гипотез до продакшн-ready структуры, которая масштабируется вместе с бизнесом.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {page.workflow.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex gap-6 p-8 rounded-[32px] border border-white/5 bg-white/[0.015] backdrop-blur-lg hover:bg-white/[0.03] transition-colors duration-500"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 font-medium">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-[1.3rem] leading-tight tracking-[-0.02em] text-white font-medium mb-2">{item.title}</h3>
                      <p className="text-[15px] leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 px-6 md:px-12 lg:px-16 mt-32">
           <div className="max-w-[800px] mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-[clamp(2rem,3vw,3rem)] leading-tight tracking-[-0.03em] text-white font-medium">
                 Частые вопросы
               </h2>
             </div>
             <div className="flex flex-col gap-3">
               {page.faq.map((item, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div key={index} className="overflow-hidden rounded-[24px] bg-white/[0.01] border border-white/5 backdrop-blur-md transition-colors hover:bg-white/[0.02]">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
                      >
                        <span className="text-[1.1rem] md:text-[1.2rem] text-white/90 font-medium">{item.question}</span>
                        <div className={cn("w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500", isOpen && "rotate-180 bg-white/5")}>
                           <ChevronDown className="w-4 h-4 text-white/60" />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 md:px-8 pb-8 text-[15px] leading-relaxed text-white/50">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
               })}
             </div>
           </div>
        </section>

        {/* RELATED PAGES */}
        <section className="relative z-10 px-6 md:px-12 lg:px-16 mt-32 lg:mt-40">
           <div className="max-w-[1280px] mx-auto">
             <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-12">
               <h2 className="text-[clamp(2rem,3vw,3rem)] leading-tight tracking-[-0.03em] text-white font-medium max-w-xl">
                  Глубокие экспертизы в смежных нишах
               </h2>
               <Link to="/" className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/50 hover:text-white transition-colors">
                  Все направления &rarr;
               </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPages.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.path}
                    className="group relative flex flex-col p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/30 mb-6 group-hover:text-white/50 transition-colors">
                        {item.badge}
                      </div>
                      <h3 className="text-[1.5rem] leading-tight tracking-[-0.02em] text-white mb-3 group-hover:text-white/90">
                        {item.navLabel}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-white/40 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-between">
                         <span className="text-[12px] uppercase font-medium tracking-[0.1em] text-white/60">
                           Подробнее
                         </span>
                         <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2 group-hover:bg-white/10">
                           <ArrowRight className="w-4 h-4 text-white" />
                         </div>
                      </div>
                    </div>
                  </Link>
                ))}
             </div>
           </div>
        </section>

        <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} title="Запустить проект с WAYNO" />
      </main>
    </>
  )
}