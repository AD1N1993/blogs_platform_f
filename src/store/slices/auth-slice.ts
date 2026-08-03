import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CurrentUser } from '#/types/auth';

export type AuthState = {
    user: CurrentUser | null;
};

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }: PayloadAction<CurrentUser | null>) => {
            state.user = payload;
        },
    },
});

export const { setCurrentUser } = authSlice.actions;
