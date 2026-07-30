import { Link, useParams } from 'react-router-dom';

import { Spinner } from '#/components/spinner';
import { usePostQuery } from '#/hooks/use-posts';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { formatDate } from '#/utils/date.utils';

import styles from './post-page.module.css';

export const PostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isPending, isError, error } = usePostQuery(postId);

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <p className={styles.error} role='alert'>
                Не удалось загрузить статью: {error.message}
            </p>
        );
    }

    return (
        <article className={styles.article}>
            <Link to={APPLICATION_ROUTES.posts} className={styles.back}>
                ← К списку статей
            </Link>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.meta}>
                {post.author.name} · {formatDate(post.publishedAt)}
            </p>
            <div className={styles.content}>{post.content}</div>
        </article>
    );
};
