import { type ReactNode } from 'react'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface AuthLayoutProps {
  left: ReactNode
  right: ReactNode
}

export function AuthLayout({ left, right }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-surface-primary text-content-primary flex flex-col lg:flex-row font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GrainOverlay />
      </div>
      
      {/* Header Overlay (Logo) */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-12 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="text-xl font-medium tracking-tight hover:text-accent transition-colors duration-300 pointer-events-auto mix-blend-difference">
          WAYNO
        </Link>
      </header>

      {/* Left Panel (Sticky/Pinned) */}
      <div 
        className={cn(
          "w-full lg:w-[45%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-24 lg:py-0 z-20 lg:h-screen",
          "lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-border-subtle",
          "bg-surface-primary lg:bg-surface-primary/80 lg:backdrop-blur-md"
        )}
      >
        <motion.div 
          className="max-w-[440px] w-full mx-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {left}
        </motion.div>
      </div>

      {/* Right Panel (Scrollable Infographic/Features Pin Sections) */}
      <div className="w-full lg:w-[55%] z-10 flex flex-col bg-surface-secondary/20 lg:bg-transparent">
        {right}
      </div>
    </div>
  )
}
