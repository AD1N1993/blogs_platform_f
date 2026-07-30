import { configureStore } from '@reduxjs/toolkit';

import type { ReduxStore } from '#/types/store';
import { IS_PRODUCTION } from '#/utils/constants';

import { reducers } from './reducers';

export const configureAppStore = (preloadedState?: Partial<ReduxStore>) =>
    configureStore({
        reducer: reducers,
        preloadedState,
        devTools: !IS_PRODUCTION,
    });

export type AppStore = ReturnType<typeof configureAppStore>;
export type AppDispatch = AppStore['dispatch'];
