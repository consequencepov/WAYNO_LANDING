import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_CASE_NARRATIVES, SEO_CASE_STUDIES } from '@/constants/seoCaseStudies'

type SeoCaseStudiesProps = {
  compact?: boolean
}

export function SeoCaseStudies({ compact = false }: SeoCaseStudiesProps) {
  const caseStudies = compact ? SEO_CASE_STUDIES.slice(0, 2) : SEO_CASE_STUDIES
  const narratives = compact ? SEO_CASE_NARRATIVES.slice(0, 2) : SEO_CASE_NARRATIVES

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-20 md:py-24 border-t border-white/8 bg-[#080808]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(200,207,160,0.12),transparent_34%),radial-gradient(circle_at_100%_20%,rgba(255,255,255,0.06),transparent_28%)] pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-white/40">case studies / search text</div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.8rem)] leading-[0.97] tracking-[-0.04em] text-white">
              Сайты, которые работают в разных сценариях спроса.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] md:text-[17px] leading-relaxed text-white/62">
              От SaaS и B2B-поставщиков до mini app и образовательных продуктов: этот блок показывает, где
              AI-сборка сайта дает команде реальный рабочий слой для запуска, проверки и следующей итерации.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-accent">Wayno layer</div>
            <p className="mt-4 text-[1.25rem] leading-[1.12] tracking-[-0.03em] text-white">
              Здесь не абстрактный SEO-текст, а реальные сценарии, в которых сайт нужен как инструмент роста.
            </p>
            <Link
              to="/pricing"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-accent"
            >
              Открыть доступ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {caseStudies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={item.href}
                className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,207,160,0.14),transparent_44%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/35">{item.segment}</div>
                  <h3 className="mt-5 text-[1.4rem] leading-[1.06] tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/58">{item.summary}</p>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-sm text-accent">
                    Открыть сценарий
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {narratives.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 md:p-7"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{item.label}</div>
              <h3 className="mt-4 text-[1.4rem] md:text-[1.55rem] leading-[1.08] tracking-[-0.03em] text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-white/60">{item.description}</p>
              <Link
                to={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/78 transition-colors duration-300 hover:text-accent"
              >
                Изучить страницу
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}