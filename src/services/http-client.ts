import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { APP_CONFIG } from '#/utils/constants';

export type ApiErrorPayload = {
    errorCode?: string;
    message?: string;
};

export class ApiError extends Error {
    public readonly status?: number;

    public readonly errorCode?: string;

    constructor(message: string, status?: number, errorCode?: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errorCode = errorCode;
    }
}

export const httpClient: AxiosInstance = axios.create({
    baseURL: APP_CONFIG.apiUrl,
    timeout: 30_000,
    headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.response.use(
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
