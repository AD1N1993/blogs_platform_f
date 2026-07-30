import { PageHeader } from '#/components/page-header';
import { PostCard } from '#/components/post-card';
import { ShowMoreButton } from '#/components/show-more-button';
import { SortSelect } from '#/components/sort-select';
import { Spinner } from '#/components/spinner';
import { Toolbar } from '#/components/toolbar';
import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { usePostsQuery } from '#/hooks/use-posts';
import { POST_SORT_OPTIONS } from '#/utils/sorting';
import { postsFilterSelectors } from '#selectors';
import { setPostsSort } from '#slices/posts-filter-slice';

import styles from './posts-page.module.css';

export const PostsPage = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(postsFilterSelectors.filter);

    const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        usePostsQuery(filter);

    const posts = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className={styles.page}>
            <PageHeader title='Posts' />

            <Toolbar
                trailing={
                    <SortSelect
                        value={filter.sort}
                        options={POST_SORT_OPTIONS}
                        onChange={(sort) => dispatch(setPostsSort(sort))}
                        label='Posts sorting'
                    />
                }
            />

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Failed to load posts: {error.message}
                </p>
            ) : null}

            {data && posts.length === 0 ? <p className={styles.empty}>Nothing found</p> : null}

            {posts.length > 0 ? (
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : null}

            {hasNextPage ? (
                <ShowMoreButton
                    onClick={() => void fetchNextPage()}
                    isLoading={isFetchingNextPage}
                />
            ) : null}
        </div>
    );
};
