import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    agency: 'агентства',
    design: 'дизайнеры',
    startup: 'стартапы'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="group flex-shrink-0 w-[280px] md:w-[360px] cursor-pointer"
    >
      <div
        className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative"
        style={{ backgroundColor: project.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-4 left-4 text-[72px] md:text-[96px] font-light leading-none text-white/[0.07] font-serif select-none">
          {project.number}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-body font-medium group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-body-sm text-content-muted mt-1">{project.description}</p>
        </div>
        <span className="text-label uppercase text-content-muted flex-shrink-0">{categoryLabels[project.category] || project.category}</span>
      </div>
    </motion.article>
  )
}
