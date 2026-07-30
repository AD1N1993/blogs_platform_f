import type { BlogsFilter, BlogsPage } from '#/types/blog';

import { httpClient } from './http-client';

export const blogsApi = {
    search: async (filter: BlogsFilter = {}): Promise<BlogsPage> => {
        const { data } = await httpClient.get<BlogsPage>('/blogs', { params: filter });

        return data;
    },
};
