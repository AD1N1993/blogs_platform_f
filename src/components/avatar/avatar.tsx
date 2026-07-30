import cn from 'classnames';

import { ImagePlaceholderIcon } from '#/components/icons';

import styles from './avatar.module.css';

type AvatarProps = {
    src?: string | null;
    alt?: string;
    size?: 'small' | 'large';
    shape?: 'circle' | 'square';
    className?: string;
};

export const Avatar = ({
    src,
    alt = '',
    size = 'large',
    shape = 'circle',
    className,
}: AvatarProps) => (
    <div className={cn(styles.avatar, styles[size], styles[shape], className)}>
        {src ? (
            <img src={src} alt={alt} className={styles.image} />
        ) : (
            <ImagePlaceholderIcon className={styles.placeholder} />
        )}
    </div>
);
