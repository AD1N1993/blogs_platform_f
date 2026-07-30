import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from '#/components/app';
import { ErrorBoundary } from '#/components/error-boundary';

export const Root = () => (
    <ErrorBoundary>
        <App />
        {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </ErrorBoundary>
);
