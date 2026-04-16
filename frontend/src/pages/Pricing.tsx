import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Seo } from '@/components/seo/Seo'
import { SITE } from '@/constants/site'

type PricingTab = 'pro' | 'business' | 'custom'

const PRICING_DATA = {
  pro: {
    title: 'Профессионалам',
    price: '2 900 ₽',
    period: '/мес',
    description: 'Для фрилансеров, инди-разработчиков и дизайнеров. Идеальный старт для первых проектов.',
    features: [
      'До 3-х активных проектов',
      'Генерация структуры по референсу',
      'Базовый визуальный редактор',
      'Экспорт в ZIP (HTML/CSS/JS)',
      'Публикация на сабдомене',
      'Стандартная поддержка'
    ],
    cta: 'Начать профессионально',
    theme: {
      accentText: 'text-cyan-400',
      accentBg: 'bg-cyan-400',
      borderFrom: 'from-cyan-400/40',
      shadow: 'shadow-[0_0_80px_-20px_rgba(34,211,238,0.2)]',
      badge: 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400',
      badgeText: 'Быстрый старт',
      button: 'liquid-glass hover:bg-cyan-400/20 hover:text-cyan-50 text-white',
      btnIconBg: 'bg-white/10 group-hover:bg-cyan-400/20 text-white border border-white/5',
      glow: 'rgba(34,211,238,0.15)'
    }
  },
  business: {
    title: 'Предпринимателям',
    price: '9 900 ₽',
    period: '/мес',
    description: 'Для фаундеров и команд. Тестируйте гипотезы быстрее рынка с глубокой аналитикой.',
    features: [
      'Неограниченное число проектов',
      'Продвинутый визуальный редактор',
      'Прямая интеграция аналитики',
      'Привязка своего домена',
      'Приоритетная поддержка 24/7',
      'AI-выжимки из метрик конверсии'
    ],
    cta: 'Запустить бизнес',
    theme: {
      accentText: 'text-accent',
      accentBg: 'bg-accent',
      borderFrom: 'from-accent/50',
      shadow: 'shadow-[0_0_80px_-20px_rgba(200,207,160,0.25)]',
      badge: 'bg-accent/10 border-accent/20 text-accent',
      badgeText: 'Хит продаж',
      button: 'bg-white text-black hover:bg-neutral-200',
      btnIconBg: 'bg-black/10',
      glow: 'rgba(200,207,160,0.15)'
    }
  },
  custom: {
    title: 'Индивидуальный',
    price: 'Перс.',
    period: 'условия',
    description: 'Для web-продакшенов и agency. Разверните платформу на своих серверах.',
    features: [
      'Всё из тарифа "Предприниматель"',
      'White-label экспорт и API',
      'Кастомные AI-модели',
      'Интеграция с внутренними CRM/ERP',
      'SLA и личный тех. менеджер',
      'Обучение команды продакшена'
    ],
    cta: 'Связаться с нами',
    theme: {
      accentText: 'text-indigo-400',
      accentBg: 'bg-indigo-400',
      borderFrom: 'from-indigo-500/50',
      shadow: 'shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)]',
      badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
      badgeText: 'Enterprise',
      button: 'liquid-glass hover:bg-indigo-500/20 hover:text-indigo-50 text-white',
      btnIconBg: 'bg-white/10 group-hover:bg-indigo-500/20 text-white border border-white/5',
      glow: 'rgba(99,102,241,0.15)'
    }
  }
}

// Split Text Animation Component
const InteractiveText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-default"
          whileHover={{
            y: -8,
            scale: 1.1,
            color: "var(--hover-color, #fff)",
            rotate: Math.random() * 10 - 5,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ "--hover-color": char === ' ' ? 'transparent' : '#fff' } as any}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

