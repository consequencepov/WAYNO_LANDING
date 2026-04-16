import type { NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = []

export const FOOTER_LINKS = {
  highlights: [
    { label: 'ai-конструктор сайтов', href: '/ai-konstruktor-saytov' },
    { label: 'лидогенерация', href: '/landing-dlya-lidogeneratsii' },
    { label: 'ai saas', href: '/ai-sayt-dlya-saas' },
    { label: 'b2b поставщик', href: '/sayt-dlya-b2b-postavshika' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '/legal?doc=privacy' },
    { label: 'Политика обработки данных', href: '/legal?doc=data' },
    { label: 'Политика куки', href: '/legal?doc=cookies' },
  ]
} as const
