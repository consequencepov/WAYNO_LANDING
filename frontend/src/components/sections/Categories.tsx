import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/cn'

const CATEGORIES = [
  { title: 'СОЗДАНИЕ', description: 'Сайт по запросу от идеи до структуры' },
  { title: 'ИМПОРТ', description: 'Пересборка по визуальному референсу' },
  { title: 'ЗАПУСК', description: 'Конструктор, выгрузка и публикация' },
]

export function Categories() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="categories" ref={ref} className="py-section-sm">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'group border-b border-border-subtle py-12 md:py-16 flex items-center justify-between cursor-pointer',
              'hover:border-accent transition-colors duration-500',
              i === 0 && 'border-t'
            )}
          >
            <h3 className="font-serif text-display font-bold tracking-tight group-hover:text-accent transition-colors duration-500">
              {cat.title}
            </h3>
            <p className="hidden md:block text-body text-content-muted group-hover:text-content-secondary transition-colors duration-500 max-w-sm text-right">
              {cat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
