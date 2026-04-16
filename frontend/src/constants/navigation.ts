import type { NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = []

export const FOOTER_LINKS = {
  highlights: [
    { label: 'тарифы', href: '/pricing' },
    { label: 'ai-конструктор сайтов', href: '/ai-konstruktor-saytov' },
    { label: 'лидогенерация', href: '/landing-dlya-lidogeneratsii' },
    { label: 'ai saas', href: '/ai-sayt-dlya-saas' },
    { label: 'b2b поставщик', href: '/sayt-dlya-b2b-postavshika' },
  ],
} as const
