import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface TabFilterProps {
  categories: readonly string[]
  active: string
  onSelect: (cat: string) => void
}

export function TabFilter({ categories, active, onSelect }: TabFilterProps) {
  const categoryLabels: Record<string, string> = {
    all: 'все',
    agency: 'агентства',
    design: 'дизайнеры',
    startup: 'стартапы'
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-surface-secondary border border-border-subtle">
      {['all', ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            'relative px-4 py-2 text-body-sm capitalize rounded-full transition-colors duration-300',
            active === cat ? 'text-content-primary' : 'text-content-muted hover:text-content-secondary'
          )}
        >
          {active === cat && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-surface-elevated rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{categoryLabels[cat] || cat}</span>
        </button>
      ))}
    </div>
  )
}
