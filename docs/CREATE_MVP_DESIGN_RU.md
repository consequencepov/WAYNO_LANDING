# WAYNO /create — дизайн-концепция и MVP-spec конструктора сайтов

> Статус: рабочая дизайн-документация для MVP  
> Язык: русский  
> Область: продуктовый shell, UX, visual system, motion, IA, приоритеты реализации  
> Ограничение текущего этапа: только документация, без реализации

---

## 1. Цель документа

Этот документ фиксирует, каким должен быть новый поддомен `/create` как полноценный конструктор сайтов внутри WAYNO.

Цель не в том, чтобы сделать еще один «редактор блоков». Цель в том, чтобы собрать сильный, светлый, премиальный интерфейс, который:

- быстро приводит пользователя от идеи к опубликованному сайту;
- выглядит как серьезный продуктовый инструмент, а не шаблонный SaaS-dashboard;
- держит баланс между простотой для новичка и достаточной глубиной для уверенного пользователя;
- визуально соответствует бренду WAYNO: технологичность, скорость, коммерческая применимость, премиальная подача.

---

## 2. Вывод по приложенному референсу

Приложенный интерфейс в целом задает правильную базовую рамку:

- слева плотная рабочая панель с инструментами;
- по центру большая область превью;
- снизу отдельная зона под таймлайн, консоль, логи или контекстные действия;
- верхняя часть остается под глобальные действия.

Это хорошая продуктовая схема, потому что она сразу делит систему на четыре понятные зоны:

1. навигация и инструменты;
2. рабочее полотно;
3. глобальные действия;
4. вспомогательная нижняя зона.

Но сам визуальный язык референса нам подходит только частично.

### Что в нем сильное

- Высокая плотность интерфейса без ощущения хаоса.
- Центральное превью доминирует над служебными зонами.
- Левая панель воспринимается как «режимы работы», а не как случайный набор кнопок.
- Нижняя область читается как вторичный, но полезный рабочий слой.

### Что не стоит переносить напрямую

- Слишком утилитарное ощущение обычного редактора без брендового характера.
- Серо-белая поверхность без достаточной иерархии глубины.
- Акценты интерфейса выглядят инструментально, но не премиально.
- Визуальная система больше похожа на AI-tool для обработки контента, чем на конструктор сайтов высокого уровня.

### Итоговая оценка

Как structural reference макет удачный. Как visual reference его надо переработать.

Для WAYNO `/create` нужно сохранить каркас:

- left panel;
- center canvas;
- bottom console;
- top toolbar.

Но сам визуальный язык должен стать другим: светлый editorial-tool interface, с белым фоном, бумажной глубиной, точной типографикой и очень аккуратной системой разделителей, теней и состояний.

---

## 3. Дизайн-направление

Документ опирается на два skill-направления:

- `frontend-design`: интерфейс должен иметь четкий характер и избегать шаблонной SaaS-эстетики;
- `design`: нужен не только UI, но и interaction story, motion spec, система токенов и продуманный shell продукта.

### Рекомендуемое направление

**Editorial Precision + Tool Clarity**

Это означает:

- светлая основа, но не «пустой белый холст»;
- ощущение paper-like surface, а не просто `#ffffff` на весь экран;
- продуктовая строгость, как у профессионального инструмента;
- крупные акценты и заголовки только там, где это усиливает сценарий;
- низкий визуальный шум в рабочей зоне;
- акцент не на декоративность, а на уверенную, дорогую читаемость.

### Ассоциации, к которым надо стремиться

- Framer по чистоте и ясности editing flow;
- Figma по системности shell-интерфейса;
- Tilda по скорости входа в создание страницы;
- премиальная editorial подача вместо стандартного dashboard UI.

### Ассоциации, которых надо избегать

- generic AI SaaS;
- dark cyberpunk tool;
- glassmorphism ради glassmorphism;
- перегруженный enterprise admin panel;
- фиолетовые градиенты на белом фоне.

---

## 4. Продуктовая идея `/create`

`/create` должен восприниматься как место, где пользователь не «настраивает сайт», а **собирает и запускает цифровой продукт**.

Основной promise MVP:

