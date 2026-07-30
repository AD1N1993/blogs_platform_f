export type PostAuthor = {
    id: string;
    name: string;
};

export type Post = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: PostAuthor;
    tags: string[];
    publishedAt: string;
};

export type PostsPage = {
    content: Post[];
    page: number;
    size: number;
    count: number;
};

export type PostsFilter = {
    search?: string;
    tag?: string;
    page?: number;
    size?: number;
};

export type PostCreatePayload = {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
};
