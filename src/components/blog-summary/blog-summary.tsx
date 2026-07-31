import { Avatar } from '#/components/avatar';
import { ExpandableText } from '#/components/expandable-text';
import type { Blog } from '#/types/blog';
import { formatDate } from '#/utils/date.utils';

import styles from './blog-summary.module.css';

type BlogSummaryProps = {
    blog: Blog;
};

export const BlogSummary = ({ blog }: BlogSummaryProps) => (
    <section className={styles.summary}>
        <Avatar alt={blog.name} className={styles.avatar} />

        <div className={styles.body}>
            <h2 className={styles.name}>{blog.name}</h2>

            <dl className={styles.meta}>
                <dt className={styles.term}>Blog creation date:</dt>
                <dd className={styles.value}>{formatDate(blog.createdAt)}</dd>

                <dt className={styles.term}>Website:</dt>
                <dd className={styles.value}>
                    <a href={blog.websiteUrl} target='_blank' rel='noreferrer noopener'>
                        {blog.websiteUrl}
                    </a>
                </dd>
            </dl>

            <ExpandableText className={styles.description}>{blog.description}</ExpandableText>
        </div>
    </section>
);
