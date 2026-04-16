import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useStore } from '@/store/useStore'

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { isVideoReady, setStartVideo } = useStore()
  const location = useLocation()

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden'

    let currentStep = 0
    let timer: NodeJS.Timeout

    const startLoading = () => {
      const duration = 2000 // min 2 seconds for aesthetic
      const interval = 20 // update every 20ms
      const steps = duration / interval
      const isHome = location.pathname === '/'

      timer = setInterval(() => {
        currentStep++
        const easeProgress = easeOutExpo(currentStep / steps)
        const easePercent = Math.round(easeProgress * 100)
        
        // Logic: Approach 90% purely on time.
        // Wait for videoReady to go to 100% only if we are on Home page.
        let currentProgress = Math.min(easePercent, 100)
        
        if (easePercent > 90 && isHome && !isVideoReady) {
          currentProgress = 90
        }

        const isFullyLoaded = isHome ? (easePercent >= 100 && isVideoReady) : (easePercent >= 100)

        if (isFullyLoaded) {
          setProgress(100)
          clearInterval(timer)
          
          setTimeout(() => {
            setLoading(false)
            if (isHome) setStartVideo(true)
            document.body.style.overflow = ''
          }, 800) // Hold at 100% for brief moment, then fade out
        } else {
          setProgress(currentProgress)
        }

      }, interval)
    }

    startLoading()

    return () => {
      if (timer) clearInterval(timer)
      document.body.style.overflow = ''
    }
  }, [isVideoReady, setStartVideo, location.pathname])

  // Easing function for smoother counter
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  }

  const containerVariants = {
    initial: {
      opacity: 1,
      y: '0%',
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Custom very smooth ease-in-out
      }
    }
  }

  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 + i * 0.04,
      }
    })
  }

  const word = 'WAYNO'

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-surface-primary flex flex-col justify-between p-6 md:p-12 items-center"
        >
          <div className="flex justify-between w-full uppercase tracking-widest text-[10px] md:text-xs text-content-secondary font-sans">
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2, duration: 1 }}
            >
              Crafting Digital Experiences
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2, duration: 1 }}
            >
              [ AI Platform ]
            </motion.span>
          </div>

          <div className="relative flex items-center justify-center w-full h-full my-auto overflow-hidden">
              {word.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-serif text-[15vw] md:text-[12vw] leading-none text-content-primary italic px-1 md:-ml-4 drop-shadow-2xl"
                >
                  {char}
                </motion.span>
              ))}
          </div>

          <div className="flex w-full items-end justify-between font-sans">
            <div className="flex-1 mr-6 md:mr-12 mb-[0.6rem] md:mb-[1.3rem]">
              <motion.div 
                className="h-[1px] bg-accent w-full"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            
            <div className="text-[3rem] md:text-[5rem] font-sans tracking-tighter text-content-primary flex items-baseline leading-[0.8] shrink-0">
              <span className="w-[1ch] text-right inline-block font-medium">{Math.floor(progress / 100) % 10}</span>
              <span className="w-[1ch] text-right inline-block font-medium">{Math.floor((progress % 100) / 10)}</span>
              <span className="w-[1ch] text-right inline-block font-medium">{progress % 10}</span>
              <span className="text-body md:text-heading-3 text-accent ml-1 md:ml-2">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
