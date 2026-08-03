import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { APP_CONFIG } from '#/utils/constants';

import { authTokenStorage } from './auth-token-storage';

export type ValidationError = {
    field: string;
    message: string;
};

export type ApiErrorPayload = {
    errorCode?: string;
    message?: string;
    /** The shape the real backend actually returns (see ValidationErrorResponse in openapi.json). */
    errorsMessages?: ValidationError[];
};

export class ApiError extends Error {
    public readonly status?: number;

    public readonly errorCode?: string;

    public readonly errorsMessages: ValidationError[];

    constructor(
        message: string,
        status?: number,
        errorCode?: string,
        errorsMessages: ValidationError[] = [],
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errorCode = errorCode;
        this.errorsMessages = errorsMessages;
    }
}

export const httpClient: AxiosInstance = axios.create({
    baseURL: APP_CONFIG.apiUrl,
    timeout: 30_000,
    headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
    const token = authTokenStorage.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

/**
 * Set by main.tsx once the store/router exist, so the interceptor (which can't import the
 * store directly without a circular dependency) can react to an expired/invalid access token.
 */
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
    onUnauthorized = handler;
};

httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorPayload>) => {
        const payload = error.response?.data;

        if (error.response?.status === 401 && authTokenStorage.get()) {
            authTokenStorage.clear();
            onUnauthorized?.();
        }

        throw new ApiError(
            payload?.message ??
                payload?.errorsMessages?.[0]?.message ??
                error.message ??
                'Неизвестная ошибка',
            error.response?.status,
            payload?.errorCode,
            payload?.errorsMessages,
        );
    },
);
