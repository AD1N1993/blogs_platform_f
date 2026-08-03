const STORAGE_KEY = 'accessToken';

/**
 * The axios interceptor needs synchronous access to the token to attach the Authorization
 * header, so the token lives in localStorage directly rather than only in the Redux store
 * (importing the store into the http-client module would create a circular dependency).
 */
export const authTokenStorage = {
    get: (): string | null => localStorage.getItem(STORAGE_KEY),

    set: (token: string): void => {
        localStorage.setItem(STORAGE_KEY, token);
    },

    clear: (): void => {
        localStorage.removeItem(STORAGE_KEY);
    },
};
