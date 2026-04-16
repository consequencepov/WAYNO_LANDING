import { MarqueeText } from '@/components/ui/MarqueeText'

export function Marquee() {
  return (
    <section className="py-10 md:py-14 border-y border-border-subtle overflow-hidden">
      <MarqueeText
        text="от идеи до единорога"
        className="text-display font-serif font-bold text-content-primary/[0.08] uppercase"
      />
    </section>
  )
}
