import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react'
import { CtaModal } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import { type SeoLandingPage, getSeoLandingBySlug } from '@/constants/seoLandings'
import { SITE } from '@/constants/site'

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
      <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-28 pb-20 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,207,160,0.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:96px_96px] opacity-20 [mask-image:radial-gradient(circle_at_top,#000_40%,transparent_86%)]" />

        <section className="relative px-6 md:px-12 lg:px-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_420px] gap-8 xl:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,207,160,0.16),transparent_34%)]" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-accent">
                    {page.eyebrow}
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                    {page.badge}
                  </span>
                </div>

                <h1 className="mt-7 max-w-[14ch] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.05em] text-white font-medium">
                  {page.headline}
                </h1>

                <p className="mt-6 max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-white/64">
                  {page.lead}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCtaOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-accent hover:text-black"
                  >
                    Запустить с WAYNO
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm text-white/78 transition-colors duration-300 hover:border-accent/35 hover:text-white"
                  >
                    Посмотреть тарифы
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-2.5">
                  {page.audience.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-white/48">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4"
            >
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent">
                  <Sparkles className="h-4 w-4" />
                  Wayno fit
                </div>
                <div className="mt-5 space-y-3">
                  {page.proofPoints.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <p className="text-sm leading-relaxed text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/35">Search Intent</div>
                <p className="mt-4 text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-white">
                  Страница собрана под конкретный кластер запросов и усилена внутренней перелинковкой.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {page.keywords.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/55">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="relative px-6 md:px-12 lg:px-16 mt-8 md:mt-10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
            {page.outcomes.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] border border-white/8 bg-white/[0.025] p-6 md:p-7"
              >
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/28">Outcome {index + 1}</div>
                <h2 className="mt-5 text-[1.6rem] leading-[1.05] tracking-[-0.03em] text-white">{item.title}</h2>
                <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-white/62">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative px-6 md:px-12 lg:px-16 mt-16 md:mt-20">
          <div className="max-w-[1280px] mx-auto rounded-[36px] border border-white/10 bg-white/[0.02] p-6 md:p-8 lg:p-10">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/35">Wayno workflow</div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.8rem)] leading-[0.97] tracking-[-0.04em] text-white">
                Как это проходит внутри платформы.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
              {page.workflow.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[28px] border border-white/8 bg-black/20 p-6"
                >
                  <div className="text-[2.4rem] leading-none tracking-[-0.06em] text-accent">{item.step}</div>
                  <h3 className="mt-5 text-[1.3rem] leading-[1.08] tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-12 lg:px-16 mt-16 md:mt-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-8 xl:gap-10 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/35">FAQ / Search Depth</div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[0.98] tracking-[-0.04em] text-white">
                Вопросы, которые реально задают перед запуском.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/58">
                Этот блок нужен и людям, и поисковым системам: он расширяет семантику страницы и закрывает сомнения перед действием.
              </p>
            </div>

            <div className="space-y-3">
              {page.faq.map((item, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div key={item.question} className="overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.025]">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    >
                      <span className="text-[1rem] md:text-[1.08rem] leading-snug text-white">{item.question}</span>
                      <ChevronDown className={`h-5 w-5 flex-shrink-0 text-white/45 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm leading-relaxed text-white/62">{item.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-12 lg:px-16 mt-16 md:mt-20">
          <div className="max-w-[1280px] mx-auto rounded-[36px] border border-accent/20 bg-[linear-gradient(180deg,rgba(200,207,160,0.08),rgba(255,255,255,0.02))] p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-[11px] uppercase tracking-[0.34em] text-accent">Related search paths</div>
                <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.04em] text-white">
                  Смежные страницы, которые расширяют охват и держат пользователя внутри структуры WAYNO.
                </h2>
              </div>
              <button
                onClick={() => setIsCtaOpen(true)}
                className="self-start rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                Получить доступ
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPages.map((item) => (
                <Link
                  key={item.slug}
                  to={item.path}
                  className="group rounded-[28px] border border-white/10 bg-black/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/35">{item.eyebrow}</div>
                  <h3 className="mt-4 text-[1.25rem] leading-[1.08] tracking-[-0.03em] text-white">{item.navLabel}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">{item.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-accent">
                    Открыть страницу
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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