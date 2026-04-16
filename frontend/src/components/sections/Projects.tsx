import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { TabFilter } from '@/components/ui/TabFilter'
import { PROJECTS, PROJECT_CATEGORIES } from '@/constants/projects'
import { useStore } from '@/store/useStore'

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { activeCategory, setActiveCategory } = useStore()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={ref} className="py-section relative">
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading label="подборка" className="mb-0">
            наши <span className="font-serif italic text-accent">решения</span>     
          </SectionHeading>
          <TabFilter
            categories={PROJECT_CATEGORIES}
            active={activeCategory}
            onSelect={(cat) => setActiveCategory(cat as 'all' | 'agency' | 'design' | 'startup')}
          />
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-8"
        >
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <a href="#" className="text-body-sm text-content-secondary hover:text-accent transition-colors duration-300">
            все проекты &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