> Ввести идею, собрать структуру, отредактировать контент, проверить mobile и опубликовать сайт на поддомене WAYNO за один короткий рабочий цикл.

### Главный сценарий MVP

1. Пользователь попадает в `/create`.
2. Выбирает шаблон, старт из пустого проекта или генерацию по prompt.
3. Видит готовый shell редактора.
4. Добавляет и переставляет секции.
5. Меняет тексты, изображения, кнопки, базовые стили.
6. Проверяет desktop, tablet, mobile.
7. Открывает нижнюю консоль для AI-операций, истории или предупреждений.
8. Публикует сайт на поддомен.

### Что пользователь должен чувствовать

- «Я понимаю, где что находится»;
- «Мне не нужно знать CSS, чтобы собирать красивую страницу»;
- «Редактор не мешает, а ведет меня»;
- «Даже базовый результат уже выглядит качественно».

---

## 5. Interaction Story

Ниже базовая история взаимодействия, которую должен поддерживать дизайн shell-интерфейса.

### 5.1. Вход

Пользователь заходит в `/create` и сразу видит чистый, светлый интерфейс с явным центром тяжести в превью.

Левая панель объясняет режимы работы:

- Insert;
- Pages;
- Layers;
- Assets;
- AI.

Центр показывает страницу, а не абстрактный canvas без контекста. Пользователь должен сразу ощущать, что он редактирует реальный сайт.

### 5.2. Выбор объекта

При клике по секции или элементу интерфейс не должен «прыгать». Он должен мягко подтверждать контекст:

- outline вокруг выбранного блока;
- контекстный floating toolbar возле выделения;
- правая зона или contextual panel показывает точные настройки выбранного объекта;
- нижняя консоль может переключаться на подсказки, AI-actions или историю изменений.

### 5.3. Редактирование

Редактирование должно идти по принципу progressive disclosure:

- сначала простые и очевидные настройки;
- затем advanced controls;
- затем экспертные режимы, но не в первом слое.

### 5.4. Публикация

Публикация должна ощущаться как кульминация рабочего цикла:

- понятный статус draft/published;
- видимый URL будущего поддомена;
- preview перед publish;
- после публикации интерфейс дает чувство завершенности, а не просто закрывает modal.

---

## 6. MVP-архитектура интерфейса

Базовый shell должен быть постоянным продуктовым каркасом.

### 6.1. Верхний toolbar

Назначение: глобальные действия и статус проекта.

Содержимое:

- логотип WAYNO Create;
- название проекта;
- статус сохранения: `Saved`, `Saving`, `Draft`;
- undo / redo;
- переключатель breakpoint: Desktop / Tablet / Mobile;
- Preview;
- Publish;
- кнопка `Cmd+K` command bar;
- меню проекта.

Принцип:

- toolbar не должен быть высоким;
- он должен ощущаться как тонкая control rail;
- не дублировать то, что уже есть в инспекторе или внизу.

### 6.2. Левая панель

Назначение: навигация и режимы работы.

Режимы MVP:

1. `Insert`  
   Библиотека секций и блоков.

2. `Pages`  
   Список страниц сайта, slug, создание новой страницы.

3. `Layers`  
   Дерево текущей страницы: header, секции, вложенные элементы.

4. `Assets`  
   Загруженные изображения, иконки, будущие медиа.

5. `AI`  
   Prompt recipes: сгенерировать секцию, переписать текст, предложить структуру.

Принцип:

- левая колонка делится на узкий rail с иконками и широкую content-area;
- rail остается стабильным, content-area меняется по режиму;
- ширина панели должна быть достаточно комфортной для карточек секций и layers tree;
- в light theme панель должна отделяться не темным фоном, а тонким слоем elevation.

### 6.3. Центральный canvas / preview

Назначение: основная рабочая поверхность.

Что обязательно должно быть в MVP:

- превью реальной страницы;
- рамка device viewport;
- масштабирование `Fit / 50% / 75% / 100%`;
- выбор блока по клику;
- hover-подсветка секции;
- drag reorder для секций как минимум в layers и желательно на самом canvas;
- пустые состояния для новой страницы.

