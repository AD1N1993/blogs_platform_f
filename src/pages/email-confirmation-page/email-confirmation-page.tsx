import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { AuthCard } from '#/components/auth-card';
import { Spinner } from '#/components/spinner';
import { useConfirmEmailMutation } from '#/hooks/use-auth';
import { APPLICATION_ROUTES, AUTH_ERROR_MATCHERS } from '#/utils/constants';
import { ApiError } from '#services/http-client';

import styles from './email-confirmation-page.module.css';

export const EmailConfirmationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutate: confirmEmailMutate, ...confirmEmail } = useConfirmEmailMutation();
    /**
     * The backend rejects an already-used code, but StrictMode double-invokes this effect in
     * dev — so the second attempt failing that way still means the first one succeeded.
     */
    const [isAlreadyConfirmed, setIsAlreadyConfirmed] = useState(false);

    const code = searchParams.get('code');
    const email = searchParams.get('email');

    const goToExpiredPage = useCallback(() => {
        const query = email ? `?email=${encodeURIComponent(email)}` : '';
        void navigate(`${APPLICATION_ROUTES.emailConfirmationExpired}${query}`, { replace: true });
    }, [email, navigate]);

    useEffect(() => {
        if (!code) {
            goToExpiredPage();
            return;
        }

        confirmEmailMutate(
            { code },
            {
                onError: (error) => {
                    if (!(error instanceof ApiError)) return;

                    const { codeExpired, codeAlreadyConfirmed } = AUTH_ERROR_MATCHERS;

                    if (error.hasFieldError(codeExpired.field, codeExpired.message)) {
                        goToExpiredPage();
                        return;
                    }

                    if (
                        error.hasFieldError(
                            codeAlreadyConfirmed.field,
                            codeAlreadyConfirmed.message,
                        )
                    ) {
                        setIsAlreadyConfirmed(true);
                    }
                },
            },
        );
    }, [code, confirmEmailMutate, goToExpiredPage]);

    const { codeExpired } = AUTH_ERROR_MATCHERS;
    /**
     * navigate() only takes effect on a later render, so both redirecting cases must keep
     * showing the spinner — otherwise the error screen flashes in place of the expired screen.
     */
    const isRedirectingToExpired =
        !code ||
        (confirmEmail.error instanceof ApiError &&
            confirmEmail.error.hasFieldError(codeExpired.field, codeExpired.message));

    if (confirmEmail.isPending || confirmEmail.isIdle || isRedirectingToExpired) {
        return (
            <AuthCard>
                <Spinner />
            </AuthCard>
        );
    }

    if (confirmEmail.isError && !isAlreadyConfirmed) {
        return (
            <AuthCard>
                <h1 className={styles.title}>Confirmation failed</h1>
                <p className={styles.message}>
                    {confirmEmail.error instanceof ApiError
                        ? confirmEmail.error.message
                        : 'Something went wrong'}
                </p>
                <Link className={styles.button} to={APPLICATION_ROUTES.signIn}>
                    Sign In
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard>
            <h1 className={styles.title}>Congratulations!</h1>
            <p className={styles.message}>Your email has been confirmed</p>
            <Link className={styles.button} to={APPLICATION_ROUTES.signIn}>
                Sign In
            </Link>
        </AuthCard>
    );
};
