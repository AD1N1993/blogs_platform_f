import { useEffect, useState } from 'react';

import { PostCard } from '#/components/post-card';
import { PostForm } from '#/components/post-form';
import { Spinner } from '#/components/spinner';
import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { useDebounce } from '#/hooks/use-debounce';
import { usePostsQuery } from '#/hooks/use-posts';
import { postsFilterSelectors } from '#selectors';
import { resetFilter, setPage, setSearch, setTag } from '#slices/posts-filter-slice';

import styles from './posts-page.module.css';

export const PostsPage = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(postsFilterSelectors.filter);

    const [searchInput, setSearchInput] = useState(filter.search ?? '');
    const debouncedSearch = useDebounce(searchInput);

    useEffect(() => {
        dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    const { data, isPending, isError, error } = usePostsQuery(filter);

    const page = filter.page ?? 1;
    const size = filter.size ?? 1;
    const totalPages = data ? Math.max(1, Math.ceil(data.count / size)) : 1;

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Статьи</h1>

            <div className={styles.controls}>
                <input
                    type='search'
                    className={styles.search}
                    placeholder='Поиск по статьям'
                    aria-label='Поиск по статьям'
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                />

                {filter.tag ? (
                    <button
                        type='button'
                        className={styles.tagFilter}
                        onClick={() => dispatch(setTag(undefined))}
                    >
                        Тег: {filter.tag} ×
                    </button>
                ) : null}

                {filter.tag || searchInput ? (
                    <button
                        type='button'
                        className={styles.reset}
                        onClick={() => {
                            setSearchInput('');
                            dispatch(resetFilter());
                        }}
                    >
                        Сбросить фильтры
                    </button>
                ) : null}
            </div>

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Не удалось загрузить статьи: {error.message}
                </p>
            ) : null}

            {data && data.content.length === 0 ? (
                <p className={styles.empty}>Ничего не найдено</p>
            ) : null}

            {data && data.content.length > 0 ? (
                <div className={styles.list}>
                    {data.content.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onTagClick={(tag) => dispatch(setTag(tag))}
                        />
                    ))}
                </div>
            ) : null}

            {data && totalPages > 1 ? (
                <nav className={styles.pagination} aria-label='Постраничная навигация'>
                    <button
                        type='button'
                        className={styles.pageButton}
                        disabled={page <= 1}
                        onClick={() => dispatch(setPage(page - 1))}
                    >
                        Назад
                    </button>
                    <span className={styles.pageInfo}>
                        Страница {page} из {totalPages}
                    </span>
                    <button
                        type='button'
                        className={styles.pageButton}
                        disabled={page >= totalPages}
                        onClick={() => dispatch(setPage(page + 1))}
                    >
                        Вперёд
                    </button>
                </nav>
            ) : null}

            <PostForm />
        </div>
    );
};
