import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackLink } from '#/components/back-link';
import { BlogHero } from '#/components/blog-hero';
import { BlogSummary } from '#/components/blog-summary';
import { Breadcrumbs } from '#/components/breadcrumbs';
import { PostCard } from '#/components/post-card';
import { ShowMoreButton } from '#/components/show-more-button';
import { SortSelect } from '#/components/sort-select';
import { Spinner } from '#/components/spinner';
import { Toolbar } from '#/components/toolbar';
import { useBlogQuery } from '#/hooks/use-blogs';
import { useBlogPostsQuery } from '#/hooks/use-posts';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { POST_SORT_OPTIONS, type PostSortPresetKey } from '#/utils/sorting';

import styles from './blog-page.module.css';

export const BlogPage = () => {
    const { blogId } = useParams<{ blogId: string }>();

    // Sorting is local to this page: the posts page keeps its own selection in the store
    const [sort, setSort] = useState<PostSortPresetKey>('newest');

    const {
        data: blog,
        isPending: isBlogPending,
        isError: isBlogError,
        error: blogError,
    } = useBlogQuery(blogId);

    const {
        data: postsData,
        isPending: arePostsPending,
        isError: arePostsError,
        error: postsError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useBlogPostsQuery(blogId, sort);

    const posts = postsData?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className={styles.page}>
            <Breadcrumbs
                items={[
                    { label: 'Blogs', to: APPLICATION_ROUTES.blogs },
                    { label: blog?.name ?? 'Blog' },
                ]}
            />

            <div className={styles.back}>
                <BackLink to={APPLICATION_ROUTES.blogs}>Back to blogs</BackLink>
            </div>

            {isBlogPending ? <Spinner /> : null}

            {isBlogError ? (
                <p className={styles.error} role='alert'>
                    Failed to load the blog: {blogError.message}
                </p>
            ) : null}

            {blog ? (
                <>
                    <BlogHero />
                    <BlogSummary blog={blog} />
                </>
            ) : null}

            {blog ? (
                <section className={styles.posts}>
                    <Toolbar
                        trailing={
                            <SortSelect
                                value={sort}
                                options={POST_SORT_OPTIONS}
                                onChange={setSort}
                                label='Posts sorting'
                            />
                        }
                    />

                    {arePostsPending ? <Spinner /> : null}

                    {arePostsError ? (
                        <p className={styles.error} role='alert'>
                            Failed to load posts: {postsError.message}
                        </p>
                    ) : null}

                    {postsData && posts.length === 0 ? (
                        <p className={styles.empty}>This blog has no posts yet</p>
                    ) : null}

                    {posts.length > 0 ? (
                        <div className={styles.grid}>
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} variant='compact' />
                            ))}
                        </div>
                    ) : null}

                    {hasNextPage ? (
                        <ShowMoreButton
                            onClick={() => void fetchNextPage()}
                            isLoading={isFetchingNextPage}
                        />
                    ) : null}
                </section>
            ) : null}
        </div>
    );
};
