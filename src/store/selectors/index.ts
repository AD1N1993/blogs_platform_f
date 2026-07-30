import type { ReduxStore } from '#/types/store';

export const notificationsSelectors = {
    items: (state: ReduxStore) => state.notifications.items,
};

export const postsFilterSelectors = {
    filter: (state: ReduxStore) => state.postsFilter,
    search: (state: ReduxStore) => state.postsFilter.search,
    tag: (state: ReduxStore) => state.postsFilter.tag,
    page: (state: ReduxStore) => state.postsFilter.page,
};
