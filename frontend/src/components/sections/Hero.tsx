import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { LogoToggle } from '@/components/ui/LogoToggle'
import { PromptInput } from '@/components/ui/PromptInput'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { useStore } from '@/store/useStore'

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  const { brandMode, setVideoReady, startVideo } = useStore()
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setVideoReady(false)

    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setVideoReady(true)
    }
  }, [setVideoReady])

  // Direct transformation for instant parallax without delay
  const x = useTransform(mouseX, [0, 1], ["2%", "-2%"])
  const y = useTransform(mouseY, [0, 1], ["2%", "-2%"])

  useEffect(() => {
    if (startVideo && videoRef.current) {
      videoRef.current.currentTime = 0
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video auto-play was prevented:", error)
        })
      }
    }
  }, [startVideo])

  useEffect(() => {
    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVideoEnded) return // Don't apply parallax until video ends
      if (rafId !== null) return // Throttle to 1 update per frame
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth)
        mouseY.set(e.clientY / window.innerHeight)
        rafId = null
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY, isVideoEnded])

  const content = {
    professional: {
      headline: (
        <>
          Создавай сайты <span className="font-serif italic font-light text-accent">&amp;</span><br />
          копируй <span className="font-serif italic font-light text-accent">референсы</span>
        </>
      )
    },
    entrepreneur: {
      headline: (
        <>
          Переноси бизнес<br />
          в <span className="font-serif italic font-light text-accent">цифровую среду</span>
        </>
      )
    }
  }

  const currentContent = content[brandMode as keyof typeof content] || content.professional

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Container */}
      <motion.div 
        style={{ x, y, scale: 1.05 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          ref={videoRef}
          muted
          preload="metadata"
          playsInline
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onCanPlayThrough={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
          onEnded={() => setIsVideoEnded(true)}
          onContextMenu={(e) => e.preventDefault()}
          controlsList="nodownload"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Premium Vignette & Dark Overlays for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a] transition-all duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_110%)] opacity-100" />
        
        {/* Subtle grid pattern to enhance product/interface feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Subtle Grain */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center mt-[-8vh] sm:mt-[-4vh] gap-6 sm:gap-10 lg:gap-12"
      >
        {/* Role Toggle */}
        <motion.div variants={fadeUp} className="w-full flex justify-center">
          <LogoToggle />
        </motion.div>

        {/* Dynamic Typography Zone */}
        <div className="flex flex-col items-center justify-center w-full relative">
          <motion.h1 
            key={`headline-${brandMode}`}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15, scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] leading-[1.05] tracking-[-0.02em] text-white font-medium text-center max-w-[700px] mx-auto z-10"
          >
            {currentContent.headline}
          </motion.h1>
        </div>

        {/* Command Bar Area */}
        <motion.div variants={fadeUp} className="w-full flex justify-center flex-col items-center relative z-20">
          <PromptInput />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
