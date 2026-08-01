import type { components } from './generated/api';

export type User = components['schemas']['UserViewModel'];
export type UsersPage = components['schemas']['UserPaginator'];
export type UserInput = components['schemas']['UserInputModel'];

/** Sortable user fields, per the sortBy enum in the API schema. */
export type UserSortField = 'login' | 'email' | 'createdAt';

export type UsersFilter = {
    searchLoginTerm?: string;
    searchEmailTerm?: string;
    sortBy?: UserSortField;
    sortDirection?: 'asc' | 'desc';
    pageNumber?: number;
    pageSize?: number;
};
