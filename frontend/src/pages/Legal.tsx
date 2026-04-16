import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { SITE } from '@/constants/site'

type TabId = 'privacy' | 'data' | 'cookies'

const TABS: { id: TabId; label: string; title: string; content: React.ReactNode }[] = [
  {
    id: 'privacy',
    label: 'Конфиденциальность',
    title: 'Политика конфиденциальности',
    content: (
      <div className="space-y-6 text-body text-content-secondary">
        <p>Настоящая политика конфиденциальности определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных ИП Трошков Данил Михайлович (ОГРНИП: 326700000002342, ИНН: 425202675538).</p>
        <h3 className="text-xl text-white font-medium mt-8 mb-4">1. Общие положения</h3>
        <p>1.1. Важнейшим условием реализации целей своей деятельности Оператор ставит соблюдение прав и свобод человека и гражданина при обработке его персональных данных.</p>
        <p>1.2. Настоящая политика Оператора в отношении обработки персональных данных применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта {SITE.url}.</p>
        
        <h3 className="text-xl text-white font-medium mt-8 mb-4">2. Основные понятия, используемые в Политике</h3>
        <p>2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
        <p>2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
        <p>2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу {SITE.url}.</p>
        
        <h3 className="text-xl text-white font-medium mt-8 mb-4">3. Оператор может обрабатывать следующие ПД Пользователя</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Фамилия, имя, отчество;</li>
          <li>Электронный адрес;</li>
          <li>Номера телефонов;</li>
          <li>Файлы cookie и другие данные для веб-аналитики.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'data',
    label: 'Обработка данных',
    title: 'Согласие на обработку данных',
    content: (
      <div className="space-y-6 text-body text-content-secondary">
        <p>Оставляя свои данные на сайте {SITE.url} посредством заполнения полей форм, Пользователь (субъект персональных данных) подтверждает и признает, что принимает настоящее Согласие на обработку персональных данных (далее – Согласие).</p>
        <p>Пользователь свободно, своей волей и в своем интересе дает согласие ИП Трошкову Данилу Михайловичу (ОГРНИП 326700000002342, ИНН 425202675538), который находится по адресу: Российская Федерация, на обработку своих персональных данных со следующими условиями:</p>
        <ol className="list-decimal pl-5 space-y-4">
          <li>Данное Согласие дается на обработку персональных данных, как без использования средств автоматизации, так и с их использованием.</li>
          <li>Согласие дается на обработку следующих персональных данных: персональные данные, не являющиеся специальными или биометрическими: контактный телефон, E-mail, имя.</li>
          <li>Цель обработки персональных данных: обработка входящих запросов физических лиц с целью оказания консультирования; аналитики действий физического лица на веб-сайте и функционирования веб-сайта; проведение рекламных и новостных рассылок.</li>
          <li>В ходе обработки с персональными данными будут совершены следующие действия: сбор; запись; систематизация; накопление; хранение; уточнение (обновление, изменение); извлечение; использование; передача (распространение, предоставление, доступ); блокирование; удаление; уничтожение.</li>
        </ol>
      </div>
    )
  },
  {
    id: 'cookies',
    label: 'Cookies',
    title: 'Политика использования Cookies',
    content: (
      <div className="space-y-6 text-body text-content-secondary">
        <p>Сайт {SITE.url} использует файлы cookie. Продолжая использовать наш сайт, вы соглашаетесь с нашей Политикой использования файлов cookie.</p>
        <p>Файлы cookie — это небольшие текстовые файлы, которые размещаются на вашем компьютере или мобильном устройстве веб-сайтами, которые вы посещаете. Они широко используются для того, чтобы веб-сайты могли работать или работать более эффективно, а также предоставлять информацию владельцам сайта.</p>
        
        <h3 className="text-xl text-white font-medium mt-8 mb-4">Типы файлов cookie, которые мы используем:</h3>
        <ul className="list-disc pl-5 space-y-4">
          <li><strong>Необходимые:</strong> Эти файлы cookie необходимы для работы сайта. Они позволяют вам перемещаться по сайту и использовать его функции.</li>
          <li><strong>Аналитические:</strong> Эти файлы cookie помогают нам понять, как посетители взаимодействуют с сайтом, собирая и сообщая информацию анонимно (например, Яндекс Метрика).</li>
          <li><strong>Функциональные:</strong> Эти файлы cookie позволяют сайту запоминать выборы, которые вы делаете (например, ваше имя пользователя или язык), и предоставлять расширенные, более персонализированные функции.</li>
        </ul>
        <p>Вы можете отключить использование файлов cookie в настройках вашего браузера, однако это может повлиять на функциональность нашего сайта.</p>
      </div>
    )
  }
]

export function Legal() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const activeTabIdFromUrl = searchParams.get('doc') as TabId | null
  const initialTab = TABS.find(t => t.id === activeTabIdFromUrl)?.id || 'privacy'
  
  const [activeTab, setActiveTab] = useState<TabId>(initialTab)

  useEffect(() => {
    const doc = searchParams.get('doc')
    if (doc && TABS.some(t => t.id === doc)) {
      setActiveTab(doc as TabId)
    }
  }, [searchParams])

  const handleTabChange = (id: TabId) => {
    setActiveTab(id)
    setSearchParams({ doc: id })
  }

  const activeContent = TABS.find(t => t.id === activeTab)

  const seoData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Правовая информация WAYNO - ${activeContent?.title}`,
    url: `${SITE.url}/legal?doc=${activeTab}`,
    description: 'Правовые документы ИП Трошков Данил Михайлович, политика конфиденциальности, обработка персональных данных и использование файлов cookie платформы WAYNO.',
    inLanguage: 'ru-RU'
  }

  return (
    <>
      <Seo 
        title={`Правовая информация | ${activeContent?.title}`}
        description="Правовые документы, политика конфиденциальности и условия обработки персональных данных платформы WAYNO."
        path={`/legal?doc=${activeTab}`}
        noindex={true}
        structuredData={seoData}
      />

      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16 mx-auto max-w-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
          className="max-w-4xl"
        >
          <div className="text-[11px] uppercase tracking-[0.28em] text-accent mb-6">Документы</div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">{activeContent?.title}</h1>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Sidebar Navigation */}
            <div className="md:w-64 shrink-0">
              <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar relative">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 text-left whitespace-nowrap md:whitespace-normal rounded-xl ${
                        isActive ? 'text-white' : 'text-content-secondary hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="legalTabIndicator"
                          className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-xl"
                          initial={false}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="prose prose-invert max-w-none"
                >
                  {activeContent?.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
