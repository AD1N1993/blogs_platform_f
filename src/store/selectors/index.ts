import type { ReduxStore } from '#/types/store';

export const blogsFilterSelectors = {
    filter: (state: ReduxStore) => state.blogsFilter,
    search: (state: ReduxStore) => state.blogsFilter.search,
    sort: (state: ReduxStore) => state.blogsFilter.sort,
};

export const postsFilterSelectors = {
    filter: (state: ReduxStore) => state.postsFilter,
    sort: (state: ReduxStore) => state.postsFilter.sort,
};
