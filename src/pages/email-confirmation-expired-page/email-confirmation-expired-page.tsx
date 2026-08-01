import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import expiredLinkIllustration from '#/assets/expired-link-illustration.svg';
import { AuthCard } from '#/components/auth-card';
import { useResendEmailMutation } from '#/hooks/use-auth';
import { ApiError } from '#services/http-client';

import styles from './email-confirmation-expired-page.module.css';

export const EmailConfirmationExpiredPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [isResent, setIsResent] = useState(false);

    const resendEmail = useResendEmailMutation();

    const handleResend = () => {
        if (!email) return;

        resendEmail.mutate({ email }, { onSuccess: () => setIsResent(true) });
    };

    return (
        <AuthCard illustrationSrc={expiredLinkIllustration}>
            <h1 className={styles.title}>Email verification link expired</h1>
            <p className={styles.message}>
                Looks like the verification link has expired. Not to worry, we can send the link
                again
            </p>

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
                disabled={!email || resendEmail.isPending}
            >
                {resendEmail.isPending ? 'Sending…' : 'Resend verification link'}
            </button>
        </AuthCard>
    );
};
