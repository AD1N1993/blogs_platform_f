import { useEffect, useState } from 'react';

import { BlogCard } from '#/components/blog-card';
import { PageHeader } from '#/components/page-header';
import { SearchInput } from '#/components/search-input';
import { ShowMoreButton } from '#/components/show-more-button';
import { SortSelect } from '#/components/sort-select';
import { Spinner } from '#/components/spinner';
import { Toolbar } from '#/components/toolbar';
import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { useBlogsQuery } from '#/hooks/use-blogs';
import { useDebounce } from '#/hooks/use-debounce';
import { BLOG_SORT_OPTIONS } from '#/utils/sorting';
import { blogsFilterSelectors } from '#selectors';
import { setBlogsSearch, setBlogsSort } from '#slices/blogs-filter-slice';

import styles from './blogs-page.module.css';

export const BlogsPage = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(blogsFilterSelectors.filter);

    const [searchInput, setSearchInput] = useState(filter.searchNameTerm);
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        dispatch(setBlogsSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useBlogsQuery(filter);

    const blogs = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className={styles.page}>
            <PageHeader title='Blogs' />

            <Toolbar
                trailing={
                    <SortSelect
                        value={filter.sort}
                        options={BLOG_SORT_OPTIONS}
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
