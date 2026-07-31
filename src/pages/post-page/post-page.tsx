import { Link, useParams } from 'react-router-dom';

import { Avatar } from '#/components/avatar';
import { BackLink } from '#/components/back-link';
import { Breadcrumbs } from '#/components/breadcrumbs';
import { ImagePlaceholderIcon } from '#/components/icons';
import { Spinner } from '#/components/spinner';
import { usePostQuery } from '#/hooks/use-posts';
import { APPLICATION_ROUTES, buildBlogRoute } from '#/utils/constants';
import { formatDateTime } from '#/utils/date.utils';

import styles from './post-page.module.css';

/** The API stores content as plain text; blank lines separate paragraphs. */
const toParagraphs = (content: string) =>
    content
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

export const PostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isPending, isError, error } = usePostQuery(postId);

    return (
        <div className={styles.page}>
            <Breadcrumbs
                items={[
                    { label: 'Posts', to: APPLICATION_ROUTES.posts },
                    { label: post?.blogName ?? 'Post' },
                ]}
            />

            <div className={styles.back}>
                <BackLink to={APPLICATION_ROUTES.posts}>Back to posts</BackLink>
            </div>

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Failed to load the post: {error.message}
                </p>
            ) : null}

            {post ? (
                <article className={styles.post}>
                    <header className={styles.header}>
                        <div className={styles.blog}>
                            <Avatar size='small' shape='square' />
                            <Link to={buildBlogRoute(post.blogId)} className={styles.blogName}>
                                {post.blogName}
                            </Link>
                        </div>

                        <h2 className={styles.title}>
                            {post.title}
                            <span className={styles.hint}>(for public posts)</span>
                        </h2>

                        <p className={styles.date}>{formatDateTime(post.createdAt)}</p>
                    </header>

                    {/* The API has no image field yet, so the cover is always a placeholder */}
                    <div className={styles.cover}>
                        <ImagePlaceholderIcon className={styles.placeholder} />
                    </div>

                    <div className={styles.content}>
                        {toParagraphs(post.content).map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>
            ) : null}
        </div>
    );
};
