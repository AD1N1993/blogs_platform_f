import { HttpResponse, http } from 'msw';

import type { Blog, BlogsSort, Paginated } from '#/types/blog';
import type { Post, PostsSort } from '#/types/post';
import { APP_CONFIG, DEFAULT_PAGE_SIZE, POSTS_PAGE_SIZE } from '#/utils/constants';

import { BLOGS_FIXTURE } from './fixtures/blogs';
import { POSTS_FIXTURE } from './fixtures/posts';

const apiPath = (path: string) => `${APP_CONFIG.apiUrl}${path}`;

const byCreatedAtDesc = (a: { createdAt: string }, b: { createdAt: string }) =>
    b.createdAt.localeCompare(a.createdAt);

const paginate = <T>(items: T[], page: number, size: number): Paginated<T> => ({
    content: items.slice((page - 1) * size, page * size),
    page,
    size,
    count: items.length,
});

const sortBlogs = (blogs: Blog[], sort: BlogsSort): Blog[] => {
    const sorted = [...blogs];

    switch (sort) {
        case 'oldest':
            return sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted.sort(byCreatedAtDesc);
    }
};

const sortPosts = (posts: Post[], sort: PostsSort): Post[] => {
    const sorted = [...posts];

    switch (sort) {
        case 'oldest':
            return sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted.sort(byCreatedAtDesc);
    }
};

export const handlers = [
    http.get(apiPath('/blogs'), ({ request }) => {
        const url = new URL(request.url);
        const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
        const sort = (url.searchParams.get('sort') ?? 'newest') as BlogsSort;
        const page = Number(url.searchParams.get('page') ?? 1);
        const size = Number(url.searchParams.get('size') ?? DEFAULT_PAGE_SIZE);

        const filtered = BLOGS_FIXTURE.filter(
            (blog) => !search || blog.name.toLowerCase().includes(search),
        );

        return HttpResponse.json(paginate(sortBlogs(filtered, sort), page, size));
    }),

    http.get(apiPath('/posts'), ({ request }) => {
        const url = new URL(request.url);
        const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
        const sort = (url.searchParams.get('sort') ?? 'newest') as PostsSort;
        const page = Number(url.searchParams.get('page') ?? 1);
        const size = Number(url.searchParams.get('size') ?? POSTS_PAGE_SIZE);

        const filtered = POSTS_FIXTURE.filter(
            (post) => !search || post.title.toLowerCase().includes(search),
        );

        return HttpResponse.json(paginate(sortPosts(filtered, sort), page, size));
    }),
];
