import { ImagePlaceholderIcon } from '#/components/icons';

import styles from './blog-hero.module.css';

/** The API exposes no cover image yet, so the banner is always a placeholder. */
export const BlogHero = () => (
    <div className={styles.hero}>
        <ImagePlaceholderIcon className={styles.placeholder} />
    </div>
);
