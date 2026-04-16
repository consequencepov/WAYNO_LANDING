# ⚠️ ОБЯЗАТЕЛЬНОЕ ПРАВИЛО ДОКУМЕНТАЦИИ
# Любое изменение в коде, архитектуре, зависимостях, секциях, компонентах, стилях, анимациях,
# маршрутизации, структуре файлов, именовании, ассетах, логике, поведении UI, деталях реализации
# или выборе библиотек ДОЛЖНО быть НЕМЕДЛЕННО отражено и записано в этом файле документации.
# Это обязательно и непрерывно. Недокументированные изменения кода запрещены.

---

# WAYNO BLACK — Документация проекта

## 1. Назначение проекта

**WAYNO BLACK** — премиальный фронтенд-сайт для креативно-технологического коллектива. Проект создан как демонстрация высококлассного веб-дизайна и разработки на уровне Awwwards-номинаций.

Сайт воссоздаёт ощущение и качество исполнения, вдохновлённое [thebh.co](https://thebh.co/), с оригинальным контентом, дизайн-системой и реализацией.

## 2. Визуальная цель

- Тёмная, премиальная, кинематографичная эстетика
- Смешение sans-serif и serif типографики для визуального контраста
- Тонкие зернистые текстуры (grain overlay)
- Плавные анимации при прокрутке и наведении
- Акцентный sage/olive цвет на тёмном фоне
- Ощущение дорогого, намеренного дизайна в каждой секции
- Горизонтальные карусели, marquee-анимации, stagger-переходы

## 3. Краткое описание анализа эталона

Эталонный сайт (thebh.co) — это тёмный одностраничный лендинг креативного агентства. Ключевые характеристики:

| Аспект | Детали |
|--------|--------|
| Фон | Почти чёрный (#0A0A0A) |
| Текст | Почти белый (#EDEDED) |
| Акцент | Приглушённый sage/olive (#C8CFA0) |
| Шрифт sans | LINE Seed Sans (мы: Plus Jakarta Sans) |
| Шрифт serif | Ogg (мы: Playfair Display) |
| Прокрутка | Smooth scroll (Lenis) |
| Анимации | GSAP, Framer Motion |
| Текстура | SVG grain overlay |
| Секции | 8 секций (header → footer) |

## 4. Технологический стек

| Технология | Версия | Обоснование |
|-----------|--------|-------------|
| React | 18.3.x | Основной UI-фреймворк (обязательное требование) |
| TypeScript | 5.6.x | Типобезопасность, DX |
| Vite | 6.0.x | Быстрый сборщик с HMR |
| Tailwind CSS | 3.4.x | Утилитарные стили, дизайн-система |
| Framer Motion | 11.x | Компонентные анимации, layout-анимации |
| GSAP | 3.12.x | Scroll-driven анимации, ScrollTrigger |
| Lenis | 1.1.x | Плавная прокрутка |
| React Router | 6.28.x | Маршрутизация (SPA) |
| clsx | 2.1.x | Условные классы |
| tailwind-merge | 2.5.x | Объединение Tailwind классов |
| Lucide React | 0.454.x | Иконки |
| Zustand | 5.0.x | Глобальное состояние |
| react-intersection-observer | 9.13.x | In-view триггеры |
| Embla Carousel | 8.3.x | Горизонтальная карусель проектов |

## 5. Структура проекта

```
WAYNO BLACK/
├── frontend/                    # React приложение
│   ├── public/
│   │   ├── favicon.svg
│   │   └── fonts/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx              # Корневой компонент
│   │   │   └── Router.tsx           # Маршрутизация
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx       # Sticky навигация
│   │   │   │   ├── Footer.tsx       # Футер с CTA
│   │   │   │   ├── Layout.tsx       # Обёртка (Header + Outlet + Footer)
│   │   │   │   └── index.ts
│   │   │   ├── sections/
│   │   │   │   ├── Hero.tsx         # Полноэкранная hero-секция
│   │   │   │   ├── PinSectionFeatures.tsx # Пин-секция с инфографикой (залипание)
│   │   │   │   ├── PinSectionCards.tsx    # Свайп-карточки (тактильность)
│   │   │   │   ├── PinSectionCatalog.tsx  # Каталог проектов/фич (TheBH style)
│   │   │   │   ├── PinSectionPartners.tsx # Marquee для партнеров/технологий
│   │   │   │   └── index.ts
│   │   │   └── ui/
│   │   │       ├── FloatingPrompt.tsx
│   │   │       ├── GrainOverlay.tsx
│   │   │       ├── SectionHeading.tsx
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── TabFilter.tsx
│   │   │       ├── MarqueeText.tsx
│   │   │       ├── LogoToggle.tsx
│   │   │       ├── ScrollIndicator.tsx
│   │   │       └── index.ts
│   │   ├── constants/
│   │   │   ├── site.ts              # Метаданные сайта
│   │   │   ├── navigation.ts       # Навигационные ссылки
│   │   │   ├── projects.ts         # Данные проектов
│   │   │   └── clients.ts          # Данные клиентов
│   │   ├── features/
│   │   ├── hooks/
│   │   │   ├── useLenis.ts         # Инициализация Lenis
│   │   │   ├── useMediaQuery.ts    # Responsive hooks
│   │   │   └── useScrollProgress.ts
│   │   ├── lib/
│   │   │   └── cn.ts               # clsx + tailwind-merge
│   │   ├── pages/
│   │   │   └── Home.tsx            # Главная страница
│   │   ├── store/
│   │   │   └── useStore.ts         # Zustand store
│   │   ├── styles/
│   │   │   └── globals.css         # Tailwind + базовые стили
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript типы
│   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── postcss.config.js
├── backend/                     # Заглушка для будущего API
│   └── .gitkeep
├── setup.js                     # Генератор проекта (node setup.js)
├── create_dirs.bat              # Одним кликом: запускает setup.js
├── DOCUMENTATION_RU.md          # Этот файл
└── DOCUMENTATION_EN.md          # Англоязычная документация
```

## 6. Описание компонентов

### Layout
- **Header** — Фиксированная навигация. Логотип, ссылки, CTA кнопка. Backdrop-blur при прокрутке.
- **Footer** — CTA заголовок со смешанной типографикой, переключатель бренда, информационная сетка, соцсети, copyright.
- **Layout** — Обёртка: grain overlay + Header + <Outlet> + Footer.

### Секции (sections)
- **Hero** — Полноэкранная секция. Градиентный фон, крупный заголовок, двуязычный текст, переключатель бренда, индикатор прокрутки. Stagger-анимация при загрузке.
- **Showreel** — Заголовок секции, видеоплеер-заглушка с кнопкой Play, горизонтальная бегущая полоса логотипов.
- **ClientTrust** — Сетка с именами клиентов разных размеров, stagger fade-in.
- **Projects** — Фильтр по категориям (TabFilter), горизонтальная карусель (Embla), нумерованные карточки проектов, навигация prev/next.
- **Categories** — Три крупные строки с serif-заголовками (FILMS, DESIGN, DIGITAL), hover-эффекты.
- **Marquee** — Непрерывно прокручивающийся текст "defy the expected".
- **Auth (Поддомен Авторизации)** — Сплит-экран: слева форма входа (Яндекс/Email) с типографикой "От идеи до единорога", справа пин-секция с анимированной стеклянной инфографикой (карточки процесса "Собери -> проект -> конверсия"). Реализовано вне базового Layout для эффекта полного экрана.

### UI-примитивы
- **GrainOverlay** — Фиксированный noise overlay.
- **SectionHeading** — Повторяемый заголовок секции с label и анимацией.
- **ProjectCard** — Карточка проекта с номером, цветным фоном, hover-эффектом.
- **TabFilter** — Переключатель категорий с animated indicator.
- **MarqueeText** — Компонент бегущей строки.
- **LogoToggle** — Переключатель creative/engineering.
- **ScrollIndicator** — Анимированный индикатор прокрутки.

## 7. Дизайн-система

### Типографика
| Роль | Шрифт | Размер | Вес | Использование |
|------|-------|--------|-----|---------------|
| Primary sans | Plus Jakarta Sans | 11-82px | 300-700 | Основной текст, заголовки |
| Display serif | Playfair Display | 36-82px | 400-700 | Акцентные слова (italic) |
| Label | Plus Jakarta Sans | 11px | 500 | Метки, uppercase, tracking |

### Шкала размеров
- `display-xl`: clamp(3rem, 5.5vw, 5.125rem) — Hero заголовок
- `display`: clamp(2.5rem, 4.5vw, 4rem) — Крупные заголовки
- `heading-1`: clamp(2rem, 3.5vw, 3rem)
- `heading-2`: clamp(1.5rem, 2.5vw, 2.25rem)
- `heading-3`: clamp(1.25rem, 1.8vw, 1.5rem)
- `body`: 1rem / 16px
- `body-sm`: 0.875rem / 14px
- `label`: 0.6875rem / 11px

### Цвета
| Токен | Значение | Использование |
|-------|----------|---------------|
| surface-primary | #0A0A0A | Основной фон |
| surface-secondary | #141414 | Вторичный фон |
| surface-elevated | #1A1A1A | Приподнятые элементы |
| content-primary | #EDEDED | Основной текст |
| content-secondary | #A0A0A0 | Вторичный текст |
| content-muted | #666666 | Приглушённый текст |
| accent | #C8CFA0 | Акцентный sage/olive |
| border-subtle | rgba(237,237,237,0.08) | Тонкие разделители |

### Отступы
- Секции: `py-section` = clamp(6rem, 10vw, 10rem)
- Контейнер: `max-w-container` = 1440px, `px-6 md:px-12 lg:px-16`

## 8. Правила анимаций

- **Easing**: expo-out `cubic-bezier(0.16, 1, 0.3, 1)` для входных анимаций
- **Duration**: 0.6-1.0s для появления секций, 0.3s для hover
- **Stagger**: 0.05-0.15s между дочерними элементами
- **Scroll**: Lenis smooth scroll, duration 1.2s
- **Marquee**: CSS animation, 30s linear infinite
- **Hover**: transform scale + color transition, 300ms
- **Reduced motion**: Уважать `prefers-reduced-motion`

## 9. Правила адаптивности

- Mobile-first подход
- Breakpoints: `md` (768px), `lg` (1024px), `xl` (1280px)
- Fluid typography через `clamp()`
- Скрытие nav-ссылок на mobile (`hidden md:flex`)
- Адаптация сеток: `grid-cols-2 → grid-cols-4`

## 10. Управление состоянием

Zustand store (`useStore`):
- `brandMode`: 'creative' | 'engineering' — режим бренда
- `activeCategory`: категория фильтра проектов
- `isMenuOpen`: состояние мобильного меню

## 11. Зависимости

Полный список в `package.json`. Все зависимости обоснованы требованиями задачи.

## 12. Рабочий процесс

1. `node setup.js` — генерация frontend/ и backend/, всех файлов, установка зависимостей, запуск dev-сервера
2. Или: двойной клик на `create_dirs.bat`
3. `cd frontend && npm run dev` — ручной запуск dev-сервера (порт 3000)
4. `cd frontend && npm run build` — продакшн-сборка
5. `cd frontend && npm run preview` — предпросмотр сборки

## 13. Чеклист QA / Полировки

- [ ] Все секции визуально соответствуют эталонному качеству
- [ ] Типографика: иерархия, контраст, ритм
- [ ] Анимации: плавность, timing, easing
- [ ] Responsive: mobile, tablet, desktop
- [ ] Hover states: все интерактивные элементы
- [ ] Grain overlay: видимость и производительность
- [ ] Прокрутка: плавность Lenis
- [ ] Accessibility: aria-labels, keyboard nav, focus states
- [ ] Performance: Lighthouse audit
- [ ] Кросс-браузерность: Chrome, Firefox, Safari

## 14. Журнал изменений

| Дата | Изменение |
|------|-----------|
| Текущая | Начальная генерация проекта: полная структура, все компоненты, дизайн-система, конфигурация |
| [2026-03-17] | Добавлена кнопка "Цены" (с выпадающим списком) в Header вместо "Стартапы". Создана страница `/pricing` (Купить) в стиле UXI с разделением экрана: слева текст и свитчер тарифов (Профессионалам, Предпринимателям, Индивидуальный), справа единая динамическая карточка тарифа. |
| 2026-03-17 | Замена верхнего текста Hero на liquid-glass инпут поиска (`PromptInput`), редизайн `LogoToggle` & навигации Header с liquid-glass styling, добавлена кнопка "Создать сайт", обновлены лейблы свитча. |
| 2026-03-17 (Auth) | Добавлен новый роут `/auth` (страница авторизации) с дизайном сплит-экрана. Внедрён левый блок входа `AuthForm` (Яндекс, Email, glassmorphism) и правый блок `AuthInfographic` (анимированные демо-карточки процессов "Собери", "Код", "Аналитика" с использованием Framer Motion). |
