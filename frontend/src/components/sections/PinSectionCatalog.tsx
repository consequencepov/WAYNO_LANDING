import { motion, AnimatePresence } from 'framer-motion'
import { CtaModal } from '@/components/ui'
import { useState } from 'react'
import { cn } from '@/lib/cn'

type MainTab = 'websites' | 'bots' | 'miniapps'

const TABS: { id: MainTab; label: string }[] = [
  { id: 'websites', label: 'Сайты' },
  { id: 'bots', label: 'Боты' },
  { id: 'miniapps', label: 'Mini Apps' }
]

const SUB_TABS = {
  websites: ['Лендинги', 'Веб-сервисы', 'Визитки'],
  bots: ['Telegram Бот', 'Бот в MAX'],
  miniapps: ['Сайт для телефонов', 'Mini apps в Telegram', 'Mini apps в MAX']
}

const ITEMS = {
  websites: [
    { title: 'Project Zero', category: 'Лендинг', image: 'bg-gradient-to-tr from-stone-800 to-stone-900' },
    { title: 'Nexus', category: 'Веб-сервис', image: 'bg-gradient-to-tr from-neutral-800 to-stone-800' },
    { title: 'Elevate', category: 'Визитка', image: 'bg-gradient-to-tr from-zinc-800 to-neutral-900' },
  ],
  bots: [
    { title: 'AutoSupport', category: 'Telegram Бот', image: 'bg-gradient-to-br from-blue-900/20 to-neutral-900' },
    { title: 'MAX Assistant', category: 'Бот в MAX', image: 'bg-gradient-to-br from-purple-900/20 to-neutral-900' },
  ],
  miniapps: [
    { title: 'Mobile Shop', category: 'Сайт для телефонов', image: 'bg-gradient-to-tr from-green-900/20 to-neutral-900' },
    { title: 'TG Store', category: 'Mini apps в Telegram', image: 'bg-gradient-to-tr from-blue-900/20 to-neutral-900' },
    { title: 'MAX Wallet', category: 'Mini apps в MAX', image: 'bg-gradient-to-tr from-orange-900/20 to-neutral-900' },
  ]
}

export function PinSectionCatalog() {
  const [isCtaOpen, setIsCtaOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<MainTab>('websites')

  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-24 bg-[#0a0a0a] z-[15] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col h-full gap-12">
        
        {/* Header / Tabs */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <h2 className="text-display-sm text-content-primary font-serif italic mb-4">Наши возможности</h2>
          
          <div className="flex items-center gap-1 border-b border-white/10 pb-4 w-full justify-center max-w-2xl">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-2 text-body-lg transition-colors relative',
                  activeTab === tab.id ? 'text-content-primary' : 'text-content-muted hover:text-content-primary/80'
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="catalogIndicator"
                    className="absolute bottom-[-17px] left-0 right-0 h-[1px] bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-content-muted font-mono text-sm overflow-x-auto pb-4">
            {SUB_TABS[activeTab].map((sub, i) => (
               <span key={i} className="whitespace-nowrap hover:text-accent transition-colors cursor-pointer">
                 / {sub}
               </span>
            ))}
          </div>
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 mt-8">
          <AnimatePresence mode="popLayout">
            {ITEMS[activeTab].map((item, i) => (
              <motion.div
                key={item.title + activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative cursor-pointer h-[40vh] min-h-[300px] overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-105", item.image)} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col">
                    <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.category}
                    </span>
                    <h3 className="text-heading-3 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
      <div className="absolute bottom-16 right-12 z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-2xl hover:bg-gray-200 transition-colors">Запустить пилот</button></div>
      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} />
    </section>
  )
}
