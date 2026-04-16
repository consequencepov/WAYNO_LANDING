import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ArrowRight } from 'lucide-react'

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle email login
  }

  return (
    <div className="w-full flex flex-col space-y-12 relative">
      
      {/* Decorative Blur blob behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-surface-elevated/50 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-content-primary/80">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          WAYNO AI SYSTEM
        </div>
        <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-balance text-content-primary leading-[1.1]">
          От идеи до <span className="font-serif italic font-light text-accent">единорога</span>.
        </h1>
        <p className="text-content-secondary text-lg max-w-[85%] leading-relaxed">
          Создавайте, тестируйте и запускайте сайты нового уровня в один клик.
        </p>
      </div>

      <div className="space-y-6 bg-surface-primary/40 backdrop-blur-2xl border border-border-subtle p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        
        {/* Inner glow line top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <button
          type="button"
          className={cn(
            "group relative w-full h-[60px] flex items-center justify-center gap-3",
            "bg-surface-elevated hover:bg-[#1f1f1f] border border-border-subtle",
            "rounded-2xl transition-all duration-300",
            "overflow-hidden isolate"
          )}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="flex bg-[#FC3F1D] text-white font-bold w-[24px] h-[24px] items-center justify-center rounded-full text-xs z-10 shadow-md">
            Я
          </div>
          <span className="text-body font-medium text-content-primary z-10">Продолжить через Яндекс</span>
        </button>

        <div className="flex items-center gap-4 text-content-muted text-[10px] uppercase font-bold tracking-widest">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-border-subtle" />
          <span className="shrink-0 flex-none text-white/30">Или по Email</span>
          <div className="h-px w-full bg-gradient-to-l from-transparent via-border-subtle to-border-subtle" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="name@domain.com"
              className={cn(
                "w-full h-[60px] pl-5 pr-14 bg-[#0a0a0a] border rounded-2xl outline-none",
                "text-content-primary text-body placeholder:text-content-muted",
                "transition-all duration-500",
                isFocused ? "border-accent/40 bg-accent/[0.02]" : "border-border-subtle hover:border-content-secondary/40",
                "shadow-[inset_0_2px_16px_rgba(0,0,0,0.5)]"
              )}
            />
            
            <button
              type="submit"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "w-11 h-11 rounded-xl flex items-center justify-center",
                "transition-all duration-300",
                email.length > 3 && isFocused 
                  ? "bg-accent text-surface-primary opacity-100 translate-x-0" 
                  : "bg-surface-elevated text-content-muted opacity-50 cursor-not-allowed border border-border-subtle"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Focus glow border */}
            <div className={cn(
              "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 will-change-opacity",
              isFocused ? "shadow-[0_0_20px_rgba(200,207,160,0.15)] opacity-100" : "opacity-0"
            )} />
          </div>
        </form>

        <p className="text-[12px] text-content-secondary/60 text-center pt-2 leading-relaxed">
          Продолжая, вы соглашаетесь с нашей <br/>
          <a href="#" className="underline underline-offset-4 decoration-border-subtle hover:text-content-primary transition-colors">Политикой конфиденциальности</a>
        </p>
      </div>
    </div>
  )
}
