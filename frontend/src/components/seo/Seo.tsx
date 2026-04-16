import { useEffect } from 'react'
import { SITE } from '@/constants/site'

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

type SeoProps = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  noindex?: boolean
  structuredData?: StructuredData
}

const DEFAULT_KEYWORDS = [
  'создание сайтов',
  'AI конструктор сайтов',
  'генерация сайтов',
  'создание лендингов',
  'проверка гипотез',
  'MVP сайт',
  'сайт по референсу',
  'экспорт кода',
  'визуальный редактор сайта',
  'AI для стартапов',
  'AI для агентств',
  'Wayno',
]

const DEFAULT_IMAGE = `${SITE.url}/og-wayno.svg`

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertStructuredData(data: StructuredData) {
  const scriptId = 'wayno-structured-data'
  let script = document.head.querySelector<HTMLScriptElement>(`script#${scriptId}`)

  if (!script) {
    script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

function buildFullTitle(title: string) {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
}

export function Seo({
  title,
  description,
  path = '/',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE.url).toString()
    const fullTitle = buildFullTitle(title)
    const robots = noindex
      ? 'noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.documentElement.lang = 'ru'
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', keywords.join(', '))
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'googlebot', robots)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', 'ru_RU')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', DEFAULT_IMAGE)
    upsertMeta('property', 'og:image:type', 'image/svg+xml')

    upsertLink('canonical', canonicalUrl)

    if (structuredData) {
      upsertStructuredData(structuredData)
    }
  }, [description, keywords, noindex, path, structuredData, title])

  return null
}