Принцип:

- canvas не должен быть «серым рабочим полем разработчика»;
- он должен ощущаться как студийный стол или чистая презентационная поверхность;
- фон canvas area можно сделать теплым off-white или очень светлым neutral, чтобы сам сайт внутри белой рамки не терялся.

### 6.4. Правая инспекторная панель

Несмотря на то, что пользователь в сообщении акцентировал левую панель, полноценный конструктор без правого инспектора быстро упрется в потолок. Для MVP он обязателен.

Назначение: контекстные настройки.

Контексты:

- ничего не выбрано: project/page quick settings;
- выбрана страница: SEO, slug, social preview, page background;
- выбрана секция: layout, padding, background, visibility;
- выбран текст: content, font, size, line-height, weight, color, align;
- выбрана кнопка: label, URL, variant, radius, padding.

Принцип:

- инспектор должен быть спокойным и модульным;
- controls объединяются в группировки с понятными заголовками;
- не больше одного визуального акцента на экран одновременно;
- advanced controls должны быть collapse-based.

### 6.5. Нижняя зона

Назначение: secondary workflow, который не должен мешать основному редактированию.

Табы MVP:

- `Prompt`;
- `History`;
- `Activity`;
- `Warnings`.

Варианты использования:

- Prompt: AI-команды и история prompt-driven действий;
- History: undo stack, named snapshots later;
- Activity: autosave, publish log, asset upload status;
- Warnings: missing image, empty button link, mobile overflow, SEO warnings.

Принцип:

- нижняя панель по умолчанию свернута до компактной полосы;
- раскрывается по действию или событию;
- не должна постоянно съедать рабочую высоту canvas;
- в light theme отделяется тонкой верхней границей и мягкой тенью.

---

## 7. Visual System

### 7.1. Общий характер

Светлый интерфейс должен быть не sterile-white, а layered-white.

Нужны четыре уровня поверхности:

1. app background;
2. panel surface;
3. elevated card surface;
4. canvas surface.

### 7.2. Цветовая система MVP

Ниже рабочий набор токенов для светлого режима.

#### Base tokens

- `bg-app`: `#F5F4F1`
- `bg-panel`: `#FBFAF7`
- `bg-elevated`: `#FFFFFF`
- `bg-canvas`: `#F1EFE9`
- `bg-selected`: `#EEF4FF`

#### Text tokens

- `text-primary`: `#161616`
- `text-secondary`: `#5E5A54`
- `text-muted`: `#8A847C`
- `text-inverse`: `#FFFFFF`

#### Border tokens

- `border-subtle`: `#E7E2D9`
- `border-default`: `#D8D2C8`
- `border-strong`: `#B9B1A4`

#### Brand / action tokens

- `accent-primary`: `#171717`
- `accent-soft`: `#F0EBE2`
- `accent-editor`: `#2563EB`
- `accent-success`: `#197A52`
- `accent-warning`: `#B46A18`
- `accent-danger`: `#AF3434`

### 7.3. Почему не просто белый

Если все поверхности будут одинаково белыми, интерфейс потеряет иерархию:

- панель сольется с canvas;
- плавающие панели потеряют читаемость;
- выделение перестанет ощущаться точно;
- сайт внутри превью будет трудно отделить от оболочки.

Поэтому основной принцип такой:

- белый остается главным впечатлением;
- но разделение достигается за счет температуры, границ, теней и плотности контента.

### 7.4. Тени

Тени должны быть короткими и сухими.

Рекомендуемые уровни:

- `shadow-1`: легкая тень для floating toolbar;
- `shadow-2`: тень для dropdown и modal;
- `shadow-3`: редкая, только для ключевых overlay-состояний.

Нельзя использовать:

- длинные blur-heavy тени;
- стеклянные neon-эффекты;
- большие размазанные тени как в дешевых dashboard UI.

---

## 8. Типографика

Согласно skill по frontend-design, нельзя уходить в безликие стеки. Для `/create` нужна отличимая, но рабочая пара шрифтов.

### Рекомендуемая роль шрифтов

- Display / brand accent: выразительный, но строгий serif или characterful grotesk;
- UI / controls / inspector: спокойный, высокочитаемый grotesk.

