import { HttpResponse, http } from 'msw';

import type { ConfirmEmailInput, LoginInput, ResendEmailInput, SignUpInput } from '#/types/auth';
import type { Blog } from '#/types/blog';
import type { CommentInput } from '#/types/comment';
import type { Post } from '#/types/post';
import { APP_CONFIG, DEFAULT_PAGE_SIZE } from '#/utils/constants';

import { pendingRegistrationsStore } from './fixtures/auth';
import { BLOGS_FIXTURE } from './fixtures/blogs';
import { commentsStore, type MockComment } from './fixtures/comments';
import { POSTS_FIXTURE } from './fixtures/posts';

const MOCK_TOKEN_PREFIX = 'mock-token-';

const readBearerLogin = (request: Request): string | null => {
    const header = request.headers.get('authorization');
    if (!header?.startsWith('Bearer ')) return null;

    const token = header.slice('Bearer '.length);

    return token.startsWith(MOCK_TOKEN_PREFIX) ? token.slice(MOCK_TOKEN_PREFIX.length) : null;
};

const apiPath = (path: string) => `${APP_CONFIG.apiUrl}${path}`;

type SortableKey<T> = Extract<keyof T, string>;

/** Mirrors the backend: unknown sortBy values fall back to createdAt. */
const sortItems = <T extends Blog | Post>(
    items: T[],
    sortBy: string,
    sortDirection: string,
    allowedFields: SortableKey<T>[],
): T[] => {
    const field = (allowedFields as string[]).includes(sortBy)
        ? (sortBy as SortableKey<T>)
        : ('createdAt' as SortableKey<T>);
    const direction = sortDirection === 'asc' ? 1 : -1;

    return [...items].sort((a, b) => String(a[field]).localeCompare(String(b[field])) * direction);
};

const buildPaginator = <T>(items: T[], pageNumber: number, pageSize: number) => ({
    pagesCount: Math.ceil(items.length / pageSize),
    page: pageNumber,
    pageSize,
    totalCount: items.length,
    items: items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
});

const readQuery = (request: Request) => {
    const params = new URL(request.url).searchParams;

    return {
        searchNameTerm: (params.get('searchNameTerm') ?? '').trim().toLowerCase(),
        sortBy: params.get('sortBy') ?? 'createdAt',
        sortDirection: params.get('sortDirection') ?? 'desc',
        pageNumber: Number(params.get('pageNumber') ?? 1),
        pageSize: Number(params.get('pageSize') ?? DEFAULT_PAGE_SIZE),
    };
};

