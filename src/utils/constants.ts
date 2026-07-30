export const IS_PRODUCTION = import.meta.env.PROD;

export const APP_CONFIG = {
    /**
     * The backend serves resources at the root (/blogs, /posts) and uses /api for Swagger UI,
     * so requests go through a dedicated dev-server prefix that is stripped by the proxy.
     */
    apiUrl: import.meta.env.VITE_API_URL ?? '/backend-api',
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

/** The API caps pageSize at 20. */
export const DEFAULT_PAGE_SIZE = 5;
export const POSTS_PAGE_SIZE = 6;
