import type { Blog, BlogsFilter, Paginated } from '#/types/blog';

import { httpClient } from './http-client';

export const blogsApi = {
    search: async (filter: BlogsFilter = {}): Promise<Paginated<Blog>> => {
        const { data } = await httpClient.get<Paginated<Blog>>('/blogs', { params: filter });

        return data;
    },
};
