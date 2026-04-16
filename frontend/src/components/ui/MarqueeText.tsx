import { cn } from '@/lib/cn'

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: 'normal' | 'slow'
}

export function MarqueeText({ text, className, speed = 'normal' }: MarqueeTextProps) {
  const separator = ' \u2022 '
  const content = Array.from({ length: 8 }, () => text).join(separator) + separator

  return (
    <div className={cn('overflow-hidden whitespace-nowrap select-none', className)}>
      <div className={cn(
        'inline-flex',
        speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'
      )}>
        <span className="inline-block px-4">{content}</span>
        <span className="inline-block px-4">{content}</span>
      </div>
    </div>
  )
}
