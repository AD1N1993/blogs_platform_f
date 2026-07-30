import { Link } from 'react-router-dom';

import type { Post } from '#/types/post';
import { formatDate } from '#/utils/date.utils';

import styles from './post-card.module.css';

type PostCardProps = {
    post: Post;
    onTagClick?: (tag: string) => void;
};

export const PostCard = ({ post, onTagClick }: PostCardProps) => (
    <article className={styles.card}>
        <h2 className={styles.title}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <p className={styles.meta}>
            {post.author.name} · {formatDate(post.publishedAt)}
        </p>
        <p className={styles.excerpt}>{post.excerpt}</p>
        {post.tags.length > 0 ? (
            <ul className={styles.tags}>
                {post.tags.map((tag) => (
                    <li key={tag}>
                        {onTagClick ? (
                            <button
                                type='button'
                                className={styles.tagButton}
                                onClick={() => onTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ) : (
                            <span className={styles.tag}>{tag}</span>
                        )}
                    </li>
                ))}
            </ul>
        ) : null}
    </article>
);
