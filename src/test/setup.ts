import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from '#/mocks/server';

// jsdom implements no layout, so ResizeObserver is missing. Components that observe their
// own size (ExpandableText) only need it to exist — it never fires without real layout.
globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => server.close());
