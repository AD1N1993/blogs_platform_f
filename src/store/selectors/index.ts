import type { ReduxStore } from '#/types/store';

export const blogsFilterSelectors = {
    filter: (state: ReduxStore) => state.blogsFilter,
    searchNameTerm: (state: ReduxStore) => state.blogsFilter.searchNameTerm,
    sort: (state: ReduxStore) => state.blogsFilter.sort,
};

export const postsFilterSelectors = {
    filter: (state: ReduxStore) => state.postsFilter,
    sort: (state: ReduxStore) => state.postsFilter.sort,
};
