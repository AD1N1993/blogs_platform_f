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

/**
 * The backend has no machine-readable error codes — every business failure comes back as
 * `{ errorsMessages: [{ field, message }] }` (see auth.service.ts). These are the message
 * fragments the auth screens need to tell those failures apart.
 */
export const AUTH_ERROR_MATCHERS = {
    codeExpired: { field: 'code', message: 'expired' },
    codeAlreadyConfirmed: { field: 'code', message: 'already confirmed' },
    emailNotUnique: { field: 'email', message: 'should be unique' },
    loginNotUnique: { field: 'login', message: 'should be unique' },
    emailAlreadyConfirmed: { field: 'email', message: 'already confirmed' },
    emailNotRegistered: { field: 'email', message: 'not registered' },
} as const;

/** UC-1 message texts, kept together so the wording stays consistent across screens. */
export const AUTH_MESSAGES = {
    emailSent: (email: string) => `We have sent a link to confirm your email to ${email}`,
    emailAlreadyRegistered: 'User with this email is already registered',
    loginAlreadyTaken: 'User with this username is already registered',
    signInFailed: 'The password or the email or Username are incorrect. Try again, please',
} as const;
