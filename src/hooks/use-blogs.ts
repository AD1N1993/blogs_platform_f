import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { DEFAULT_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { BLOG_SORT_PRESETS } from '#/utils/sorting';
import { blogsApi } from '#services/blogs-api';
import type { BlogsFilterState } from '#slices/blogs-filter-slice';

export const useBlogsQuery = ({ searchNameTerm, sort }: BlogsFilterState) => {
    const { sortBy, sortDirection } = BLOG_SORT_PRESETS[sort];
    // The API treats a missing searchNameTerm as "no filter"; an empty string would 400
    const params = {
        searchNameTerm: searchNameTerm || undefined,
        sortBy,
        sortDirection,
        pageSize: DEFAULT_PAGE_SIZE,
    };

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.blogs, params],
        queryFn: ({ pageParam }) => blogsApi.search({ ...params, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined,
    });
};

export const useBlogQuery = (blogId: string | undefined) =>
    useQuery({
        queryKey: QUERY_KEYS.blog(blogId ?? ''),
        queryFn: () => blogsApi.getById(blogId as string),
        enabled: Boolean(blogId),
    });
