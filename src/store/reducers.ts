import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from '#slices/auth-slice';
import { blogsFilterSlice } from '#slices/blogs-filter-slice';
import { postsFilterSlice } from '#slices/posts-filter-slice';

export const reducers = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [blogsFilterSlice.name]: blogsFilterSlice.reducer,
    [postsFilterSlice.name]: postsFilterSlice.reducer,
});
