import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { APP_CONFIG } from '#/utils/constants';

import { ApiError, type ApiErrorPayload } from './http-client';

/**
 * The Users section (Super Admin only) is protected by Basic Auth on the backend, separate
 * from /auth/login. There is no login screen yet, so this client authenticates every request
 * with fixed admin credentials — see APP_CONFIG.adminUsername/adminPassword.
 */
export const adminHttpClient: AxiosInstance = axios.create({
    baseURL: APP_CONFIG.apiUrl,
    timeout: 30_000,
    headers: { 'Content-Type': 'application/json' },
    auth: {
        username: APP_CONFIG.adminUsername,
        password: APP_CONFIG.adminPassword,
    },
});

adminHttpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorPayload>) => {
        const payload = error.response?.data;

        throw new ApiError(
            payload?.message ?? error.message ?? 'Неизвестная ошибка',
            error.response?.status,
            payload?.errorCode,
        );
    },
);
