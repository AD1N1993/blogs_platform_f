import { Link } from 'react-router-dom';

import { ArrowLeftIcon } from '#/components/icons';

import styles from './back-link.module.css';

type BackLinkProps = {
    to: string;
    children: string;
};

export const BackLink = ({ to, children }: BackLinkProps) => (
    <Link to={to} className={styles.link}>
        <ArrowLeftIcon className={styles.icon} />
        <span>{children}</span>
    </Link>
);