### Принцип выбора

- интерфейсный шрифт должен хорошо работать в плотных списках, таблицах слоев и полях форм;
- display-шрифт нужен точечно: onboarding, empty states, publish moments, hero-state самого конструктора;
- в рабочей части редактора нельзя злоупотреблять декоративной типографикой.

### Предлагаемая иерархия

- App title: 18–20px / medium;
- Panel title: 14–16px / semibold;
- Body: 13–14px / regular;
- Meta labels: 11–12px / medium / uppercase optional;
- Numeric / dimension controls: моноширинный или tabular-friendly набор.

---

## 9. Сетка и spacing

### Shell layout

- top toolbar: 56px;
- left rail: 64px;
- left content panel: 280–320px;
- right inspector: 320–360px;
- bottom console collapsed: 40–48px;
- bottom console expanded: 220–280px;
- outer page padding: 16px;
- internal panel padding: 16px;
- compact control gap: 8px;
- standard stack gap: 12px;
- section gap inside inspector: 20px.

### Grid principle

Внутри панелей интерфейс должен быть собран как строгая модульная сетка, а не как последовательность случайных карточек.

Правило:

- один panel section = один визуальный модуль;
- внутри модуля единая вертикальная логика;
- один тип control spacing на весь shell.

---

## 10. Компоненты MVP

### 10.1. Левый rail

Нужны:

- иконка режима;
- label при hover или рядом в expanded state;
- active-indicator;
- горячие клавиши.

### 10.2. Section cards

Нужны:

- thumbnail;
- название секции;
- краткий sublabel;
- признак recommended/new later;
- drag-to-insert или click-to-add.

### 10.3. Layers tree

Нужны:

- nesting;
- collapse;
- eye toggle;
- lock later, можно после MVP;
- drag reorder;
- понятные selected/hover состояния.

### 10.4. Floating selection toolbar

Нужны быстрые действия:

- duplicate;
- move up/down;
- hide;
- delete;
- maybe `Ask AI`.

### 10.5. Inspector controls

Базовый набор:

- segmented controls;
- text inputs;
- token pickers;
- sliders;
- numeric stepper;
- select dropdown;
- toggle switches;
- collapsible groups.

### 10.6. Bottom console tabs

Каждый таб должен иметь:

- empty state;
- active state;
- event count badge;
- quick clear / filter action там, где нужно.

---

## 11. Motion Spec

Motion в `/create` должен быть функциональным, не декоративным.

### Основные принципы

- animate only transform and opacity;
- без тяжелых layout animations на больших областях;
- все состояния должны уважать `prefers-reduced-motion`;
- motion нужен для подтверждения действия и пространственной логики.

### Ключевые анимации MVP

1. **Panel switch**  
   Trigger: смена режима в левой панели  
   Motion: 160–220ms fade + slight translate  
   Purpose: показать смену контекста.

2. **Selection state**  
   Trigger: выбор секции/элемента  
   Motion: 120–160ms outline + toolbar fade-in  
   Purpose: подтвердить фокус.

3. **Bottom console expand/collapse**  
   Trigger: открытие панели снизу  
   Motion: 180–240ms translateY + opacity  
   Purpose: дать ощущение дополнительного слоя, а не modal takeover.

4. **Insert section**  
   Trigger: добавление нового блока  
   Motion: 220–280ms highlight flash + settle  
   Purpose: показать, куда именно вставился блок.

5. **Autosave confirmation**  
   Trigger: успешное сохранение  
   Motion: discreet status transition in toolbar  
   Purpose: не отвлекать, но подтверждать надежность.

### Easing

Рекомендуемый набор:

- standard: `cubic-bezier(0.2, 0.8, 0.2, 1)`;
- enter: `cubic-bezier(0.16, 1, 0.3, 1)`;
- exit: `cubic-bezier(0.4, 0, 1, 1)`.

### Reduced motion

В reduced mode:

- убрать sliding-heavy transitions;
- оставить только opacity и instant state confirmation;
- убрать animated zoom flourishes и decorative stagger.

---

## 12. MVP-состояния интерфейса

