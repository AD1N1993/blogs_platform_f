import type { components } from './generated/api';

export type Blog = components['schemas']['BlogViewModel'];
export type BlogsPage = components['schemas']['BlogPaginator'];

/** Sortable blog fields, per the sortBy enum in the API schema. */
export type BlogSortField = 'name' | 'description' | 'websiteUrl' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export type BlogsFilter = {
    searchNameTerm?: string;
    sortBy?: BlogSortField;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
};
