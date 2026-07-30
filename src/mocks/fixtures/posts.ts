import type { Post } from '#/types/post';

const CONTENT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const POSTS_FIXTURE: Post[] = [
    {
        id: '66efeaadeb3dafea3c397201',
        title: "Let's fly into space",
        shortDescription: 'A short trip beyond the atmosphere',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397101',
        blogName: 'The best blog',
        createdAt: '2022-12-12T10:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397202',
        title: "I'm sitting at work",
        shortDescription: 'Notes from an open space',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397105',
        blogName: 'IT industry',
        createdAt: '2022-12-12T09:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397203',
        title: 'I sell cosmetics',
        shortDescription: 'How the beauty market works',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397106',
        blogName: 'Blog of beauties',
        createdAt: '2022-12-12T08:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397204',
        title: "I'm happy like a child",
        shortDescription: 'Small things that matter',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397101',
        blogName: 'The best blog',
        createdAt: '2022-12-12T07:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397205',
        title: 'Cooking buns',
        shortDescription: 'A recipe that never fails',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397105',
        blogName: 'IT industry',
        createdAt: '2022-12-12T06:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397206',
        title: 'First day at the office',
        shortDescription: 'What nobody tells you',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397106',
        blogName: 'Blog of beauties',
        createdAt: '2022-12-12T05:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397207',
        title: 'Weekend in the mountains',
        shortDescription: 'Two days without wifi',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397107',
        blogName: 'Space and beyond',
        createdAt: '2022-12-11T10:00:00.000Z',
    },
    {
        id: '66efeaadeb3dafea3c397208',
        title: 'How we build interfaces',
        shortDescription: 'A pragmatic take on frontend',
        content: CONTENT,
        blogId: '66efeaadeb3dafea3c397105',
        blogName: 'IT industry',
        createdAt: '2022-12-11T09:00:00.000Z',
    },
];