Документ должен учитывать не только happy path, но и рабочие состояния.

### 12.1. Empty states

- новый сайт без секций;
- новая страница;
- пустой assets library;
- пустая history;
- пустой AI-thread.

Каждое пустое состояние должно не просто сообщать об отсутствии данных, а предлагать первое действие.

### 12.2. Loading states

- генерация сайта AI;
- загрузка изображений;
- publish process;
- autosave.

Loading не должен использовать generic spinner в одиночку. Лучше сочетание:

- статус-текст;
- progress bar там, где есть шаги;
- skeleton для panel content.

### 12.3. Error states

- не удалось сохранить;
- publish failed;
- asset upload failed;
- AI returned invalid structure;
- section render issue.

Ошибка должна быть:

- локализованной;
- понятной;
- с next action: retry, revert, inspect.

### 12.4. Warning states

Нижняя панель `Warnings` нужна, чтобы аккуратно подсвечивать:

- пустые CTA;
- missing alt text;
- длинные заголовки, которые ломают mobile;
- слишком тяжелые изображения;
- незаполненные SEO title/description.

---

## 13. Responsive-модель для самого редактора

Важно разделять два уровня responsive:

1. responsive shell самого редактора;
2. responsive preview редактируемого сайта.

### Для shell

На desktop:

- полный layout: left panel + canvas + right inspector + bottom console.

На laptop / small desktop:

- правая панель может становиться overlay-drawer;
- нижняя консоль остается collapse-first.

На tablet:

- shell не обязан быть полноценно mobile-authoring friendly в MVP;
- допускается ограниченный режим просмотра или редактирования.

На mobile:

- полноценный editing shell не является обязательным в MVP;
- можно предусмотреть gate screen: открыть на desktop для полного редактирования.

### Для preview

В MVP обязательны три режима:

- Desktop;
- Tablet;
- Mobile.

Модель правок:

- desktop styles = базовые;
- tablet/mobile overrides = ограниченные, но понятные;
- visibility per breakpoint обязательна.

---

## 14. Контентная модель секций

Для дизайна MVP важно сразу зафиксировать, что редактор строится не вокруг произвольного DOM, а вокруг controlled section system.

### Стартовая библиотека секций

- Hero;
- Feature grid;
- CTA;
- Testimonials;
- Pricing;
- FAQ;
- Footer;
- Header;
- Stats;
- Logo wall;
- Contact form;
- Gallery.

### Для каждой секции нужно определить

- 2–5 curated variants;
- preview thumbnail;
- editable fields schema;
- allowed layout controls;
- allowed style slots;
- breakpoint behavior;
- empty/fallback content.

### Дизайн-следствие

Если секции хорошо собраны и красивы по умолчанию, инспектор можно держать компактным. Если секции слабые, интерфейс придется компенсировать избытком ручных настроек. Для MVP нужно выбрать первое.

---

## 15. AI в дизайне shell-интерфейса

AI не должен быть визуально доминирующим центром продукта. Он должен быть сильным помощником внутри редактора.

### Роли AI в MVP

1. Сгенерировать стартовый сайт по prompt.
2. Предложить новую секцию в текущую страницу.
3. Переписать copy.
4. Предложить SEO title/meta.
5. Объяснить предупреждение или предложить исправление.

### UI-принцип

- AI живет в отдельном режиме слева и в нижней console-thread;
- AI не должен захватывать весь интерфейс тяжелым chat-like экраном;
- все AI-действия должны иметь видимый результат в canvas или history;
- каждое AI-действие должно быть откатываемым.

---

## 16. Что входит в дизайн MVP

Ниже фиксируется обязательный дизайн-объем, без которого нельзя считать `/create` цельным продуктом.

### Обязательный scope

- shell layout редактора;
- верхний toolbar;
- левая панель с 5 режимами;
- центральный preview canvas;
- правая инспекторная панель;
- нижняя консоль с 4 табами;
- device switcher;
- selection states;
- section insert flow;
- page management UI;
- publish flow UI;
- empty/loading/error/warning states;
- light design token system;
- базовая motion-system спецификация.

### Допустимо отложить после MVP

