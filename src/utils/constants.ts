export const IS_PRODUCTION = import.meta.env.PROD;

export const APP_CONFIG = {
    /**
     * The backend serves resources at the root (/blogs, /posts) and uses /api for Swagger UI,
     * so requests go through a dedicated dev-server prefix that is stripped by the proxy.
     */
    apiUrl: import.meta.env.VITE_API_URL ?? '/backend-api',
    contextRoot: import.meta.env.VITE_CONTEXT_ROOT ?? '/',
    useMock: import.meta.env.VITE_USE_MOCK === 'enabled',
    /**
     * The Users section has no login screen yet, so requests to /users authenticate with
     * fixed Basic Auth credentials matching the backend's ADMIN_USERNAME/ADMIN_PASSWORD.
     * Remove once real admin auth is wired up.
     */
    adminUsername: import.meta.env.VITE_ADMIN_USERNAME ?? 'admin',
    adminPassword: import.meta.env.VITE_ADMIN_PASSWORD ?? 'qwerty',
} as const;

export const APPLICATION_ROUTES = {
    root: '/',
    blogs: '/blogs',
    blog: '/blogs/:blogId',
    posts: '/posts',
    post: '/posts/:postId',
    users: '/users',
    signUp: '/sign-up',
    signIn: '/sign-in',
    emailConfirmation: '/email-confirmation',
    emailConfirmationExpired: '/email-confirmation/expired',
    notFound: '*',
} as const;

export const buildBlogRoute = (blogId: string) => `${APPLICATION_ROUTES.blogs}/${blogId}`;
export const buildPostRoute = (postId: string) => `${APPLICATION_ROUTES.posts}/${postId}`;

export const QUERY_KEYS = {
    blogs: ['blogs'] as const,
    blog: (blogId: string) => ['blogs', blogId] as const,
    posts: ['posts'] as const,
    post: (postId: string) => ['posts', postId] as const,
    blogPosts: (blogId: string) => ['blogs', blogId, 'posts'] as const,
    users: ['users'] as const,
    me: ['me'] as const,
    postComments: (postId: string) => ['posts', postId, 'comments'] as const,
};

/** The API caps pageSize at 20. */
export const DEFAULT_PAGE_SIZE = 5;
export const POSTS_PAGE_SIZE = 6;
export const USERS_PAGE_SIZE = 10;
/** UC-2: 15 latest comments, "Show more" reveals 15 more each time. */
export const COMMENTS_PAGE_SIZE = 15;
export const COMMENT_CONTENT_MIN_LENGTH = 20;
export const COMMENT_CONTENT_MAX_LENGTH = 300;
