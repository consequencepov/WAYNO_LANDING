import { Hero } from '@/components/sections/Hero';
import { SectionEditor } from '@/components/sections/SectionEditor';
import { SectionTransformation } from '@/components/sections/SectionTransformation';
import { SectionHandoff } from '@/components/sections/SectionHandoff';
import { PinSectionPartners } from '@/components/sections/PinSectionPartners';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { SeoCaseStudies } from '@/components/sections/SeoCaseStudies';
import { SeoClusters } from '@/components/sections/SeoClusters';
import { MobileHome } from '@/components/mobile/MobileHome';
import { Seo } from '@/components/seo/Seo';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { SITE } from '@/constants/site';

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
        <SectionEditor />
        <SectionTransformation />
        <SectionHandoff />
        <PinSectionPartners />
        <SeoCaseStudies />
        <SeoClusters />
        <SectionCTA />
      </main>
    </>
  )
}