import type { Blog, BlogsFilter, BlogsPage } from '#/types/blog';

import { httpClient } from './http-client';

export const blogsApi = {
    search: async (filter: BlogsFilter = {}): Promise<BlogsPage> => {
        const { data } = await httpClient.get<BlogsPage>('/blogs', { params: filter });

        return data;
    },

    getById: async (blogId: string): Promise<Blog> => {
        const { data } = await httpClient.get<Blog>(`/blogs/${blogId}`);

        return data;
    },
};
