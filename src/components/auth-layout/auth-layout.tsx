import { Outlet } from 'react-router-dom';

import { AppHeader } from '#/components/app-header';

import styles from './auth-layout.module.css';

export const AuthLayout = () => (
    <div className={styles.layout}>
        <AppHeader />
        <main className={styles.content}>
            <Outlet />
        </main>
    </div>
);
