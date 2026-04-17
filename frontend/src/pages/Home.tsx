import { lazy, Suspense } from 'react';
import { Hero } from '@/components/sections/Hero';
import { MobileHome } from '@/components/mobile/MobileHome';
import { Seo } from '@/components/seo/Seo';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { SITE } from '@/constants/site';

// Lazy-load below-fold sections to reduce initial bundle
const SectionEditor = lazy(() => import('@/components/sections/SectionEditor').then(m => ({ default: m.SectionEditor })))
const SectionTransformation = lazy(() => import('@/components/sections/SectionTransformation').then(m => ({ default: m.SectionTransformation })))
const SectionHandoff = lazy(() => import('@/components/sections/SectionHandoff').then(m => ({ default: m.SectionHandoff })))
const PinSectionPartners = lazy(() => import('@/components/sections/PinSectionPartners').then(m => ({ default: m.PinSectionPartners })))
const SectionCTA = lazy(() => import('@/components/sections/SectionCTA').then(m => ({ default: m.SectionCTA })))
const SeoCaseStudies = lazy(() => import('@/components/sections/SeoCaseStudies').then(m => ({ default: m.SeoCaseStudies })))
const SeoClusters = lazy(() => import('@/components/sections/SeoClusters').then(m => ({ default: m.SeoClusters })))

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WAYNO',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE.url,
  inLanguage: 'ru-RU',
  description:
    'AI-платформа для создания сайтов, лендингов, MVP и проверки бизнес-гипотез: от идеи и референса до публикации и аналитики.',
  offers: {
    '@type': 'Offer',
    url: `${SITE.url}/pricing`,
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Создание сайтов и лендингов с помощью AI',
    'Генерация структуры по референсу и брифу',
    'Визуальный редактор сайта',
    'Экспорт исходного кода',
    'Публикация и запуск MVP',
    'Аналитика и проверка гипотез',
  ],
}

export function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <Seo
          title="Создание сайтов и лендингов с помощью AI"
          description="WAYNO помогает создавать сайты, лендинги и MVP через AI: генерация по запросу и референсу, визуальный редактор, экспорт кода, публикация и аналитика для проверки гипотез."
          path="/"
          keywords={[
            'создание сайтов с помощью AI',
            'AI лендинг',
            'генератор лендингов',
            'MVP сайт для стартапа',
            'проверка бизнес-гипотез',
            'сайт по референсу',
            'экспорт кода сайта',
            'визуальный редактор сайта',
            'создание сайта без команды разработчиков',
            'Wayno',
          ]}
          structuredData={homeStructuredData}
        />
        <MobileHome />
      </>
    );
  }

  return (
    <>
      <Seo
        title="Создание сайтов и лендингов с помощью AI"
        description="WAYNO помогает создавать сайты, лендинги и MVP через AI: генерация по запросу и референсу, визуальный редактор, экспорт кода, публикация и аналитика для проверки гипотез."
        path="/"
        keywords={[
          'создание сайтов с помощью AI',
          'AI лендинг',
          'генератор лендингов',
          'MVP сайт для стартапа',
          'проверка бизнес-гипотез',
          'сайт по референсу',
          'экспорт кода сайта',
          'визуальный редактор сайта',
          'создание сайта без команды разработчиков',
          'Wayno',
        ]}
        structuredData={homeStructuredData}
      />
      <main className="relative overflow-hidden bg-[#0a0a0a]">
        <Hero />
        <Suspense fallback={null}>
          <SectionEditor />
          <SectionTransformation />
          <SectionHandoff />
          <PinSectionPartners />
          <SeoCaseStudies />
          <SeoClusters />
          <SectionCTA />
        </Suspense>
      </main>
    </>
  )
}