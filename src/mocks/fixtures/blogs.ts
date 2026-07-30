import type { Blog } from '#/types/blog';

const DESCRIPTION =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';

export const BLOGS_FIXTURE: Blog[] = [
    {
        id: '66efeaadeb3dafea3c397101',
        name: 'The best blog',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-28T10:00:00.000Z',
        isMembership: false,
    },
    {
        id: '66efeaadeb3dafea3c397102',
        name: 'Warriors',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-26T10:00:00.000Z',
        isMembership: false,
    },
    {
        id: '66efeaadeb3dafea3c397103',
        name: 'Audience Platform',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-24T10:00:00.000Z',
        isMembership: true,
    },
    {
        id: '66efeaadeb3dafea3c397104',
        name: 'Cooking stories',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-22T10:00:00.000Z',
        isMembership: false,
    },
    {
        id: '66efeaadeb3dafea3c397105',
        name: 'IT industry',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-20T10:00:00.000Z',
        isMembership: false,
    },
    {
        id: '66efeaadeb3dafea3c397106',
        name: 'Blog of beauties',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-18T10:00:00.000Z',
        isMembership: false,
    },
    {
        id: '66efeaadeb3dafea3c397107',
        name: 'Space and beyond',
        description: DESCRIPTION,
        websiteUrl: 'https://www.youtube.com/',
        createdAt: '2026-07-16T10:00:00.000Z',
        isMembership: false,
    },
];
