import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { PostSortPresetKey } from '#/utils/sorting';

export type PostsFilterState = {
    sort: PostSortPresetKey;
};

const initialState: PostsFilterState = {
    sort: 'newest',
};

export const postsFilterSlice = createSlice({
    name: 'postsFilter',
    initialState,
    reducers: {
        setPostsSort: (state, { payload }: PayloadAction<PostSortPresetKey>) => {
            state.sort = payload;
        },
    },
});

export const { setPostsSort } = postsFilterSlice.actions;
