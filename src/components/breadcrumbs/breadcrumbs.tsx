import { Link } from 'react-router-dom';

import { ChevronRightIcon } from '#/components/icons';

import styles from './breadcrumbs.module.css';

export type Crumb = {
    label: string;
    /** Omit on the last crumb: the current page is not a link. */
    to?: string;
};

type BreadcrumbsProps = {
    items: Crumb[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
    <nav aria-label='Breadcrumb'>
        <ol className={styles.list}>
            {items.map(({ label, to }, index) => (
                <li key={`${label}-${index}`} className={styles.item}>
                    {index > 0 ? <ChevronRightIcon className={styles.separator} /> : null}
                    {to ? (
                        <Link to={to} className={styles.link}>
                            {label}
                        </Link>
                    ) : (
                        <span className={styles.current} aria-current='page'>
                            {label}
                        </span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);
