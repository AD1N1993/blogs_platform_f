import { useInfiniteQuery } from '@tanstack/react-query';

import type { PostsFilter } from '#/types/post';
import { POSTS_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { postsApi } from '#services/posts-api';

export const usePostsQuery = (filter: PostsFilter) => {
    const size = filter.size ?? POSTS_PAGE_SIZE;

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.posts, { ...filter, size }],
        queryFn: ({ pageParam }) => postsApi.search({ ...filter, size, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page * lastPage.size < lastPage.count ? lastPage.page + 1 : undefined,
    });
};
