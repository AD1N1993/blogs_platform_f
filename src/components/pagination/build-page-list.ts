export const ELLIPSIS = '…' as const;

export type PageListItem = number | typeof ELLIPSIS;

/** Always shows first/last, current ± 1, and collapses the rest behind an ellipsis. */
export const buildPageList = (page: number, pagesCount: number): PageListItem[] => {
    if (pagesCount <= 1) return [1];

    const pages = new Set<number>([1, pagesCount, page - 1, page, page + 1]);
    const sorted = [...pages]
        .filter((value) => value >= 1 && value <= pagesCount)
        .sort((a, b) => a - b);

    const result: PageListItem[] = [];
    sorted.forEach((value, index) => {
        if (index > 0 && value - sorted[index - 1] > 1) {
            result.push(ELLIPSIS);
        }
        result.push(value);
    });

    return result;
};
