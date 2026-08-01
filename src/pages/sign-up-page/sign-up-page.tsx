import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import signUpIllustration from '#/assets/sign-up-illustration.svg';
import { AuthCard } from '#/components/auth-card';
import { Modal } from '#/components/modal';
import { useResendEmailMutation, useSignUpMutation } from '#/hooks/use-auth';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { ApiError } from '#services/http-client';

import styles from './sign-up-page.module.css';
import { signUpSchema, type SignUpFormValues } from './sign-up.schema';

export const SignUpPage = () => {
    const [sentToEmail, setSentToEmail] = useState<string | null>(null);
    const [isEmailSentModalOpen, setIsEmailSentModalOpen] = useState(false);

    const signUp = useSignUpMutation();
    const resendEmail = useResendEmailMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { login: '', email: '', password: '' },
    });

    const onSubmit = (input: SignUpFormValues) => {
        signUp.mutate(input, {
            onSuccess: () => {
                setSentToEmail(input.email);
                setIsEmailSentModalOpen(true);
            },
        });
    };

    const handleResend = () => {
        if (!sentToEmail) return;

        resendEmail.mutate({ email: sentToEmail });
    };

    return (
        <AuthCard illustrationSrc={signUpIllustration}>
            <h1 className={styles.title}>Sign Up</h1>

            <form className={styles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <label className={styles.field}>
                    <span className={styles.label}>Username</span>
                    <input className={styles.input} type='text' {...register('login')} />
                    {errors.login ? (
                        <span className={styles.error}>{errors.login.message}</span>
                    ) : null}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <input className={styles.input} type='email' {...register('email')} />
                    {errors.email ? (
                        <span className={styles.error}>{errors.email.message}</span>
                    ) : null}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Password</span>
                    <input className={styles.input} type='password' {...register('password')} />
                    {errors.password ? (
                        <span className={styles.error}>{errors.password.message}</span>
                    ) : null}
                </label>

                {sentToEmail ? (
                    <p className={styles.hint}>
                        The link has been sent by email.
                        <br />
                        If you don&apos;t receive an email,{' '}
                        <button
                            type='button'
                            className={styles.resendLink}
                            onClick={handleResend}
                            disabled={resendEmail.isPending}
                        >
                            send link again
                        </button>
                    </p>
                ) : null}

                {signUp.isError ? (
                    <p className={styles.error} role='alert'>
                        {signUp.error instanceof ApiError
                            ? signUp.error.message
                            : 'Failed to sign up'}
                    </p>
                ) : null}

                <button type='submit' className={styles.submit} disabled={signUp.isPending}>
                    {signUp.isPending ? 'Signing up…' : 'Sign Up'}
                </button>
            </form>

            <p className={styles.footer}>
                Already a member? <Link to={APPLICATION_ROUTES.signIn}>Sign In</Link>
            </p>

            <Modal
                title='Email sent'
                isOpen={isEmailSentModalOpen}
                onClose={() => setIsEmailSentModalOpen(false)}
            >
                <p className={styles.modalMessage}>
                    We have sent a link to confirm your email to {sentToEmail}
                </p>
                <button
                    type='button'
                    className={styles.submit}
                    onClick={() => setIsEmailSentModalOpen(false)}
                >
                    OK
                </button>
            </Modal>
        </AuthCard>
    );
};
