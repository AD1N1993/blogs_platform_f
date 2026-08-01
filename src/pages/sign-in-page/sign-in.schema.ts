import { z } from 'zod';

export const signInSchema = z.object({
    loginOrEmail: z.string().trim().min(1, 'This field is required'),
    password: z.string().trim().min(1, 'This field is required'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
