import { ChevronDownIcon } from '#/components/icons';

import styles from './show-more-button.module.css';

type ShowMoreButtonProps = {
    onClick: () => void;
    isLoading?: boolean;
};

export const ShowMoreButton = ({ onClick, isLoading = false }: ShowMoreButtonProps) => (
    <div className={styles.wrapper}>
        <button type='button' className={styles.button} onClick={onClick} disabled={isLoading}>
            <span>{isLoading ? 'Loading…' : 'Show more'}</span>
            <ChevronDownIcon className={styles.icon} />
        </button>
    </div>
);