export function Pricing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = (searchParams.get('tab') as PricingTab) || 'pro'
  const [isHoveringSwitch, setIsHoveringSwitch] = useState(false)
  
  const [activeTab, setActiveTab] = useState<PricingTab>(
    ['pro', 'business', 'custom'].includes(initialTab) ? initialTab : 'pro'
  )

  useEffect(() => {
    const tab = searchParams.get('tab') as PricingTab
    if (tab && ['pro', 'business', 'custom'].includes(tab) && tab !== activeTab) {
      setActiveTab(tab)
    }
  }, [searchParams, activeTab])

  const handleTabChange = (tab: PricingTab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const currentPlan = PRICING_DATA[activeTab]
  const pricingStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Тарифы WAYNO',
    url: `${SITE.url}/pricing`,
    description:
      'Тарифы WAYNO для дизайнеров, агентств, стартапов и предпринимателей: создание сайтов, запуск MVP, аналитика и экспорт кода.',
    inLanguage: 'ru-RU',
  }

  return (
    <>
      <Seo
        title="Тарифы на AI-создание сайтов и запуск MVP"
        description="Сравните тарифы WAYNO для дизайнеров, агентств, стартапов и предпринимателей: AI-создание сайтов, публикация, аналитика, проверка гипотез и экспорт кода."
        path="/pricing"
        keywords={[
          'тарифы создание сайтов',
          'цена AI сайта',
          'стоимость лендинга AI',
          'тарифы конструктора сайтов',
          'проверка гипотез цена',
          'MVP сайт тариф',
          'Wayno pricing',
        ]}
        structuredData={pricingStructuredData}
      />
      <div className="min-h-screen pt-28 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden relative flex items-center">
      {/* Dynamic Background Glow based on Active Tab */}
      <motion.div 
        className="absolute top-1/2 left-[20%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -z-10"
        animate={{ 
          background: `radial-gradient(circle, ${currentPlan.theme.glow} 0%, transparent 70%)`,
          scale: isHoveringSwitch ? 1.1 : 1
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <div className="max-w-[1240px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="relative z-10 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium tracking-tight leading-[1] mb-6 select-none relative z-20">
                <InteractiveText text="ВСЁ " className={cn("text-white/40 font-serif italic mb-2 block", currentPlan.theme.accentText)} />
                <InteractiveText text="САМОЕ " />
                <InteractiveText text="НУЖНОЕ" /><br/>
                <InteractiveText text="в одном тарифе." className="text-white/60 font-light mt-1 block tracking-normal text-[clamp(1.5rem,3.5vw,3rem)]" />
              </h1>
              
              <p className="text-heading-3 text-content-muted max-w-[480px] leading-snug">
                Без скрытых платежей и лишнего мусора.<br/> Вы платите только за результат.
              </p>
            </motion.div>

            {/* Switcher */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 sm:mt-16 p-2 inline-flex items-center gap-2 liquid-glass rounded-2xl md:rounded-3xl w-full max-w-[580px] self-start flex-col sm:flex-row overflow-visible z-20 relative"
              onHoverStart={() => setIsHoveringSwitch(true)}
              onHoverEnd={() => setIsHoveringSwitch(false)}
            >
              {(Object.keys(PRICING_DATA) as PricingTab[]).map((key) => {
                const isActive = activeTab === key
                const plan = PRICING_DATA[key]
                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={cn(
                      "relative flex-1 px-4 py-4 text-sm font-medium transition-all duration-500 rounded-[1.25rem] whitespace-nowrap overflow-hidden group",
                      isActive ? "text-surface-primary" : "text-content-secondary hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPricing"
                        className="absolute inset-0 bg-white rounded-[1.25rem] shadow-lg"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    {/* Hover Glow on inactive tabs */}
                    {!isActive && (
                      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500", plan.theme.accentBg)} />
                    )}
                    <span className="relative z-10 block transform transition-transform duration-300 group-active:scale-95">{plan.title}</span>
                  </button>
                )
              })}
            </motion.div>
          </div>

          {/* Right Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative p-[1px] rounded-[32px] transition-all duration-700 h-full w-full",
                  `bg-gradient-to-b ${currentPlan.theme.borderFrom} via-white/5 to-transparent`,
                  currentPlan.theme.shadow
                )}
              >
                <div className="absolute inset-0 bg-surface-primary/80 backdrop-blur-3xl rounded-[32px] -z-10" />
                
                <div className="relative z-10 bg-surface-elevated/40 rounded-[31px] flex flex-col p-8 sm:p-10 border border-white/5 overflow-hidden">
                  
                  <div className="absolute top-0 right-0 p-8">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border",
                      currentPlan.theme.badge
                    )}>
                      {currentPlan.theme.badgeText}
                    </span>
                  </div>

                  <div className="mb-6 pt-2">
                    <h3 className={cn("text-[1.35rem] font-medium mb-3", currentPlan.theme.accentText)}>
                      {currentPlan.title}
                    </h3>
                    <p className="text-content-secondary text-sm h-10 leading-relaxed pr-8">
                      {currentPlan.description}
                    </p>
                  </div>

                  <div className="flex items-end gap-2 mb-8 pb-8 border-b border-border-subtle">
                    <div className="text-[3rem] leading-[0.9] font-normal tracking-tight text-white/90">
                      {currentPlan.price}
                    </div>
                    {currentPlan.period && (
                      <div className="text-content-muted text-sm pb-1 font-medium">
                        {currentPlan.period}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 mb-10 flex flex-col gap-4">
                    {currentPlan.features.map((feature, i) => (
                      <motion.div 
                        key={`${activeTab}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                        className="flex items-start gap-4 group/feature"
                      >
                        <div className={cn(
                          "w-[18px] h-[18px] mt-[3px] rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300",
                          "bg-surface-secondary border-white/10 group-hover/feature:border-white/30"
                        )}>
                          <Check className={cn("w-2.5 h-2.5", currentPlan.theme.accentText)} strokeWidth={3} />
                        </div>
                        <span className="text-content-primary/95 leading-tight text-[14px] transition-colors group-hover/feature:text-white">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <button className={cn(
                    "group flex items-center justify-between w-full p-4 rounded-2xl text-[15px] font-medium transition-all duration-500",
                    currentPlan.theme.button
                  )}>
                    <span className="pl-2">{currentPlan.cta}</span>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 group-active:scale-95",
                      currentPlan.theme.btnIconBg
                    )}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                  <p className="text-center text-content-muted/50 text-[11px] mt-4 uppercase tracking-widest font-medium">
                    {activeTab === 'custom' ? "Менеджер ответит в течение 10 минут" : "Отменить можно в любой момент"}
                  </p>
                  
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
      </div>
    </>
  )
}