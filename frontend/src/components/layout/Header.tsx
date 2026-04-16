import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { CtaModal } from '@/components/ui'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isCtaOpen, setIsCtaOpen] = useState(false)

  // Collapse on scroll down
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-6 pointer-events-none transition-all duration-500',
        scrolled ? 'top-4' : 'top-6'
      )}
    >
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Main Nav Panel with Liquid Glass */}
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="flex items-center justify-center h-[52px] liquid-glass shadow-2xl rounded-full px-6"
        >
          <motion.div layout="position" className="flex items-center justify-center">
            <Link to="/" className="text-label uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors duration-300 flex-shrink-0">
              WAYNO
            </Link>
          </motion.div>
        </motion.div>

        {/* Create Website Action with Liquid Glass */}
        <button
          onClick={() => setIsCtaOpen(true)}
          className="h-[52px] px-6 flex items-center justify-center text-body-sm font-medium transition-all duration-300 liquid-glass shadow-2xl rounded-full hover:brightness-110 active:scale-95 text-white whitespace-nowrap cursor-pointer"
        >
          Бесплатный доступ
        </button>
      </div>
      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} />
    </motion.header>
  )
}

