import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthCard } from '#/components/auth-card';
import { useLoginMutation } from '#/hooks/use-auth';
import { APPLICATION_ROUTES, AUTH_MESSAGES } from '#/utils/constants';
import { ApiError } from '#services/http-client';

import styles from './sign-in-page.module.css';
import { signInSchema, type SignInFormValues } from './sign-in.schema';

export const SignInPage = () => {
    const navigate = useNavigate();
    const login = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: { loginOrEmail: '', password: '' },
    });

    const onSubmit = (input: SignInFormValues) => {
        login.mutate(input, {
            onSuccess: () => {
                void navigate(APPLICATION_ROUTES.blogs);
            },
        });
    };

    return (
        <AuthCard>
            <h1 className={styles.title}>Sign In</h1>

            <form className={styles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <label className={styles.field}>
                    <span className={styles.label}>Username or Email</span>
                    <input className={styles.input} type='text' {...register('loginOrEmail')} />
                    {errors.loginOrEmail ? (
                        <span className={styles.error}>{errors.loginOrEmail.message}</span>
                    ) : null}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Password</span>
                    <input className={styles.input} type='password' {...register('password')} />
                    {errors.password ? (
                        <span className={styles.error}>{errors.password.message}</span>
                    ) : null}
                </label>

                {login.isError ? (
                    <p className={styles.error} role='alert'>
                        {login.error instanceof ApiError && login.error.status === 401
                            ? AUTH_MESSAGES.signInFailed
                            : 'Failed to sign in'}
                    </p>
                ) : null}

                <button type='submit' className={styles.submit} disabled={login.isPending}>
                    {login.isPending ? 'Signing in…' : 'Sign In'}
                </button>
            </form>

            <p className={styles.footer}>
                Not a member yet? <Link to={APPLICATION_ROUTES.signUp}>Sign Up</Link>
            </p>
        </AuthCard>
    );
};
