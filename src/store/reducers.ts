import { combineReducers } from '@reduxjs/toolkit';

import { notificationsSlice } from '#slices/notifications-slice';
import { postsFilterSlice } from '#slices/posts-filter-slice';

export const reducers = combineReducers({
    [notificationsSlice.name]: notificationsSlice.reducer,
    [postsFilterSlice.name]: postsFilterSlice.reducer,
});
