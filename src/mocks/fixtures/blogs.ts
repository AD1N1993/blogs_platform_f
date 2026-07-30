import type { Blog } from '#/types/blog';

const DESCRIPTION =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';

export const BLOGS_FIXTURE: Blog[] = [
    {
        id: '1',
        name: 'The best blog in our village',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-28T10:00:00.000Z',
    },
    {
        id: '2',
        name: 'Warriors',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-26T10:00:00.000Z',
    },
    {
        id: '3',
        name: 'Audience Platform',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-24T10:00:00.000Z',
    },
    {
        id: '4',
        name: 'Cooking stories',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-22T10:00:00.000Z',
    },
    {
        id: '5',
        name: 'IT industry weekly',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-20T10:00:00.000Z',
    },
    {
        id: '6',
        name: 'Blog of beauties',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-18T10:00:00.000Z',
    },
    {
        id: '7',
        name: 'Space and beyond',
        websiteUrl: 'https://www.youtube.com/',
        description: DESCRIPTION,
        imageUrl: null,
        createdAt: '2026-07-16T10:00:00.000Z',
    },
];
