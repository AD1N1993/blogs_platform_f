import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import expiredLinkIllustration from '#/assets/expired-link-illustration.svg';
import { AuthCard } from '#/components/auth-card';
import { useResendEmailMutation } from '#/hooks/use-auth';
import { ApiError } from '#services/http-client';

import styles from './email-confirmation-expired-page.module.css';

export const EmailConfirmationExpiredPage = () => {
    const [searchParams] = useSearchParams();
    /**
     * The confirmation link the backend emails carries only `code`, so the address is unknown
     * when the user lands here from their inbox — they have to retype it to get a new link.
     * It is only pre-filled when the sign-up screen redirected here itself.
     */
    const emailFromQuery = searchParams.get('email');
    const [email, setEmail] = useState(emailFromQuery ?? '');
    const [isResent, setIsResent] = useState(false);

    const resendEmail = useResendEmailMutation();

    const trimmedEmail = email.trim();

    const handleResend = () => {
        if (!trimmedEmail) return;

        resendEmail.mutate({ email: trimmedEmail }, { onSuccess: () => setIsResent(true) });
    };

    return (
        <AuthCard illustrationSrc={expiredLinkIllustration}>
            <h1 className={styles.title}>Email verification link expired</h1>
            <p className={styles.message}>
                Looks like the verification link has expired. Not to worry, we can send the link
                again
            </p>

            {emailFromQuery ? null : (
                <label className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <input
                        className={styles.input}
                        type='email'
                        value={email}
                        placeholder='Enter the email you signed up with'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
            )}

            {isResent ? (
                <p className={styles.success}>A new verification link has been sent.</p>
            ) : null}

            {resendEmail.isError ? (
                <p className={styles.error} role='alert'>
                    {resendEmail.error instanceof ApiError
                        ? resendEmail.error.message
                        : 'Failed to resend the link'}
                </p>
            ) : null}

            <button
                type='button'
                className={styles.button}
                onClick={handleResend}
                disabled={!trimmedEmail || resendEmail.isPending}
            >
                {resendEmail.isPending ? 'Sending…' : 'Resend verification link'}
            </button>
        </AuthCard>
    );
};
