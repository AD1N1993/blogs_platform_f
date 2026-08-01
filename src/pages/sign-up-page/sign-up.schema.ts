import { z } from 'zod';

const LOGIN_PATTERN = /^[a-zA-Z0-9_-]*$/;

/** Mirrors the backend's user validation rules (see users/validation/user.validation.ts). */
export const signUpSchema = z.object({
    login: z
        .string()
        .min(3, 'Username length should be between 3 and 10')
        .max(10, 'Username length should be between 3 and 10')
        .regex(LOGIN_PATTERN, 'Username can only contain letters, numbers, underscore and hyphen'),
    email: z.email('Email has invalid format'),
    password: z
        .string()
        .min(6, 'Password length should be between 6 and 20')
        .max(20, 'Password length should be between 6 and 20'),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
