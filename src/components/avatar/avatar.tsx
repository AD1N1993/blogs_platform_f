import cn from 'classnames';

import { ImagePlaceholderIcon } from '#/components/icons';

import styles from './avatar.module.css';

type AvatarProps = {
    /** Rendered as the icon's accessible label; empty means decorative. */
    alt?: string;
    size?: 'small' | 'large';
    shape?: 'circle' | 'square';
    className?: string;
};

/**
 * Placeholder-only avatar: the API exposes no image field yet. When it does, add a
 * `src` prop here and render an <img> instead of the icon.
 */
export const Avatar = ({ alt = '', size = 'large', shape = 'circle', className }: AvatarProps) => (
    <div
        className={cn(styles.avatar, styles[size], styles[shape], className)}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
    >
        <ImagePlaceholderIcon className={styles.placeholder} />
    </div>
);
