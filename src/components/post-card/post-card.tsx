import { Avatar } from '#/components/avatar';
import { ImagePlaceholderIcon } from '#/components/icons';
import type { Post } from '#/types/post';
import { formatDate } from '#/utils/date.utils';

import styles from './post-card.module.css';

type PostCardProps = {
    post: Post;
};

export const PostCard = ({ post }: PostCardProps) => (
    <article className={styles.card}>
        {/* The API has no image field yet, so the preview is always a placeholder */}
        <div className={styles.preview}>
            <ImagePlaceholderIcon className={styles.placeholder} />
        </div>
        <div className={styles.footer}>
            <Avatar size='small' shape='square' />
            <div className={styles.meta}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.blogName}>{post.blogName}</p>
                <p className={styles.date}>{formatDate(post.createdAt)}</p>
            </div>
        </div>
    </article>
);
