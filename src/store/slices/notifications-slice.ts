import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { Notification, NotificationsReduxState } from '#/types/notifications';

const initialState: NotificationsReduxState = {
    items: [],
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification: {
            reducer: (state, { payload }: PayloadAction<Notification>) => {
                state.items.push(payload);
            },
            prepare: (notification: Omit<Notification, 'id'>) => ({
                payload: { ...notification, id: nanoid() },
            }),
        },
        hideNotification: (state, { payload }: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== payload);
        },
        clearNotifications: (state) => {
            state.items = [];
        },
    },
});

export const { showNotification, hideNotification, clearNotifications } =
    notificationsSlice.actions;
