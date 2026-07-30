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
        <div className={styles.preview}>
            {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} className={styles.image} />
            ) : (
                <ImagePlaceholderIcon className={styles.placeholder} />
            )}
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
