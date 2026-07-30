import cn from 'classnames';
import type { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

import { GridIcon, ListIcon } from '#/components/icons';
import { APPLICATION_ROUTES } from '#/utils/constants';

import styles from './app-sidebar.module.css';

type MenuItem = {
    route: string;
    label: string;
    Icon: ComponentType<{ className?: string }>;
};

const MENU_ITEMS: MenuItem[] = [
    { route: APPLICATION_ROUTES.blogs, label: 'Blogs', Icon: ListIcon },
    { route: APPLICATION_ROUTES.posts, label: 'Posts', Icon: GridIcon },
];

export const AppSidebar = () => (
    <nav className={styles.sidebar} aria-label='Main navigation'>
        <ul className={styles.list}>
            {MENU_ITEMS.map(({ route, label, Icon }) => (
                <li key={route}>
                    <NavLink
                        to={route}
                        className={({ isActive }) => cn(styles.item, { [styles.active]: isActive })}
                    >
                        <Icon className={styles.icon} />
                        <span>{label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);
