import type { ReactNode } from 'react';

import styles from './auth-card.module.css';

type AuthCardProps = {
    illustrationSrc?: string;
    children: ReactNode;
};

export const AuthCard = ({ illustrationSrc, children }: AuthCardProps) => (
    <div className={styles.wrapper}>
        <div className={styles.card}>{children}</div>
        {illustrationSrc ? (
            <img className={styles.illustration} src={illustrationSrc} alt='' aria-hidden='true' />
        ) : null}
    </div>
);
