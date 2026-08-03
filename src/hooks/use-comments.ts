import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { CommentInput } from '#/types/comment';
import { COMMENTS_PAGE_SIZE, QUERY_KEYS } from '#/utils/constants';
import { commentsApi } from '#services/comments-api';

export const usePostCommentsQuery = (postId: string) =>
    useInfiniteQuery({
        queryKey: QUERY_KEYS.postComments(postId),
        queryFn: ({ pageParam }) =>
            commentsApi.searchByPost(postId, {
                pageNumber: pageParam,
                pageSize: COMMENTS_PAGE_SIZE,
                sortBy: 'createdAt',
                sortDirection: 'desc',
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined,
    });

export const useCreateCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CommentInput) => commentsApi.create(postId, input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
        },
    });
};

export const useUpdateCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId, input }: { commentId: string; input: CommentInput }) =>
            commentsApi.update(commentId, input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
        },
    });
};

export const useDeleteCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: string) => commentsApi.remove(commentId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
        },
    });
};
