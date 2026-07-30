import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '#/mocks/server';
import { renderWithProviders, screen, userEvent, waitFor } from '#/test/test-utils';
import { APP_CONFIG } from '#/utils/constants';

import { BlogsPage } from './blogs-page';

describe('BlogsPage', () => {
    it('renders the first page of blogs', async () => {
        renderWithProviders(<BlogsPage />);

        expect(await screen.findByText('The best blog in our village')).toBeInTheDocument();
        expect(screen.getByText('Warriors')).toBeInTheDocument();
        // 7 fixtures, DEFAULT_PAGE_SIZE = 5, so the oldest blog is on page 2
        expect(screen.queryByText('Space and beyond')).not.toBeInTheDocument();
    });

    it('appends the next page instead of replacing the list', async () => {
        const user = userEvent.setup();

        renderWithProviders(<BlogsPage />);
        await screen.findByText('The best blog in our village');

        await user.click(screen.getByRole('button', { name: /show more/i }));

        expect(await screen.findByText('Space and beyond')).toBeInTheDocument();
        // the first page stays visible — this is "load more", not pagination
        expect(screen.getByText('The best blog in our village')).toBeInTheDocument();
    });

    it('hides the show more button once everything is loaded', async () => {
        const user = userEvent.setup();

        renderWithProviders(<BlogsPage />);
        await screen.findByText('The best blog in our village');

        await user.click(screen.getByRole('button', { name: /show more/i }));
        await screen.findByText('Space and beyond');

        await waitFor(() =>
            expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument(),
        );
    });

    it('filters blogs by search query', async () => {
        const user = userEvent.setup();

        renderWithProviders(<BlogsPage />);
        await screen.findByText('The best blog in our village');

        await user.type(screen.getByLabelText('Search'), 'Warriors');

        await waitFor(() => {
            expect(screen.getByText('Warriors')).toBeInTheDocument();
            expect(screen.queryByText('The best blog in our village')).not.toBeInTheDocument();
        });
    });

    it('reorders blogs when the sorting changes', async () => {
        const user = userEvent.setup();

        renderWithProviders(<BlogsPage />);
        await screen.findByText('The best blog in our village');

        await user.selectOptions(screen.getByLabelText('Blogs sorting'), 'oldest');

        expect(await screen.findByText('Space and beyond')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        server.use(
            http.get(`${APP_CONFIG.apiUrl}/blogs`, () =>
                HttpResponse.json({ message: 'Service unavailable' }, { status: 500 }),
            ),
        );

        renderWithProviders(<BlogsPage />);

        expect(await screen.findByRole('alert')).toHaveTextContent('Service unavailable');
    });
});
