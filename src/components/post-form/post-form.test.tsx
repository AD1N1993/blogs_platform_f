import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen, userEvent } from '#/test/test-utils';

import { PostForm } from './post-form';

describe('PostForm', () => {
    it('показывает ошибки валидации и не отправляет форму', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<PostForm />);

        await user.type(screen.getByLabelText('Заголовок'), 'Тест');
        await user.click(screen.getByRole('button', { name: 'Опубликовать' }));

        expect(await screen.findByText('Минимум 5 символов')).toBeInTheDocument();
        expect(store.getState().notifications.items).toHaveLength(0);
    });

    it('публикует статью и показывает уведомление', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<PostForm />);

        await user.type(screen.getByLabelText('Заголовок'), 'Новая статья про тесты');
        await user.type(screen.getByLabelText('Краткое описание'), 'Короткое описание статьи');
        await user.type(
            screen.getByLabelText('Текст'),
            'Достаточно длинный текст статьи для валидации формы.',
        );
        await user.type(screen.getByLabelText('Теги через запятую'), 'tests, msw');

        await user.click(screen.getByRole('button', { name: 'Опубликовать' }));

        await expect
            .poll(() => store.getState().notifications.items)
            .toEqual([
                expect.objectContaining({ title: 'Статья опубликована', badge: 'positive' }),
            ]);
    });
});
