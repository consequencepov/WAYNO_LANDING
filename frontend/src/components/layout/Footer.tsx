import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, ArrowUp, Instagram, Youtube, Linkedin } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SITE } from '@/constants/site'
import { FOOTER_LINKS } from '@/constants/navigation'
import { useStore } from '@/store/useStore'

export function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { brandMode, toggleBrandMode } = useStore()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="footer" ref={ref} className="relative bg-surface-primary border-t border-border-subtle">
      {/* CTA */}
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-section">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display leading-tight max-w-2xl"
          >
            {"от идеи "}
            <span className="font-bold">ДО</span>{' '}
            <span className="font-serif italic text-accent">единорога.</span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={toggleBrandMode}
            className="flex items-center gap-3 text-body-sm text-content-secondary"
          >
            <span className={cn(brandMode === 'professional' && 'text-content-primary')}>wayno professional</span>
            <div className="relative w-12 h-6 bg-surface-elevated rounded-full border border-border">
              <div className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-accent transition-transform duration-300',
                brandMode === 'entrepreneur' ? 'translate-x-6' : 'translate-x-0.5'
              )} />
            </div>
            <span className={cn(brandMode === 'entrepreneur' && 'text-content-primary')}>wayno entrepreneur</span>
          </motion.button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="border-t border-border-subtle">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">навигация</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.highlights.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-300 inline-flex items-center gap-1">
                      {link.label} <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">время</h4>
              <div className="space-y-1 text-body-sm text-content-secondary">
                <p>MSK &mdash; Москва</p>
                <p>GMT &mdash; Лондон</p>
              </div>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">контакты</h4>
              <div className="space-y-1 text-body-sm text-content-secondary">
                <a href={'mailto:' + SITE.email} className="block hover:text-content-primary transition-colors duration-300">{SITE.email}</a>
                <p>{SITE.phone}</p>
              </div>
            </div>
            <div>
              <h4 className="text-label uppercase tracking-widest text-content-muted mb-4">офисы</h4>
              <p className="text-body-sm text-content-secondary">{SITE.offices.join(' | ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, label: 'Instagram', href: SITE.social.instagram },
              { icon: Youtube, label: 'YouTube', href: SITE.social.youtube },
              { icon: Linkedin, label: 'LinkedIn', href: SITE.social.linkedin },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="text-content-muted hover:text-content-primary transition-colors duration-300" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-label text-content-muted">&copy; {SITE.copyright}</p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-content-primary transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
