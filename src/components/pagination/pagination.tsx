import cn from 'classnames';

import { ChevronDownIcon, ChevronRightIcon } from '#/components/icons';

import { buildPageList, ELLIPSIS } from './build-page-list';
import styles from './pagination.module.css';

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

type PaginationProps = {
    page: number;
    pagesCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
};

export const Pagination = ({
    page,
    pagesCount,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) => {
    const pageList = buildPageList(page, pagesCount);

    return (
        <div className={styles.wrapper}>
            <button
                type='button'
                className={styles.arrow}
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                aria-label='Previous page'
            >
                <ChevronRightIcon className={styles.arrowIconLeft} />
            </button>

            {pageList.map((item, index) =>
                item === ELLIPSIS ? (
                    <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                        {ELLIPSIS}
                    </span>
                ) : (
                    <button
                        key={item}
                        type='button'
                        className={cn(styles.page, { [styles.active]: item === page })}
                        onClick={() => onPageChange(item)}
                        aria-current={item === page ? 'page' : undefined}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type='button'
                className={styles.arrow}
                onClick={() => onPageChange(page + 1)}
                disabled={page >= pagesCount}
                aria-label='Next page'
            >
                <ChevronRightIcon />
            </button>

            <div className={styles.pageSize}>
                <span>Show</span>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.select}
                        aria-label='Users per page'
                        value={pageSize}
                        onChange={(event) => onPageSizeChange(Number(event.target.value))}
                    >
                        {PAGE_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className={styles.selectIcon} />
                </div>
            </div>
        </div>
    );
};
