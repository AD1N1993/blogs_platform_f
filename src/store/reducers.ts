import { combineReducers } from '@reduxjs/toolkit';

import { blogsFilterSlice } from '#slices/blogs-filter-slice';
import { postsFilterSlice } from '#slices/posts-filter-slice';

export const reducers = combineReducers({
    [blogsFilterSlice.name]: blogsFilterSlice.reducer,
    [postsFilterSlice.name]: postsFilterSlice.reducer,
});
