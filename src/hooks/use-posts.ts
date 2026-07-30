import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { PostCreatePayload, PostsFilter } from '#/types/post';
import { QUERY_KEYS } from '#/utils/constants';
import { postsApi } from '#services/posts-api';

export const usePostsQuery = (filter: PostsFilter) =>
    useQuery({
        queryKey: [...QUERY_KEYS.posts, filter],
        queryFn: () => postsApi.search(filter),
    });

export const usePostQuery = (postId: string | undefined) =>
    useQuery({
        queryKey: QUERY_KEYS.post(postId ?? ''),
        queryFn: () => postsApi.getById(postId as string),
        enabled: Boolean(postId),
    });

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PostCreatePayload) => postsApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts }),
    });
};
