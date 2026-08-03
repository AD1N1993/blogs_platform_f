import type { Comment } from '#/types/comment';

export type MockComment = Comment & { postId: string };

const STORAGE_KEY = 'msw:comments';

const SEED_COMMENTS: MockComment[] = Array.from({ length: 18 }, (_, index) => ({
    id: `66efeaadeb3dafea3c3973${String(index).padStart(2, '0')}`,
    postId: '66efeaadeb3dafea3c397201',
    content:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit, magna felis vestibulum metus aptent velit, tempor posuere natoque habitasse phasellus dignissim.',
    commentatorInfo: {
        userId: '66efeaadeb3dafea3c397901',
        userLogin: 'IvanYakimenko',
    },
    createdAt: new Date(2021, 0, 1, 10, 0, 0, index).toISOString(),
}));

const readAll = (): MockComment[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) return JSON.parse(raw) as MockComment[];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_COMMENTS));

        return SEED_COMMENTS;
    } catch {
        return SEED_COMMENTS;
    }
};

const writeAll = (comments: MockComment[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};

export const commentsStore = {
    findByPostId: (postId: string): MockComment[] =>
        readAll().filter((comment) => comment.postId === postId),

    findById: (commentId: string): MockComment | undefined =>
        readAll().find((comment) => comment.id === commentId),

    add: (comment: MockComment): void => {
        writeAll([comment, ...readAll()]);
    },

    update: (commentId: string, content: string): void => {
        writeAll(
            readAll().map((comment) =>
                comment.id === commentId ? { ...comment, content } : comment,
            ),
        );
    },

    remove: (commentId: string): void => {
        writeAll(readAll().filter((comment) => comment.id !== commentId));
    },
};
