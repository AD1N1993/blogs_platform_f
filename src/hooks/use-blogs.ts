import { useInfiniteQuery } from '@tanstack/react-query';

import type { BlogsFilter } from '#/types/blog';
import { DEFAULT_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { blogsApi } from '#services/blogs-api';

export const useBlogsQuery = (filter: BlogsFilter) => {
    const size = filter.size ?? DEFAULT_PAGE_SIZE;

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.blogs, { ...filter, size }],
        queryFn: ({ pageParam }) => blogsApi.search({ ...filter, size, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page * lastPage.size < lastPage.count ? lastPage.page + 1 : undefined,
    });
};
