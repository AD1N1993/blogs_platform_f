import { HttpResponse, http } from 'msw';

import type { Post, PostCreatePayload, PostsPage } from '#/types/post';
import { APP_CONFIG, DEFAULT_PAGE_SIZE } from '#/utils/constants';

import { POSTS_FIXTURE } from './fixtures/posts';

const apiPath = (path: string) => `${APP_CONFIG.apiUrl}${path}`;

let posts: Post[] = [...POSTS_FIXTURE];

export const resetMockPosts = () => {
    posts = [...POSTS_FIXTURE];
};

export const handlers = [
    http.get(apiPath('/posts'), ({ request }) => {
        const url = new URL(request.url);
        const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
        const tag = url.searchParams.get('tag');
        const page = Number(url.searchParams.get('page') ?? 1);
        const size = Number(url.searchParams.get('size') ?? DEFAULT_PAGE_SIZE);

        const filtered = posts.filter((post) => {
            const matchesSearch =
                !search ||
                post.title.toLowerCase().includes(search) ||
                post.excerpt.toLowerCase().includes(search);
            const matchesTag = !tag || post.tags.includes(tag);

            return matchesSearch && matchesTag;
        });

        const body: PostsPage = {
            content: filtered.slice((page - 1) * size, page * size),
            page,
            size,
            count: filtered.length,
        };

        return HttpResponse.json(body);
    }),

    http.get(apiPath('/posts/:postId'), ({ params }) => {
        const post = posts.find((item) => item.id === params.postId);

        if (!post) {
            return HttpResponse.json({ message: 'Статья не найдена' }, { status: 404 });
        }

        return HttpResponse.json(post);
    }),

    http.post(apiPath('/posts'), async ({ request }) => {
        const payload = (await request.json()) as PostCreatePayload;

        const created: Post = {
            ...payload,
            id: String(posts.length + 1),
            author: { id: 'u1', name: 'Иван Петров' },
            publishedAt: new Date().toISOString(),
        };

        posts = [created, ...posts];

        return HttpResponse.json(created, { status: 201 });
    }),
];
