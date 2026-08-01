import { z } from 'zod';

const LOGIN_PATTERN = /^[a-zA-Z0-9_-]*$/;

/** Mirrors the backend's express-validator rules so bad input is caught before the request. */
export const userInputSchema = z.object({
    email: z.email('Email has invalid format'),
    login: z
        .string()
        .min(3, 'Login length should be between 3 and 10')
        .max(10, 'Login length should be between 3 and 10')
        .regex(LOGIN_PATTERN, 'Login can only contain letters, numbers, underscore and hyphen'),
    password: z
        .string()
        .min(6, 'Password length should be between 6 and 20')
        .max(20, 'Password length should be between 6 and 20'),
});

export type UserInputFormValues = z.infer<typeof userInputSchema>;
