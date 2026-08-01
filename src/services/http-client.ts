import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { APP_CONFIG } from '#/utils/constants';

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

httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorPayload>) => {
        const payload = error.response?.data;

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
