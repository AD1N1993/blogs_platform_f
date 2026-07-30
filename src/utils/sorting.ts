import type { BlogSortField, SortDirection } from '#/types/blog';
import type { PostSortField } from '#/types/post';

/**
 * The API splits ordering into sortBy + sortDirection, while the design shows a single
 * dropdown ("New blogs first"). These presets bridge the two: the select stores a preset
 * key, and the filter slice keeps the pair the API expects.
 */
type SortPreset<TField> = {
    label: string;
    sortBy: TField;
    sortDirection: SortDirection;
};

export const BLOG_SORT_PRESETS = {
    newest: { label: 'New blogs first', sortBy: 'createdAt', sortDirection: 'desc' },
    oldest: { label: 'Old blogs first', sortBy: 'createdAt', sortDirection: 'asc' },
    name: { label: 'By name', sortBy: 'name', sortDirection: 'asc' },
} as const satisfies Record<string, SortPreset<BlogSortField>>;

export const POST_SORT_PRESETS = {
    newest: { label: 'New posts first', sortBy: 'createdAt', sortDirection: 'desc' },
    oldest: { label: 'Old posts first', sortBy: 'createdAt', sortDirection: 'asc' },
    title: { label: 'By title', sortBy: 'title', sortDirection: 'asc' },
} as const satisfies Record<string, SortPreset<PostSortField>>;

export type BlogSortPresetKey = keyof typeof BLOG_SORT_PRESETS;
export type PostSortPresetKey = keyof typeof POST_SORT_PRESETS;

const toOptions = <TKey extends string>(presets: Record<TKey, { label: string }>) =>
    (Object.entries(presets) as [TKey, { label: string }][]).map(([value, { label }]) => ({
        value,
        label,
    }));

export const BLOG_SORT_OPTIONS = toOptions(BLOG_SORT_PRESETS);
export const POST_SORT_OPTIONS = toOptions(POST_SORT_PRESETS);
