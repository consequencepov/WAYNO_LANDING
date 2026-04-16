import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Compass, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'

const suggestedLinks = [
  {
    label: 'Главная WAYNO',
    href: '/',
    description: 'Вернуться к основному слою платформы и актуальным сценариям запуска.',
  },
  {
    label: 'Тарифы',
    href: '/pricing',
    description: 'Открыть доступ и посмотреть, как WAYNO подключается к рабочему процессу.',
  },
  {
    label: 'AI-конструктор сайтов',
    href: '/ai-konstruktor-saytov',
    description: 'Быстрый вход в основной поисковый кластер продукта.',
  },
]

export function NotFound() {
  return (
    <>
      <Seo
        title="404 - Страница не найдена"
        description="WAYNO: страница не найдена. Вернитесь на главную, откройте тарифы или перейдите к основным AI-страницам платформы."
        path="/404.html"
        noindex
      />

      <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-28 pb-20 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,207,160,0.14),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 [mask-image:radial-gradient(circle_at_top,#000_40%,transparent_86%)]" />

        <section className="relative px-6 md:px-12 lg:px-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_420px] gap-8 xl:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,207,160,0.16),transparent_34%)]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-accent">
                  <SearchX className="h-4 w-4" />
                  404 / Lost Route
                </div>

                <div className="mt-8 text-[clamp(4rem,12vw,8rem)] leading-none tracking-[-0.08em] text-white/18 font-medium">
                  404
                </div>

                <h1 className="mt-2 max-w-[12ch] text-[clamp(2.6rem,5vw,5.6rem)] leading-[0.94] tracking-[-0.05em] text-white font-medium">
                  Страница не найдена, но маршрут дальше есть.
                </h1>

                <p className="mt-6 max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-white/64">
                  Похоже, адрес устарел или вёл в несуществующий сегмент. Вернитесь в рабочую
                  навигацию WAYNO и продолжите путь через главную, тарифы или основные AI-страницы.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-accent hover:text-black"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    На главную
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm text-white/78 transition-colors duration-300 hover:border-accent/35 hover:text-white"
                  >
                    Посмотреть тарифы
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent">
                <Compass className="h-4 w-4" />
                Navigate back
              </div>
              <p className="mt-5 text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-white">
                Вместо тупика лучше вернуть пользователя в индексируемую и полезную часть структуры.
              </p>
              <div className="mt-6 space-y-3">
                {suggestedLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block rounded-[24px] border border-white/8 bg-black/20 p-4 transition-colors duration-300 hover:border-accent/30 hover:bg-black/30"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[1rem] leading-snug text-white">{item.label}</div>
                        <p className="mt-2 text-sm leading-relaxed text-white/58">{item.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-accent" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>
      </main>
    </>
  )
}