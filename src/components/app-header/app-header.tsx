import { Link } from 'react-router-dom';

import { useAppSelector } from '#/hooks/app';
import { useLogout } from '#/hooks/use-auth';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { authSelectors } from '#selectors';

import styles from './app-header.module.css';

export const APP_TITLE = 'Blogger Platform';

export const AppHeader = () => {
    const user = useAppSelector(authSelectors.user);
    const logout = useLogout();

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{APP_TITLE}</h1>

            <div className={styles.account}>
                {user ? (
                    <>
                        <span className={styles.login}>{user.login}</span>
                        <button type='button' className={styles.signOut} onClick={logout}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <Link className={styles.signIn} to={APPLICATION_ROUTES.signIn}>
                        Sign in
                    </Link>
                )}
            </div>
        </header>
    );
};
