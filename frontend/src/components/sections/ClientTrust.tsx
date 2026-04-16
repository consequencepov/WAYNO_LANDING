import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CLIENTS } from '@/constants/clients'
import { cn } from '@/lib/cn'

const sizeClasses = {
  sm: 'text-body-sm',
  md: 'text-heading-3',
  lg: 'text-heading-2',
} as const

export function ClientTrust() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section ref={ref} className="py-section bg-surface-secondary/50">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading>
          От идеи до <span className="font-serif italic text-accent">единорога</span>
        </SectionHeading>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center min-h-[280px] py-8">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={cn(
                'text-content-muted/40 hover:text-content-secondary transition-colors duration-500 font-light cursor-default',
                sizeClasses[client.size]
              )}
            >
              {client.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
