import { cn } from '@/lib/cn'
import { useStore } from '@/store/useStore'

interface LogoToggleProps {
  className?: string
}

export function LogoToggle({ className }: LogoToggleProps) {
  const { brandMode, toggleBrandMode } = useStore()

  return (
    <button
      onClick={toggleBrandMode}
      className={cn(
        'relative flex items-center gap-1 p-1 bg-black/40 backdrop-blur-xl rounded-[1.5rem] border border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] hover:bg-black/50 transition-colors duration-500',
        className
      )}
      aria-label="Toggle role mode"
    >
      <div className={cn(
        'px-5 py-2 rounded-full transition-all duration-500 text-xs tracking-[0.08em] uppercase flex items-center justify-center min-w-[170px]',
        brandMode === 'professional' 
          ? 'bg-white/10 text-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/10' 
          : 'text-white/40 group-hover:text-white/60 font-medium border border-transparent'
      )}>
        Профессионалам
      </div>
      
      <div className={cn(
        'px-5 py-2 rounded-full transition-all duration-500 text-xs tracking-[0.08em] uppercase flex items-center justify-center min-w-[170px]',
        brandMode === 'entrepreneur' 
          ? 'bg-white/10 text-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/10' 
          : 'text-white/40 group-hover:text-white/60 font-medium border border-transparent'
      )}>
        Предпринимателям
      </div>
    </button>
  )
}