- real-time collaboration;
- comments;
- advanced animation timeline;
- component variants with deep inheritance;
- custom code blocks;
- CMS collections;
- Figma import.

---

## 17. Что не должно попасть в MVP-дизайн

- сложный pseudo-3D canvas ради вау-эффекта;
- свободное pixel-perfect проектирование уровня Figma;
- перегруженная правая панель с десятками полей с первого экрана;
- dark mode как обязательный режим на старте;
- тяжелые декоративные анимации shell-интерфейса;
- большой chat-first AI layout, который съедает canvas.

---

## 18. Детальный план проектирования MVP

Ниже пошаговый план того, что нужно продумать и задокументировать для полноценного дизайна.

### Phase 0. Product framing

Нужно зафиксировать:

- кто основной пользователь MVP: агентства, фрилансеры, стартапы;
- какой сценарий считается главным;
- где компромисс между скоростью и свободой;
- какие блоки и controls попадают в первую версию.

Результат фазы:

- финальный design brief `/create`;
- утвержденная mental model: site → page → section → element.

### Phase 1. Shell IA

Нужно спроектировать:

- верхний toolbar;
- left rail и режимы;
- left content panel;
- canvas area;
- right inspector;
- bottom console.

Результат фазы:

- wireframe shell;
- сценарии навигации между режимами;
- карта состояний интерфейса.

### Phase 2. Visual language

Нужно определить:

- цветовые токены;
- типографику;
- radius system;
- border rules;
- surface hierarchy;
- icon style;
- empty-state art direction.

Результат фазы:

- UI kit light theme;
- токены для CSS/Tailwind;
- правила применения визуальных акцентов.

### Phase 3. Core interaction patterns

Нужно продумать:

- selection;
- hover;
- reorder;
- insert;
- inline edit;
- inspector edits;
- console open/close;
- publish confirmation.

Результат фазы:

- interaction map;
- motion rules;
- список edge cases.

### Phase 4. Section system UI

Нужно описать:

- library cards;
- block categories;
- variant switcher;
- schema-driven controls;
- section placeholder and loading states.

Результат фазы:

- section library design;
- block metadata requirements;
- content editing patterns.

### Phase 5. Publish and QA surfaces

Нужно продумать:

- pre-publish checks;
- domain / subdomain UI;
- draft/published states;
- SEO warnings;
- success-state after publish.

Результат фазы:

- publish modal/drawer spec;
- warnings taxonomy;
- trust markers inside shell.

---

## 19. Acceptance criteria для дизайн-MVP

Дизайн можно считать состоявшимся, если выполняются все условия:

1. Пользователь без знания CSS понимает, как добавить секцию, изменить текст и опубликовать страницу.
2. Интерфейс визуально ощущается как premium light tool, а не generic admin panel.
3. Центральный canvas доминирует над вспомогательными зонами.
4. Любое выбранное состояние однозначно читается.
5. Нижняя консоль полезна, но не мешает основному сценарию.
6. AI встроен как вспомогательный слой, а не как единственный режим продукта.
7. Даже пустой проект выглядит аккуратно и направляет пользователя к действию.
8. Светлая тема сохраняет глубину, иерархию и ощущение точности.

---

## 20. Решение на текущем этапе

Для MVP рекомендуется следующий дизайн-вектор:

- **shell:** left tools + center preview + right inspector + bottom console;
- **theme:** светлая, paper-like, editorial-tool эстетика;
- **interaction:** спокойная, точная, без декоративного шума;
- **product logic:** скорость сборки и публикации выше, чем абсолютная свобода редактирования;
- **AI role:** встроенный помощник, а не главная форма продукта.

Если формулировать очень коротко:

> `/create` должен быть похож не на «панель настроек сайта», а на светлую студию запуска цифрового продукта.`

---

## 21. Следующие документы, которые понадобятся после этого spec

После утверждения этой концепции логично подготовить:

1. подробную IA-схему экранов `/create`;
2. block schema spec по библиотеке секций;
3. theme token spec для реализации в CSS/Tailwind;
4. inspector controls spec;
5. publish flow spec;
6. AI guardrails spec для prompt-to-layout генерации.