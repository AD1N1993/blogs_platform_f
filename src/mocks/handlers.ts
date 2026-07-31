import { HttpResponse, http } from 'msw';

import type { Blog } from '#/types/blog';
import type { Post } from '#/types/post';
import { APP_CONFIG, DEFAULT_PAGE_SIZE } from '#/utils/constants';

import { BLOGS_FIXTURE } from './fixtures/blogs';
import { POSTS_FIXTURE } from './fixtures/posts';

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
];
