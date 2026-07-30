import type { ReactNode } from 'react';

import { AppHeader } from '#/components/app-header';
import { AppSidebar } from '#/components/app-sidebar';

import styles from './app-layout.module.css';

type AppLayoutProps = {
    children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => (
    <div className={styles.layout}>
        <AppHeader />
        <div className={styles.body}>
            <AppSidebar />
            <main className={styles.content}>{children}</main>
        </div>
    </div>
);
