import type { Post } from '#/types/post';

export const POSTS_FIXTURE: Post[] = [
    {
        id: '1',
        title: 'Как мы собрали стартер на Vite',
        excerpt: 'Разбираем структуру проекта и договорённости команды.',
        content:
            'Стартер собран на Vite и React 19. Слои разделены по назначению: pages, components, services, store, hooks, types, utils.',
        author: { id: 'u1', name: 'Иван Петров' },
        tags: ['frontend', 'vite'],
        publishedAt: '2026-07-20T09:00:00.000Z',
    },
    {
        id: '2',
        title: 'CSS-модули против utility-first',
        excerpt: 'Почему в проекте выбраны CSS-модули и дизайн-токены.',
        content:
            'CSS-модули дают локальную область видимости без сборки утилитарных классов. Токены живут в src/index.css.',
        author: { id: 'u2', name: 'Мария Смирнова' },
        tags: ['css', 'архитектура'],
        publishedAt: '2026-07-24T12:30:00.000Z',
    },
    {
        id: '3',
        title: 'TanStack Query и Redux Toolkit вместе',
        excerpt: 'Серверное состояние отдельно от клиентского — и без дублирования.',
        content:
            'Запросы к API живут в TanStack Query, а UI-состояние (фильтры, уведомления) — в слайсах Redux Toolkit.',
        author: { id: 'u1', name: 'Иван Петров' },
        tags: ['state', 'react-query'],
        publishedAt: '2026-07-28T08:15:00.000Z',
    },
];
