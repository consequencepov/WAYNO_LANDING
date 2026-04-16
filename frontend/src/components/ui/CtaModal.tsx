import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, User, ArrowRight, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { submitLead } from '@/lib/leads'
import type { PromptLeadDraft } from '@/types'

interface CtaModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  leadSource?: string
  promptDraft?: PromptLeadDraft | null
  onSubmitted?: () => void
}

export function CtaModal({
  isOpen,
  onClose,
  title = 'Бесплатный доступ',
  leadSource,
  promptDraft,
  onSubmitted,
}: CtaModalProps) {
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const hasPromptContext = Boolean(
    promptDraft?.promptText?.trim() ||
    promptDraft?.attachedUrls?.length ||
    promptDraft?.attachedFileNames?.length ||
    promptDraft?.selectedDesign?.trim()
  )

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setContact('')
      setContactMethod('phone')
      setIsSubmitting(false)
      setErrorMessage('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      setIsSubmitting(true)

      await submitLead({
        name,
        contactMethod,
        contact,
        source: leadSource || title,
        ...promptDraft,
      })

      onSubmitted?.()
      onClose()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ pointerEvents: 'auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-surface border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-display-sm text-white mb-2">{title}</h2>
              <p className="text-body-sm text-content-secondary mb-8">
                Оставьте заявку, и мы свяжемся с вами в ближайшее время.
              </p>

              {hasPromptContext && (
                <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-accent/80">Prompt context</div>
                  {promptDraft?.promptText?.trim() && (
                    <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-4">{promptDraft.promptText.trim()}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/55">
                    {promptDraft?.selectedDesign?.trim() && (
                      <span className="rounded-full border border-white/10 px-3 py-1.5">
                        Дизайн: {promptDraft.selectedDesign.trim()}
                      </span>
                    )}
                    {promptDraft?.attachedUrls?.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1.5">
                        URL: {item.replace(/^https?:\/\//, '')}
                      </span>
                    ))}
                    {promptDraft?.attachedFileNames?.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1.5">
                        Файл: {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    />
                  </div>
                  
                  <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={cn(
                        "flex items-center justify-center gap-2 flex-1 h-10 rounded-xl text-sm font-medium transition-all",
                        contactMethod === 'phone' ? "bg-white/10 text-white shadow-sm" : "text-content-tertiary hover:text-content-secondary"
                      )}
                    >
                      <Phone className="w-4 h-4" />
                      Телефон
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={cn(
                        "flex items-center justify-center gap-2 flex-1 h-10 rounded-xl text-sm font-medium transition-all",
                        contactMethod === 'email' ? "bg-white/10 text-white shadow-sm" : "text-content-tertiary hover:text-content-secondary"
                      )}
                    >
                      <Mail className="w-4 h-4" />
                      Почта
                    </button>
                  </div>

                  <div className="relative">
                    {contactMethod === 'phone' ? (
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                    ) : (
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                    )}
                    <input
                      type={contactMethod === 'phone' ? 'tel' : 'email'}
                      placeholder={contactMethod === 'phone' ? '+7 (___) ___-__-__' : 'email@example.com'}
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center gap-2 bg-white text-black rounded-2xl font-medium hover:bg-white/90 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                {errorMessage && (
                  <p className="text-center text-xs text-red-300">{errorMessage}</p>
                )}
                <p className="text-center text-[11px] text-content-tertiary max-w-[280px] mx-auto">
                  Нажимая кнопку, вы соглашаетесь с правилами сервиса.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
