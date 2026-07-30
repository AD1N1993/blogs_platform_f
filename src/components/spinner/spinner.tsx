import cn from 'classnames';

import styles from './spinner.module.css';

type SpinnerProps = {
    className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => (
    <div className={cn(styles.container, className)} role='status' aria-label='Загрузка'>
        <span className={styles.spinner} />
    </div>
);
