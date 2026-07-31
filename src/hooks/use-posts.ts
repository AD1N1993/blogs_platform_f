import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { POSTS_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { POST_SORT_PRESETS } from '#/utils/sorting';
import { postsApi } from '#services/posts-api';
import type { PostsFilterState } from '#slices/posts-filter-slice';

const getNextPageParam = (lastPage: { page: number; pagesCount: number }) =>
    lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined;

export const usePostsQuery = ({ sort }: PostsFilterState) => {
    const { sortBy, sortDirection } = POST_SORT_PRESETS[sort];
    const params = { sortBy, sortDirection, pageSize: POSTS_PAGE_SIZE };

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.posts, params],
        queryFn: ({ pageParam }) => postsApi.search({ ...params, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam,
    });
};

export const usePostQuery = (postId: string | undefined) =>
    useQuery({
        queryKey: QUERY_KEYS.post(postId ?? ''),
        queryFn: () => postsApi.getById(postId as string),
        enabled: Boolean(postId),
    });

/** Posts of a single blog. Sorting mirrors the posts page; the API offers no search here. */
export const useBlogPostsQuery = (blogId: string | undefined, sort: PostsFilterState['sort']) => {
    const { sortBy, sortDirection } = POST_SORT_PRESETS[sort];
    const params = { sortBy, sortDirection, pageSize: POSTS_PAGE_SIZE };

    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.blogPosts(blogId ?? ''), params],
        queryFn: ({ pageParam }) =>
            postsApi.searchByBlog(blogId as string, { ...params, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam,
        enabled: Boolean(blogId),
    });
};
