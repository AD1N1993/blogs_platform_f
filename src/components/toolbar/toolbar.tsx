import type { ReactNode } from 'react';

import styles from './toolbar.module.css';

type ToolbarProps = {
    /** Left slot: search field. Omit it and the trailing slot sticks to the right, as on Posts. */
    children?: ReactNode;
    trailing?: ReactNode;
};

export const Toolbar = ({ children, trailing }: ToolbarProps) => (
    <div className={styles.toolbar}>
        {children}
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
    </div>
);
