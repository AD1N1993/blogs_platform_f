export type Post = {
    id: string;
    title: string;
    blogId: string;
    blogName: string;
    imageUrl: string | null;
    createdAt: string;
};

export type PostsSort = 'newest' | 'oldest' | 'title';

export type PostsFilter = {
    search?: string;
    sort?: PostsSort;
    page?: number;
    size?: number;
};
