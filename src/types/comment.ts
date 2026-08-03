import type { components } from './generated/api';

export type Comment = components['schemas']['CommentViewModel'];
export type CommentsPage = components['schemas']['CommentPaginator'];
export type CommentInput = components['schemas']['CommentInputModel'];

export type CommentsFilter = {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: 'content' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
};
