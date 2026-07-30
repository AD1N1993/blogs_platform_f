import { useInfiniteQuery } from '@tanstack/react-query';

import { POSTS_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { POST_SORT_PRESETS } from '#/utils/sorting';
import { postsApi } from '#services/posts-api';
import type { PostsFilterState } from '#slices/posts-filter-slice';

export const usePostsQuery = ({ sort }: PostsFilterState) => {
    const { sortBy, sortDirection } = POST_SORT_PRESETS[sort];
    const params = { sortBy, sortDirection, pageSize: POSTS_PAGE_SIZE };

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.posts, params],
        queryFn: ({ pageParam }) => postsApi.search({ ...params, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined,
    });
};
