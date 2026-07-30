import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { BlogSortPresetKey } from '#/utils/sorting';

export type BlogsFilterState = {
    searchNameTerm: string;
    sort: BlogSortPresetKey;
};

const initialState: BlogsFilterState = {
    searchNameTerm: '',
    sort: 'newest',
};

export const blogsFilterSlice = createSlice({
    name: 'blogsFilter',
    initialState,
    reducers: {
        setBlogsSearch: (state, { payload }: PayloadAction<string>) => {
            state.searchNameTerm = payload;
        },
        setBlogsSort: (state, { payload }: PayloadAction<BlogSortPresetKey>) => {
            state.sort = payload;
        },
    },
});

export const { setBlogsSearch, setBlogsSort } = blogsFilterSlice.actions;
