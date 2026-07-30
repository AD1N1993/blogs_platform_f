import { PageHeader } from '#/components/page-header';
import { PostCard } from '#/components/post-card';
import { ShowMoreButton } from '#/components/show-more-button';
import { SortSelect, type SortOption } from '#/components/sort-select';
import { Spinner } from '#/components/spinner';
import { Toolbar } from '#/components/toolbar';
import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { usePostsQuery } from '#/hooks/use-posts';
import type { PostsSort } from '#/types/post';
import { postsFilterSelectors } from '#selectors';
import { setPostsSort } from '#slices/posts-filter-slice';

import styles from './posts-page.module.css';

const SORT_OPTIONS: SortOption<PostsSort>[] = [
    { value: 'newest', label: 'New posts first' },
    { value: 'oldest', label: 'Old posts first' },
    { value: 'title', label: 'By title' },
];

export const PostsPage = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(postsFilterSelectors.filter);

    const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        usePostsQuery(filter);

    const posts = data?.pages.flatMap((page) => page.content) ?? [];

    return (
        <div className={styles.page}>
            <PageHeader title='Posts' />

            <Toolbar
                trailing={
                    <SortSelect
                        value={filter.sort ?? 'newest'}
                        options={SORT_OPTIONS}
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
