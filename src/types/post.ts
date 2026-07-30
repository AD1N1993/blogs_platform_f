import type { SortDirection } from './blog';
import type { components } from './generated/api';

export type Post = components['schemas']['PostViewModel'];
export type PostsPage = components['schemas']['PostPaginator'];

/** Sortable post fields, per the sortBy enum in the API schema. */
export type PostSortField = 'title' | 'shortDescription' | 'content' | 'blogName' | 'createdAt';

export type PostsFilter = {
    sortBy?: PostSortField;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
};
