import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureAppStore, type AppStore } from '#/store';
import type { ReduxStore } from '#/types/store';

export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: { retry: false, gcTime: 0 },
            mutations: { retry: false },
        },
    });

type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
    preloadedState?: Partial<ReduxStore>;
    store?: AppStore;
    queryClient?: QueryClient;
    route?: string;
};

export const renderWithProviders = (
    ui: ReactElement,
    {
        preloadedState,
        store = configureAppStore(preloadedState),
        queryClient = createTestQueryClient(),
        route = '/',
        ...renderOptions
    }: RenderWithProvidersOptions = {},
): RenderResult & { store: AppStore; queryClient: QueryClient } => {
    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );

    return { store, queryClient, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
