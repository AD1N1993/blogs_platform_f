import { HttpResponse, http } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { server } from '#/mocks/server';
import { renderWithProviders, screen, userEvent, waitFor, within } from '#/test/test-utils';
import { APP_CONFIG, APPLICATION_ROUTES } from '#/utils/constants';

import { BlogPage } from './blog-page';

const BLOG_ID = '66efeaadeb3dafea3c397101';

const renderBlogPage = (blogId = BLOG_ID) =>
    renderWithProviders(
        <Routes>
            <Route path={APPLICATION_ROUTES.blog} element={<BlogPage />} />
        </Routes>,
        { route: `${APPLICATION_ROUTES.blogs}/${blogId}` },
    );

describe('BlogPage', () => {
    it('renders the blog summary for the id in the URL', async () => {
        renderBlogPage();

        expect(await screen.findByRole('heading', { name: 'The best blog' })).toBeInTheDocument();
        expect(screen.getByText('Blog creation date:')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'https://www.youtube.com/' })).toBeInTheDocument();
    });

    it('shows the blog name as the current breadcrumb', async () => {
        renderBlogPage();

        await screen.findByRole('heading', { name: 'The best blog' });

        const breadcrumbs = screen.getByRole('navigation', { name: 'Breadcrumb' });

        expect(within(breadcrumbs).getByRole('link', { name: 'Blogs' })).toHaveAttribute(
            'href',
            APPLICATION_ROUTES.blogs,
        );
        expect(within(breadcrumbs).getByText('The best blog')).toBeInTheDocument();
    });

    it('lists only the posts that belong to this blog', async () => {
        renderBlogPage();

        expect(await screen.findByText("Let's fly into space")).toBeInTheDocument();
        expect(screen.getByText("I'm happy like a child")).toBeInTheDocument();
        // belongs to another blog
        expect(screen.queryByText('Cooking buns')).not.toBeInTheDocument();
    });

    it('reorders posts when the sorting changes', async () => {
        const user = userEvent.setup();

        renderBlogPage();
        await screen.findByText("Let's fly into space");

        const titlesInOrder = () =>
            screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

        // newest first by default: "Let's fly into space" is the more recent of the two
        expect(titlesInOrder()).toEqual(["Let's fly into space", "I'm happy like a child"]);

        await user.selectOptions(screen.getByLabelText('Posts sorting'), 'title');

        await waitFor(() =>
            expect(titlesInOrder()).toEqual(["I'm happy like a child", "Let's fly into space"]),
        );
    });

    it('reports a blog that does not exist', async () => {
        renderBlogPage('66efeaadeb3dafea3c3979999');

        expect(await screen.findByRole('alert')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'The best blog' })).not.toBeInTheDocument();
    });

    it('shows an error message when the blog request fails', async () => {
        server.use(
            http.get(`${APP_CONFIG.apiUrl}/blogs/:blogId`, () =>
                HttpResponse.json({ message: 'Service unavailable' }, { status: 500 }),
            ),
        );

        renderBlogPage();

        expect(await screen.findByRole('alert')).toHaveTextContent('Service unavailable');
    });
});
