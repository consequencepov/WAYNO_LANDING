# Roadmap: Supabase для заявок WAYNO

## 1. Подготовка проекта Supabase

- Создать проект в Supabase в регионе Europe.
- Включить Data API.
- Сохранить URL проекта и publishable key.
- Выполнить SQL из файла docs/supabase_leads.sql в SQL Editor.

## 2. Подключение фронтенда

- Установить пакет @supabase/supabase-js.
- Настроить переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY.
- Подключить единый browser client для insert-запросов без auth-сессии.

## 3. Единая модель заявки

- Использовать одну таблицу leads для двух сценариев:
  - классическая заявка: имя + телефон/email;
  - prompt-заявка: имя + телефон/email + prompt_text + URL/дизайн.
- Сохранять служебные данные: source, page_path, page_url, host, created_at.

## 4. Единый сервис отправки

- Вынести insert в общий модуль submitLead.
- Нормализовать строки и массивы перед записью.
- Для phone/email хранить отдельные поля, а не один общий contact.

## 5. Классическая форма

- Подключить CtaModal к Supabase.
- Добавить loading-состояние и обработку ошибок.
- Использовать её как основную форму на главной, мобильной версии и SEO-страницах.

## 6. Prompt-сценарий

- После ввода prompt и нажатия на кнопку отправки открывать ту же классическую форму.
- Передавать в неё draft: prompt_text, attached_urls, selected_design и имена файлов.
- После успешной отправки очищать prompt и временные данные.

## 7. Мобильный сценарий

- Свести mobile prompt flow к той же модели: prompt -> CtaModal -> submitLead.
- Убрать расхождение между мобильной и десктопной воронкой.

## 8. SEO-лендинги и подстраницы

- Использовать тот же CtaModal на страницах ai-konstruktor-saytov и остальных SEO-страницах.
- Сохранять текущий route и host, чтобы видеть источник заявки в базе.

## 9. Проверка

- Установить зависимости.
- Проверить TypeScript и production build.
- Убедиться, что отправка работает с anon RLS policy.