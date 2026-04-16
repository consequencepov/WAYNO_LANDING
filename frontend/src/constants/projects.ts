import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  { id: '1', number: '01', title: 'Сборка клиентского сайта', category: 'agency', description: 'Референс → структура → запуск', color: '#2A1F3D' },
  { id: '2', number: '02', title: 'Быстрый продакшн', category: 'design', description: 'Сильная основа за минуты', color: '#1F2A3D' },
  { id: '3', number: '03', title: 'Проверка гипотезы', category: 'startup', description: 'Лендинг для гипотезы за один цикл', color: '#3D2A1F' },
  { id: '4', number: '04', title: 'Сайт для проверки гипотез', category: 'startup', description: 'Сбор заявок, аналитика', color: '#1F3D2A' },
  { id: '5', number: '05', title: 'Основа без пустого листа', category: 'agency', description: 'Полный контроль', color: '#3D1F2A' },
  { id: '6', number: '06', title: 'Редизайн лендинга', category: 'design', description: 'Ускорение сборки', color: '#2A3D1F' },
  { id: '7', number: '07', title: 'MVP-запуск', category: 'startup', description: 'Публичная среда для фаундеров', color: '#1F2A2A' },
  { id: '8', number: '08', title: 'Кастомный hero-блок', category: 'design', description: 'Референсный старт', color: '#2A1F2A' },
  { id: '9', number: '09', title: 'Структура по брифу', category: 'agency', description: 'Доведение до запуска', color: '#2A2A1F' },
  { id: '10', number: '10', title: 'Кабинет аналитики', category: 'startup', description: 'Выжимка от ИИ', color: '#1F1F2A' },
  { id: '11', number: '11', title: 'Исходники в ZIP', category: 'design', description: 'Экспорт + интеграция', color: '#2A1F1F' },
  { id: '12', number: '12', title: 'Сайт по URL', category: 'agency', description: 'Реконструкция подачи', color: '#1F2A1F' },
]

export const PROJECT_CATEGORIES = ['agency', 'design', 'startup'] as const
