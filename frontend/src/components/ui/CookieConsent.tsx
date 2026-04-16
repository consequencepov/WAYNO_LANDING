import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Cookie } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem('wayno_cookie_consent')
    if (!hasConsented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('wayno_cookie_consent', 'true')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('wayno_cookie_consent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-50 p-6 rounded-3xl bg-[#080808]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Subtle glow effect behind */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,207,160,0.1),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent/10 border border-accent/20">
                  <Cookie className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-medium">Мы используем файлы Cookie</h3>
              </div>
              <button 
                onClick={declineCookies}
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm leading-relaxed text-content-secondary">
              WAYNO использует файлы cookie для улучшения работы сайта, персонализации контента и аналитики. 
              Продолжая работу, вы соглашаетесь с нашей{' '}
              <Link to="/legal?doc=cookies" className="text-white hover:text-accent underline underline-offset-4 decoration-white/20 hover:decoration-accent/40 transition-all">
                Политикой использования файлов cookie
              </Link>.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={acceptCookies}
                className="flex-1 bg-white text-black font-medium py-2.5 px-4 rounded-full text-sm hover:bg-accent transition-all duration-300"
              >
                Принять все
              </button>
              <button
                onClick={declineCookies}
                className="flex-1 bg-white/[0.04] border border-white/10 text-white font-medium py-2.5 px-4 rounded-full text-sm hover:bg-white/[0.08] transition-all duration-300"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
