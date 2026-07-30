import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { APPLICATION_ROUTES } from '#/utils/constants';

import styles from './page-layout.module.css';

import type { ReactNode } from 'react';

const MENU_ITEMS = [{ route: APPLICATION_ROUTES.posts, label: 'Статьи' }];

type PageLayoutProps = {
    children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
    const { pathname } = useLocation();

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Link to={APPLICATION_ROUTES.posts} className={styles.logo}>
                    Блог-платформа
                </Link>
                <nav className={styles.nav} aria-label='Основная навигация'>
                    {MENU_ITEMS.map(({ route, label }) => (
                        <Link
                            key={route}
                            to={route}
                            className={cn(styles.navItem, {
                                [styles.navItemActive]: pathname.startsWith(route),
                            })}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};
