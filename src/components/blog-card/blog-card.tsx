import { Avatar } from '#/components/avatar';
import type { Blog } from '#/types/blog';

import styles from './blog-card.module.css';

type BlogCardProps = {
    blog: Blog;
};

export const BlogCard = ({ blog }: BlogCardProps) => (
    <article className={styles.card}>
        <Avatar src={blog.imageUrl} alt={blog.name} />
        <div className={styles.body}>
            <h3 className={styles.name}>{blog.name}</h3>
            <p className={styles.website}>
                Website:{' '}
                <a href={blog.websiteUrl} target='_blank' rel='noreferrer noopener'>
                    {blog.websiteUrl}
                </a>
            </p>
            <p className={styles.description}>{blog.description}</p>
        </div>
    </article>
);
