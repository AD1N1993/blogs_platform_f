import { Outlet } from 'react-router-dom';

import { AppHeader } from '#/components/app-header';
import { AppSidebar } from '#/components/app-sidebar';

import styles from './app-layout.module.css';

export const AppLayout = () => (
    <div className={styles.layout}>
        <AppHeader />
        <div className={styles.body}>
            <AppSidebar />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    </div>
);
