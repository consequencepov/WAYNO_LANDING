import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_LANDING_PAGES } from '@/constants/seoLandings'

type SeoClustersProps = {
  compact?: boolean
}

export function SeoClusters({ compact = false }: SeoClustersProps) {
  const pages = compact ? SEO_LANDING_PAGES.slice(0, 6) : SEO_LANDING_PAGES

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-20 md:py-24 border-t border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.01)_0%,rgba(255,255,255,0.03)_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,207,160,0.10),transparent_42%)] pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/45">wayno search surface</div>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-white font-medium">
            Отдельные страницы под реальные запросы, сегменты и сценарии запуска.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] md:text-[17px] leading-relaxed text-white/62">
            Теперь WAYNO охватывает больше точных поисковых сценариев: от SaaS и лидогенерации до B2B,
            edtech, модернизации старых сайтов и product launch страниц.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {pages.map((page, index) => (
            <motion.div
              key={page.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={page.path}
                className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.05]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,207,160,0.12),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-white/35">{page.eyebrow}</div>
                  <h3 className="mt-5 text-[1.5rem] leading-[1.04] tracking-[-0.03em] text-white max-w-[16ch]">
                    {page.navLabel}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/58">{page.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {page.audience.slice(0, 3).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/48">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-sm text-accent">
                    Смотреть страницу
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}