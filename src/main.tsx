import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Root } from '#/components/root';
import { setUnauthorizedHandler } from '#/services/http-client';
import { queryClient } from '#/services/query-client';
import { configureAppStore } from '#/store';
import { APP_CONFIG } from '#/utils/constants';
import { setCurrentUser } from '#slices/auth-slice';

import './index.css';

const startMockServiceWorker = async () => {
    // The DEV check is static, which lets the bundler drop MSW from the production build entirely
    if (!import.meta.env.DEV || !APP_CONFIG.useMock) {
        return;
    }

    const { worker } = await import('#/mocks/browser');

    await worker.start({ onUnhandledRequest: 'bypass' });
};

const bootstrap = async () => {
    await startMockServiceWorker();

    const container = document.getElementById('react-app');

    if (!container) {
        throw new Error('Не найден контейнер #react-app');
    }

    const store = configureAppStore();

    // An expired/invalid access token means the user is signed out from the app's point of
    // view; individual screens react to isAuthenticated rather than forcing a hard redirect.
    setUnauthorizedHandler(() => {
        store.dispatch(setCurrentUser(null));
    }); 

    createRoot(container).render(
        <StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter basename={APP_CONFIG.contextRoot}>
                        <Root />
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        </StrictMode>,
    );
};

void bootstrap();
