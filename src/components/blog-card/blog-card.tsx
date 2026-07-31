import { Link } from 'react-router-dom';

import { Avatar } from '#/components/avatar';
import type { Blog } from '#/types/blog';
import { buildBlogRoute } from '#/utils/constants';

import styles from './blog-card.module.css';

type BlogCardProps = {
    blog: Blog;
};

export const BlogCard = ({ blog }: BlogCardProps) => (
    <article className={styles.card}>
        {/* The API has no image field yet, so the avatar always renders its placeholder */}
        <Avatar alt={blog.name} />
        <div className={styles.body}>
            <h3 className={styles.name}>
                <Link to={buildBlogRoute(blog.id)} className={styles.link}>
                    {blog.name}
                </Link>
            </h3>
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
