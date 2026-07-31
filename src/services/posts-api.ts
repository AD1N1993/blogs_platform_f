import type { Post, PostsFilter, PostsPage } from '#/types/post';

import { httpClient } from './http-client';

export const postsApi = {
    search: async (filter: PostsFilter = {}): Promise<PostsPage> => {
        const { data } = await httpClient.get<PostsPage>('/posts', { params: filter });

        return data;
    },

    getById: async (postId: string): Promise<Post> => {
        const { data } = await httpClient.get<Post>(`/posts/${postId}`);

        return data;
    },

    searchByBlog: async (blogId: string, filter: PostsFilter = {}): Promise<PostsPage> => {
        const { data } = await httpClient.get<PostsPage>(`/blogs/${blogId}/posts`, {
            params: filter,
        });

        return data;
    },
};
