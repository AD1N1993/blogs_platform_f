export type Blog = {
    id: string;
    name: string;
    websiteUrl: string;
    description: string;
    imageUrl: string | null;
    createdAt: string;
};

export type BlogsSort = 'newest' | 'oldest' | 'name';

export type BlogsFilter = {
    search?: string;
    sort?: BlogsSort;
    page?: number;
    size?: number;
};

export type Paginated<T> = {
    content: T[];
    page: number;
    size: number;
    count: number;
};
