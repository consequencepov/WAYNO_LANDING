import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth < 1024 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))

export function useLenis() {
  useEffect(() => {
    if (lenisInstance) return
    // Skip smooth scrolling on mobile — saves continuous rAF overhead
    if (isMobileDevice()) return

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenisInstance?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}
