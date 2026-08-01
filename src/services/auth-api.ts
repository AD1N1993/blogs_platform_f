import type { ConfirmEmailInput, LoginInput, ResendEmailInput, SignUpInput } from '#/types/auth';

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

    login: async (input: LoginInput): Promise<void> => {
        await httpClient.post('/auth/login', input);
    },
};
