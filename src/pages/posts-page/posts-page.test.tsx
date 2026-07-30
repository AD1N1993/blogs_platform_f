import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '#/mocks/server';
import { renderWithProviders, screen, userEvent, waitFor } from '#/test/test-utils';
import { APP_CONFIG } from '#/utils/constants';

import { PostsPage } from './posts-page';

describe('PostsPage', () => {
    it('показывает первую страницу статей', async () => {
        renderWithProviders(<PostsPage />);

        expect(await screen.findByText('Как мы собрали стартер на Vite')).toBeInTheDocument();
        expect(screen.getByText('CSS-модули против utility-first')).toBeInTheDocument();
        // the third post lives on page 2 (DEFAULT_PAGE_SIZE = 2)
        expect(screen.queryByText('TanStack Query и Redux Toolkit вместе')).not.toBeInTheDocument();
    });

    it('переходит на следующую страницу', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText('Как мы собрали стартер на Vite');

        await user.click(screen.getByRole('button', { name: 'Вперёд' }));

        expect(
            await screen.findByText('TanStack Query и Redux Toolkit вместе'),
        ).toBeInTheDocument();
        expect(screen.getByText('Страница 2 из 2')).toBeInTheDocument();
    });

    it('фильтрует статьи по поисковому запросу', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText('Как мы собрали стартер на Vite');

        await user.type(screen.getByLabelText('Поиск по статьям'), 'CSS');

        await waitFor(() => {
            expect(screen.getByText('CSS-модули против utility-first')).toBeInTheDocument();
            expect(screen.queryByText('Как мы собрали стартер на Vite')).not.toBeInTheDocument();
        });
    });

    it('фильтрует статьи по клику на тег', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText('Как мы собрали стартер на Vite');

        await user.click(screen.getByRole('button', { name: 'vite' }));

        expect(await screen.findByRole('button', { name: 'Тег: vite ×' })).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.queryByText('CSS-модули против utility-first')).not.toBeInTheDocument(),
        );
    });

    it('сбрасывает фильтры', async () => {
        const user = userEvent.setup();

        renderWithProviders(<PostsPage />);
        await screen.findByText('Как мы собрали стартер на Vite');

        await user.click(screen.getByRole('button', { name: 'vite' }));
        await screen.findByRole('button', { name: 'Тег: vite ×' });

        await user.click(screen.getByRole('button', { name: 'Сбросить фильтры' }));

        expect(await screen.findByText('CSS-модули против utility-first')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Тег: vite ×' })).not.toBeInTheDocument();
    });

    it('показывает сообщение об ошибке, если запрос упал', async () => {
        server.use(
            http.get(`${APP_CONFIG.apiUrl}/posts`, () =>
                HttpResponse.json({ message: 'Сервис недоступен' }, { status: 500 }),
            ),
        );

        renderWithProviders(<PostsPage />);

        expect(await screen.findByRole('alert')).toHaveTextContent('Сервис недоступен');
    });
});
