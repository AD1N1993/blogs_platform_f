import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { BlogsFilter, BlogsSort } from '#/types/blog';

const initialState: BlogsFilter = {
    search: '',
    sort: 'newest',
};

export const blogsFilterSlice = createSlice({
    name: 'blogsFilter',
    initialState,
    reducers: {
        setBlogsSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
        },
        setBlogsSort: (state, { payload }: PayloadAction<BlogsSort>) => {
            state.sort = payload;
        },
    },
});

export const { setBlogsSearch, setBlogsSort } = blogsFilterSlice.actions;
