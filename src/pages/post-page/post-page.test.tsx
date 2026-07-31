import { HttpResponse, http } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { server } from '#/mocks/server';
import { renderWithProviders, screen, within } from '#/test/test-utils';
import { APP_CONFIG, APPLICATION_ROUTES } from '#/utils/constants';
import { formatDateTime } from '#/utils/date.utils';

import { PostPage } from './post-page';

const POST_ID = '66efeaadeb3dafea3c397201';

const renderPostPage = (postId = POST_ID) =>
    renderWithProviders(
        <Routes>
            <Route path={APPLICATION_ROUTES.post} element={<PostPage />} />
        </Routes>,
        { route: `${APPLICATION_ROUTES.posts}/${postId}` },
    );

describe('PostPage', () => {
    it('renders the post for the id in the URL', async () => {
        renderPostPage();

        expect(
            await screen.findByRole('heading', { name: /Let's fly into space/ }),
        ).toBeInTheDocument();
        // formatDateTime, not formatDate — the design shows the time too. The expected value
        // comes from the formatter because it renders in the runner's local timezone.
        expect(screen.getByText(formatDateTime('2022-12-12T10:00:00.000Z'))).toBeInTheDocument();
    });

    it('links the blog name to its blog page', async () => {
        renderPostPage();

        const blogLink = await screen.findByRole('link', { name: 'The best blog' });

        expect(blogLink).toHaveAttribute('href', '/blogs/66efeaadeb3dafea3c397101');
    });

    it('shows the blog name as the current breadcrumb', async () => {
        renderPostPage();

        await screen.findByRole('heading', { name: /Let's fly into space/ });

        const breadcrumbs = screen.getByRole('navigation', { name: 'Breadcrumb' });

        expect(within(breadcrumbs).getByRole('link', { name: 'Posts' })).toHaveAttribute(
            'href',
            APPLICATION_ROUTES.posts,
        );
        expect(within(breadcrumbs).getByText('The best blog')).toBeInTheDocument();
    });

    it('splits the content into paragraphs on blank lines', async () => {
        renderPostPage();

        await screen.findByRole('heading', { name: /Let's fly into space/ });

        // the fixture content holds three blank-line separated blocks
        expect(screen.getAllByText(/Lorem ipsum|Nec libero/)).toHaveLength(3);
    });

    it('reports a post that does not exist', async () => {
        renderPostPage('66efeaadeb3dafea3c3979999');

        expect(await screen.findByRole('alert')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        server.use(
            http.get(`${APP_CONFIG.apiUrl}/posts/:postId`, () =>
                HttpResponse.json({ message: 'Service unavailable' }, { status: 500 }),
            ),
        );

        renderPostPage();

        expect(await screen.findByRole('alert')).toHaveTextContent('Service unavailable');
    });
});
