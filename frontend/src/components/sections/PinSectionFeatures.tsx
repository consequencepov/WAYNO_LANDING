import { motion } from 'framer-motion'
import { CtaModal } from '@/components/ui'
import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/cn'

const features = [
  { id: 'design', label: 'Дизайн' },
  { id: 'code', label: 'Код' },
  { id: 'analytics', label: 'Аналитика' }
]

export function PinSectionFeatures() {
  const [isCtaOpen, setIsCtaOpen] = useState(false)
  const { brandMode } = useStore()
  const [activeFeature, setActiveFeature] = useState(features[0]?.id)

  const isCreative = brandMode === 'professional'

  // Text content based on "профессионалам/предпринимателям"
  const title = isCreative 
    ? 'Полный контроль над визуалом' 
    : 'Мгновенный запуск бизнес-гипотез'
    
  const desc = isCreative
    ? 'Редактируй каждый пиксель, используй Ogg и Playfair, создавай кинематографичные анимации без ограничений платформы. Выгружай чистый React-код.'
    : 'Сгенерировал, запустил на субдомене или своем, проверил метрики. Встроенная аналитика и AI-выжимка конверсий с первого дня.'

  return (
    <section className="h-screen flex items-center sticky top-0 bg-surface-primary overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-[5]">
      {/* Container */}
      <div className="max-w-[1440px] px-6 md:px-12 lg:px-16 mx-auto w-full h-full flex flex-col lg:flex-row items-center pt-24 pb-32 gap-12">
        
        {/* Left: Text Description */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 z-10">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-heading-3 lg:text-heading-2 text-content-primary mb-4">
              {title}
            </h2>
            <p className="text-body-lg text-content-muted leading-relaxed">
              {desc}
            </p>
          </motion.div>
        </div>

        {/* Right: Interactive Infographics (Larger) */}
        <div className="w-full lg:w-2/3 h-full relative flex flex-col pt-8 lg:pt-0">
          
          {/* Top toggles */}
          <div className="absolute top-0 right-0 z-20 flex gap-2 p-2 bg-surface-secondary/50 backdrop-blur-xl rounded-full border border-white/5">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(f.id)}
                className={cn(
                  'px-6 py-2 rounded-full text-body-sm font-medium transition-all duration-300',
                  activeFeature === f.id 
                    ? 'bg-accent text-surface-primary' 
                    : 'text-content-muted hover:text-content-primary'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Interactive Hero Box */}
          <div className="w-full h-full max-h-[70vh] rounded-3xl overflow-hidden glass border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative shadow-2xl flex items-center justify-center">
            {/* Visual placeholder based on activeFeature */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
              {activeFeature === 'design' && (
                <div className="w-full h-full border border-dashed border-white/20 rounded-xl flex items-center justify-center bg-white/[0.01]">
                   <div className="w-32 h-32 rounded-full bg-accent/20 blur-3xl absolute top-1/4 left-1/4" />
                   <p className="text-accent text-lg font-serif italic relative z-10">Трансформация пикселей</p>
                </div>
              )}
              {activeFeature === 'code' && (
                <div className="w-full h-full font-mono text-sm text-content-muted/50 p-6 bg-surface-primary/80 rounded-xl overflow-hidden">
                  <pre>
                    <code>{`function Hero() {\n  return (\n    <motion.div className="h-screen">\n      <DesignBase />\n    </motion.div>\n  )\n}`}</code>
                  </pre>
                </div>
              )}
              {activeFeature === 'analytics' && (
                <div className="w-full h-full flex flex-col gap-4 p-8">
                  <div className="flex-1 rounded bg-accent/10 border border-accent/20 flex items-end">
                    <div className="w-1/4 h-1/2 bg-accent/40 rounded-t border-t border-accent" />
                    <div className="w-1/4 h-3/4 bg-accent/60 rounded-t border-t border-accent ml-2" />
                    <div className="w-1/4 h-full bg-accent text-surface-primary flex justify-center pt-4 font-bold rounded-t ml-2">98%</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="group relative px-6 py-3 font-bold text-white rounded-full overflow-hidden bg-surface border border-white/20 hover:border-accent transition-all"><span className="relative z-10">Бесплатный запуск</span><div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform"></div></button></div>
      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} />
    </section>
  )
}
