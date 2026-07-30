import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { PostsFilter } from '#/types/post';
import { DEFAULT_PAGE_SIZE } from '#/utils/constants';

const initialState: PostsFilter = {
    search: '',
    tag: undefined,
    page: 1,
    size: DEFAULT_PAGE_SIZE,
};

export const postsFilterSlice = createSlice({
    name: 'postsFilter',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
            state.page = 1;
        },
        setTag: (state, { payload }: PayloadAction<string | undefined>) => {
            state.tag = payload;
            state.page = 1;
        },
        setPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        resetFilter: () => initialState,
    },
});

export const { setSearch, setTag, setPage, resetFilter } = postsFilterSlice.actions;
