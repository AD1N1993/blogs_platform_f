import type { Comment, CommentInput, CommentsFilter, CommentsPage } from '#/types/comment';

import { httpClient } from './http-client';

export const commentsApi = {
    searchByPost: async (postId: string, filter: CommentsFilter = {}): Promise<CommentsPage> => {
        const { data } = await httpClient.get<CommentsPage>(`/posts/${postId}/comments`, {
            params: filter,
        });

        return data;
    },

    getById: async (commentId: string): Promise<Comment> => {
        const { data } = await httpClient.get<Comment>(`/comments/${commentId}`);

        return data;
    },

    create: async (postId: string, input: CommentInput): Promise<Comment> => {
        const { data } = await httpClient.post<Comment>(`/posts/${postId}/comments`, input);

        return data;
    },

    update: async (commentId: string, input: CommentInput): Promise<void> => {
        await httpClient.put(`/comments/${commentId}`, input);
    },

    remove: async (commentId: string): Promise<void> => {
        await httpClient.delete(`/comments/${commentId}`);
    },
};
