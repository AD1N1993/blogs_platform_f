import { useEffect, useState } from 'react';

import { BlogCard } from '#/components/blog-card';
import { PageHeader } from '#/components/page-header';
import { SearchInput } from '#/components/search-input';
import { ShowMoreButton } from '#/components/show-more-button';
import { SortSelect, type SortOption } from '#/components/sort-select';
import { Spinner } from '#/components/spinner';
import { Toolbar } from '#/components/toolbar';
import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { useBlogsQuery } from '#/hooks/use-blogs';
import { useDebounce } from '#/hooks/use-debounce';
import type { BlogsSort } from '#/types/blog';
import { blogsFilterSelectors } from '#selectors';
import { setBlogsSearch, setBlogsSort } from '#slices/blogs-filter-slice';

import styles from './blogs-page.module.css';

const SORT_OPTIONS: SortOption<BlogsSort>[] = [
    { value: 'newest', label: 'New blogs first' },
    { value: 'oldest', label: 'Old blogs first' },
    { value: 'name', label: 'By name' },
];

export const BlogsPage = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(blogsFilterSelectors.filter);

    const [searchInput, setSearchInput] = useState(filter.search ?? '');
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        dispatch(setBlogsSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useBlogsQuery(filter);

    const blogs = data?.pages.flatMap((page) => page.content) ?? [];

    return (
        <div className={styles.page}>
            <PageHeader title='Blogs' />

            <Toolbar
                trailing={
                    <SortSelect
                        value={filter.sort ?? 'newest'}
                        options={SORT_OPTIONS}
                        onChange={(sort) => dispatch(setBlogsSort(sort))}
                        label='Blogs sorting'
                    />
                }
            >
                <SearchInput value={searchInput} onChange={setSearchInput} />
            </Toolbar>

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Failed to load blogs: {error.message}
                </p>
            ) : null}

            {data && blogs.length === 0 ? <p className={styles.empty}>Nothing found</p> : null}

            {blogs.length > 0 ? (
                <div className={styles.list}>
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
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
