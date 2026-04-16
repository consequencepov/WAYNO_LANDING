import { AnimatePresence, motion } from 'framer-motion'
import { CtaModal } from '@/components/ui'
import { useState } from 'react'

type Step = {
  id: number
  title: string
  desc: string
  eyebrow: string
}

const steps: Step[] = [
  {
    id: 1,
    eyebrow: 'Функция для старта',
    title: 'Не просто копируем сайт по URL',
    desc: 'Мы глубоко анализируем структуру, сетку и бизнес-логику референса, бережно адаптируя их под вашу уникальную концепцию и задачи.'
  },
  {
    id: 2,
    eyebrow: 'Функция для популяризации',
    title: 'Создаем уникальный визуальный язык',
    desc: 'Никакого прямого плагиата. Нейросеть генерирует современный дизайн-код, типографику и палитру, которые выделят ваш бренд среди конкурентов.'
  },
  {
    id: 3,
    eyebrow: 'Функция для масштабирования',
    title: 'Получаете чистый код, готовый к деплою',
    desc: 'Мгновенный экспорт в React/Tailwind. Вы получаете не просто макет, а работающий интерфейс с продуманным UX и адаптивной версткой.'
  }
]

const defaultStep = steps[0] as Step

export function PinSectionCards() {
  const [isCtaOpen, setIsCtaOpen] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(defaultStep.id)
  const currentStep = steps.find((step) => step.id === activeStep) ?? defaultStep

  return (
    <section className="relative min-h-screen bg-[#050505] z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(207,255,106,0.12),_transparent_28%)] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto min-h-screen px-6 md:px-12 lg:px-16 py-24 lg:py-28 flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch justify-center">
        <div className="w-full lg:w-[38%] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-xs uppercase tracking-[0.35em] mb-5"
          >
            Workflow Cards
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-heading-2 lg:text-display-xs text-content-primary max-w-xl"
          >
            Три шага от референса к экрану, который уже готов к продуктовой работе
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="text-body-lg text-content-muted leading-relaxed max-w-lg mt-6"
          >
            Переключайте этапы и смотрите, как идея проходит путь от разбора визуального языка до собранного интерфейса.
          </motion.p>

          <div className="mt-10 grid gap-4">
            {steps.map((step) => {
              const isActive = step.id === activeStep

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={[
                    'group rounded-[28px] border text-left p-5 md:p-6 transition-all duration-300',
                    isActive
                      ? 'border-accent/50 bg-white/[0.06] shadow-[0_20px_60px_rgba(207,255,106,0.08)]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-300',
                        isActive ? 'border-accent bg-accent text-black' : 'border-white/15 text-content-muted'
                      ].join(' ')}
                    >
                      0{step.id}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-content-muted mb-2">
                        {step.eyebrow}
                      </p>
                      <h3 className="text-xl md:text-2xl text-content-primary">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-content-muted leading-relaxed mt-3 max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full lg:flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-[760px] min-h-[520px] rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden p-5 md:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-content-muted">Current Stage</p>
                <p className="text-lg text-content-primary mt-2">{currentStep.title}</p>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-accent">
                Step 0{currentStep.id}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full pt-8"
              >
                <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] h-full">
                  <div className="rounded-[28px] border border-white/10 bg-[#0b0b0b] p-5 md:p-6 flex flex-col min-h-[360px]">
                    <div className="grid grid-cols-12 gap-3 min-h-[180px]">
                      <motion.div layout className="col-span-12 h-12 rounded-2xl bg-white/6 border border-white/8" />
                      <motion.div layout className="col-span-7 rounded-[24px] border border-accent/20 bg-accent/10 min-h-[180px]" />
                      <motion.div layout className="col-span-5 rounded-[24px] border border-white/10 bg-white/5 min-h-[180px]" />
                      <motion.div layout className="col-span-4 rounded-[24px] border border-white/10 bg-white/5 min-h-[120px]" />
                      <motion.div layout className="col-span-8 rounded-[24px] border border-white/10 bg-white/[0.04] min-h-[120px]" />
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                        <p className="text-sm uppercase tracking-[0.25em] text-content-muted">System Output</p>
                      </div>
                      <p className="text-2xl md:text-3xl text-content-primary max-w-lg">
                        {currentStep.desc}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-content-muted mb-4">Signals</p>
                      <div className="space-y-3">
                        {[84, 62, 91].map((value, index) => (
                          <div key={`${currentStep.id}-${value}-${index}`}>
                            <div className="flex items-center justify-between text-xs text-content-muted mb-2">
                              <span>Metric 0{index + 1}</span>
                              <span>{value}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.max(18, value - currentStep.id * 6)}%` }}
                                transition={{ duration: 0.55, delay: index * 0.08 }}
                                className="h-full rounded-full bg-accent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 flex-1 min-h-[220px] flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-content-muted">Step Note</p>
                        <h3 className="text-2xl text-content-primary mt-4">0{currentStep.id}. {currentStep.eyebrow}</h3>
                      </div>
                      <div className="rounded-[24px] border border-dashed border-white/15 p-4 text-sm text-content-muted leading-relaxed">
                        Слой анимации, сетка блоков и продуктовая логика синхронизируются в одном экране, чтобы интерфейс не выглядел как статичный макет.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
      <div className="mt-12 flex justify-center w-full z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform relative z-50">Запросить бесплатный доступ</button></div>
      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} />
          </div>
        </div>
      </div>
    </section>
  )
}