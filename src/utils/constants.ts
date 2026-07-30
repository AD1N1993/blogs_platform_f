export const IS_PRODUCTION = import.meta.env.PROD;

export const APP_CONFIG = {
    apiUrl: import.meta.env.VITE_API_URL ?? '/api',
    contextRoot: import.meta.env.VITE_CONTEXT_ROOT ?? '/',
    useMock: import.meta.env.VITE_USE_MOCK === 'enabled',
} as const;

export const APPLICATION_ROUTES = {
    root: '/',
    posts: '/posts',
    post: '/posts/:postId',
    notFound: '*',
} as const;

export const QUERY_KEYS = {
    posts: ['posts'] as const,
    post: (postId: string) => ['posts', postId] as const,
};

export const DEFAULT_PAGE_SIZE = 2;