export const handlers = [
    http.get(apiPath('/blogs'), ({ request }) => {
        const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } = readQuery(request);

        const filtered = BLOGS_FIXTURE.filter(
            (blog) => !searchNameTerm || blog.name.toLowerCase().includes(searchNameTerm),
        );
        const sorted = sortItems(filtered, sortBy, sortDirection, [
            'name',
            'description',
            'websiteUrl',
            'createdAt',
        ]);

        return HttpResponse.json(buildPaginator(sorted, pageNumber, pageSize));
    }),

    // The API offers no search for posts — only pagination and sorting
    http.get(apiPath('/posts'), ({ request }) => {
        const { sortBy, sortDirection, pageNumber, pageSize } = readQuery(request);

        const sorted = sortItems(POSTS_FIXTURE, sortBy, sortDirection, [
            'title',
            'shortDescription',
            'content',
            'blogName',
            'createdAt',
        ]);

        return HttpResponse.json(buildPaginator(sorted, pageNumber, pageSize));
    }),

    http.get(apiPath('/posts/:postId'), ({ params }) => {
        const post = POSTS_FIXTURE.find((item) => item.id === params.postId);

        return post ? HttpResponse.json(post) : new HttpResponse(null, { status: 404 });
    }),

    http.get(apiPath('/blogs/:blogId'), ({ params }) => {
        const blog = BLOGS_FIXTURE.find((item) => item.id === params.blogId);

        return blog ? HttpResponse.json(blog) : new HttpResponse(null, { status: 404 });
    }),

    http.get(apiPath('/blogs/:blogId/posts'), ({ params, request }) => {
        const { sortBy, sortDirection, pageNumber, pageSize } = readQuery(request);

        if (!BLOGS_FIXTURE.some((blog) => blog.id === params.blogId)) {
            return new HttpResponse(null, { status: 404 });
        }

        const blogPosts = POSTS_FIXTURE.filter((post) => post.blogId === params.blogId);
        const sorted = sortItems(blogPosts, sortBy, sortDirection, [
            'title',
            'shortDescription',
            'content',
            'blogName',
            'createdAt',
        ]);

        return HttpResponse.json(buildPaginator(sorted, pageNumber, pageSize));
    }),

    // The backend has no registration flow yet — these three stand in for it until it ships.
    http.post(apiPath('/auth/registration'), async ({ request }) => {
        const { login, email, password } = (await request.json()) as SignUpInput;

        if (pendingRegistrationsStore.findByEmail(email)) {
            return HttpResponse.json(
                { errorsMessages: [{ field: 'email', message: 'Email already registered' }] },
                { status: 400 },
            );
        }

        pendingRegistrationsStore.add({
            login,
            email,
            password,
            // Lets the expired-link screen be demoed on demand, without waiting out a real TTL.
            confirmationCode: `valid-${email}`,
            isExpired: email.includes('expired'),
            isConfirmed: false,
        });

        return new HttpResponse(null, { status: 204 });
    }),

    http.post(apiPath('/auth/registration-confirmation'), async ({ request }) => {
        const { code } = (await request.json()) as ConfirmEmailInput;

        const registration = pendingRegistrationsStore.findByConfirmationCode(code);

        if (!registration) {
            return HttpResponse.json(
                { errorsMessages: [{ field: 'code', message: 'Confirmation code is incorrect' }] },
                { status: 400 },
            );
        }

        if (registration.isExpired) {
            return HttpResponse.json(
                {
                    errorCode: 'CODE_EXPIRED',
                    errorsMessages: [{ field: 'code', message: 'Confirmation code has expired' }],
                },
                { status: 400 },
            );
        }

        // Confirming an already-confirmed code is a no-op success, not an error — React 19
        // StrictMode double-invokes effects in dev, so this request can legitimately arrive twice.
        if (!registration.isConfirmed) {
            pendingRegistrationsStore.update(registration.email, { isConfirmed: true });
        }

        return new HttpResponse(null, { status: 204 });
    }),

    http.post(apiPath('/auth/registration-email-resending'), async ({ request }) => {
        const { email } = (await request.json()) as ResendEmailInput;

        const registration = pendingRegistrationsStore.findByEmail(email);

        if (!registration || registration.isConfirmed) {
            return HttpResponse.json(
                { errorsMessages: [{ field: 'email', message: 'Email is incorrect' }] },
                { status: 400 },
            );
        }

        pendingRegistrationsStore.update(email, {
            confirmationCode: `valid-${email}`,
            isExpired: false,
        });

        return new HttpResponse(null, { status: 204 });
    }),

    // The real /auth/login now returns a JWT accessToken (200), not a bare 204.
    http.post(apiPath('/auth/login'), async ({ request }) => {
        const { loginOrEmail, password } = (await request.json()) as LoginInput;

        const registration = pendingRegistrationsStore.findByLoginOrEmail(loginOrEmail);

        if (!registration?.isConfirmed || registration.password !== password) {
            return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({ accessToken: `${MOCK_TOKEN_PREFIX}${registration.login}` });
    }),

    http.get(apiPath('/auth/me'), ({ request }) => {
        const login = readBearerLogin(request);
        const registration = login ? pendingRegistrationsStore.findByLoginOrEmail(login) : null;

        if (!registration) {
            return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({
            email: registration.email,
            login: registration.login,
            userId: `mock-user-${registration.login}`,
        });
    }),

    http.get(apiPath('/posts/:postId/comments'), ({ params, request }) => {
        const { pageNumber, pageSize } = readQuery(request);

        const comments = commentsStore
            .findByPostId(params.postId as string)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        return HttpResponse.json(buildPaginator(comments, pageNumber, pageSize));
    }),

    http.post(apiPath('/posts/:postId/comments'), async ({ params, request }) => {
        const login = readBearerLogin(request);
        const registration = login ? pendingRegistrationsStore.findByLoginOrEmail(login) : null;

        if (!registration) {
            return new HttpResponse(null, { status: 401 });
        }

        const { content } = (await request.json()) as CommentInput;

        const comment: MockComment = {
            id: `mock-comment-${Date.now()}-${Math.round(Math.random() * 1000)}`,
            postId: params.postId as string,
            content,
            commentatorInfo: {
                userId: `mock-user-${registration.login}`,
                userLogin: registration.login,
            },
            createdAt: new Date().toISOString(),
        };

        commentsStore.add(comment);

        return HttpResponse.json(comment, { status: 201 });
    }),

    http.get(apiPath('/comments/:id'), ({ params }) => {
        const comment = commentsStore.findById(params.id as string);

        return comment ? HttpResponse.json(comment) : new HttpResponse(null, { status: 404 });
    }),

    http.put(apiPath('/comments/:id'), async ({ params, request }) => {
        const login = readBearerLogin(request);
        const registration = login ? pendingRegistrationsStore.findByLoginOrEmail(login) : null;

        if (!registration) {
            return new HttpResponse(null, { status: 401 });
        }

        const comment = commentsStore.findById(params.id as string);
        if (!comment) {
            return new HttpResponse(null, { status: 404 });
        }

        if (comment.commentatorInfo.userLogin !== registration.login) {
            return new HttpResponse(null, { status: 403 });
        }

        const { content } = (await request.json()) as CommentInput;
        commentsStore.update(comment.id, content);

        return new HttpResponse(null, { status: 204 });
    }),

    http.delete(apiPath('/comments/:id'), ({ params, request }) => {
        const login = readBearerLogin(request);
        const registration = login ? pendingRegistrationsStore.findByLoginOrEmail(login) : null;

        if (!registration) {
            return new HttpResponse(null, { status: 401 });
        }

        const comment = commentsStore.findById(params.id as string);
        if (!comment) {
            return new HttpResponse(null, { status: 404 });
        }

        if (comment.commentatorInfo.userLogin !== registration.login) {
            return new HttpResponse(null, { status: 403 });
        }

        commentsStore.remove(comment.id);

        return new HttpResponse(null, { status: 204 });
    }),
];
