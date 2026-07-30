import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { PostsFilter, PostsSort } from '#/types/post';

const initialState: PostsFilter = {
    sort: 'newest',
};

export const postsFilterSlice = createSlice({
    name: 'postsFilter',
    initialState,
    reducers: {
        setPostsSort: (state, { payload }: PayloadAction<PostsSort>) => {
            state.sort = payload;
        },
    },
});

export const { setPostsSort } = postsFilterSlice.actions;
