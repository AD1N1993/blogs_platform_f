import { Avatar } from '#/components/avatar';
import { ImagePlaceholderIcon } from '#/components/icons';
import type { Post } from '#/types/post';
import { formatDate } from '#/utils/date.utils';

import styles from './post-card.module.css';

type PostCardProps = {
    post: Post;
    /**
     * `default` — the posts page: avatar plus the parent blog name.
     * `compact` — inside a blog, where the blog name is redundant, so the short
     * description takes its place.
     */
    variant?: 'default' | 'compact';
};

export const PostCard = ({ post, variant = 'default' }: PostCardProps) => (
    <article className={styles.card}>
        {/* The API has no image field yet, so the preview is always a placeholder */}
        <div className={styles.preview}>
            <ImagePlaceholderIcon className={styles.placeholder} />
        </div>
        <div className={styles.footer}>
            {variant === 'default' ? <Avatar size='small' shape='square' /> : null}
            <div className={styles.meta}>
                <h3 className={styles.title}>{post.title}</h3>
                {variant === 'default' ? (
                    <p className={styles.blogName}>{post.blogName}</p>
                ) : (
                    <p className={styles.description}>{post.shortDescription}</p>
                )}
                <p className={styles.date}>{formatDate(post.createdAt)}</p>
            </div>
        </div>
    </article>
);
