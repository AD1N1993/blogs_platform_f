import { useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { AuthCard } from '#/components/auth-card';
import { Spinner } from '#/components/spinner';
import { useConfirmEmailMutation } from '#/hooks/use-auth';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { ApiError } from '#services/http-client';

import styles from './email-confirmation-page.module.css';

export const EmailConfirmationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutate: confirmEmailMutate, ...confirmEmail } = useConfirmEmailMutation();

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
                    if (error instanceof ApiError && error.errorCode === 'CODE_EXPIRED') {
                        goToExpiredPage();
                    }
                },
            },
        );
    }, [code, confirmEmailMutate, goToExpiredPage]);

    if (confirmEmail.isPending || confirmEmail.isIdle) {
        return (
            <AuthCard>
                <Spinner />
            </AuthCard>
        );
    }

    if (confirmEmail.isError) {
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
