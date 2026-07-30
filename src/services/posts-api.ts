import type { Paginated } from '#/types/blog';
import type { Post, PostsFilter } from '#/types/post';

import { httpClient } from './http-client';

export const postsApi = {
    search: async (filter: PostsFilter = {}): Promise<Paginated<Post>> => {
        const { data } = await httpClient.get<Paginated<Post>>('/posts', { params: filter });

        return data;
    },
};
