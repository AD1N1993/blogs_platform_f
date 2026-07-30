import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen, userEvent, waitFor } from '#/test/test-utils';

import { PostsPage } from './posts-page';

describe('PostsPage', () => {
    it('renders the first page of posts as a grid', async () => {
        renderWithProviders(<PostsPage />);

        expect(await screen.findByText("Let's fly into space")).toBeInTheDocument();
        expect(screen.getByText('First day at the office')).toBeInTheDocument();
        // 8 fixtures, POSTS_PAGE_SIZE = 6
        expect(screen.queryByText('Weekend in the mountains')).not.toBeInTheDocument();
    });

    it('appends the next page of posts', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText("Let's fly into space");

        await user.click(screen.getByRole('button', { name: /show more/i }));

        expect(await screen.findByText('Weekend in the mountains')).toBeInTheDocument();
        expect(screen.getByText("Let's fly into space")).toBeInTheDocument();
    });

    it('reorders posts when the sorting changes', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText("Let's fly into space");

        await user.selectOptions(screen.getByLabelText('Posts sorting'), 'title');

        await waitFor(() => expect(screen.getByText('Cooking buns')).toBeInTheDocument());
    });
});
