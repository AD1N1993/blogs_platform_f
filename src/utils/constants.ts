export const IS_PRODUCTION = import.meta.env.PROD;

export const APP_CONFIG = {
    apiUrl: import.meta.env.VITE_API_URL ?? '/api',
    contextRoot: import.meta.env.VITE_CONTEXT_ROOT ?? '/',
    useMock: import.meta.env.VITE_USE_MOCK === 'enabled',
} as const;

export const APPLICATION_ROUTES = {
    root: '/',
    blogs: '/blogs',
    posts: '/posts',
    notFound: '*',
} as const;

export const QUERY_KEYS = {
    blogs: ['blogs'] as const,
    posts: ['posts'] as const,
};

export const DEFAULT_PAGE_SIZE = 5;
export const POSTS_PAGE_SIZE = 6;
