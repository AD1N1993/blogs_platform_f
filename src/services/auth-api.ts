import type {
    ConfirmEmailInput,
    CurrentUser,
    LoginInput,
    LoginResponse,
    ResendEmailInput,
    SignUpInput,
} from '#/types/auth';

import { httpClient } from './http-client';

export const authApi = {
    signUp: async (input: SignUpInput): Promise<void> => {
        await httpClient.post('/auth/registration', input);
    },

    confirmEmail: async (input: ConfirmEmailInput): Promise<void> => {
        await httpClient.post('/auth/registration-confirmation', input);
    },

    resendEmail: async (input: ResendEmailInput): Promise<void> => {
        await httpClient.post('/auth/registration-email-resending', input);
    },

    login: async (input: LoginInput): Promise<LoginResponse> => {
        const { data } = await httpClient.post<LoginResponse>('/auth/login', input);

        return data;
    },

    me: async (): Promise<CurrentUser> => {
        const { data } = await httpClient.get<CurrentUser>('/auth/me');

        return data;
    },
};
