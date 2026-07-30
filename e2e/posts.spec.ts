import { expect, test } from '@playwright/test';

test.describe('Список статей', () => {
    test('открывается и показывает статьи', async ({ page }) => {
        await page.goto('/posts');

        await expect(page.getByRole('heading', { name: 'Статьи', level: 1 })).toBeVisible();
        await expect(
            page.getByRole('link', { name: 'Как мы собрали стартер на Vite' }),
        ).toBeVisible();
    });

    test('переход в статью и обратно', async ({ page }) => {
        await page.goto('/posts');

        await page.getByRole('link', { name: 'Как мы собрали стартер на Vite' }).click();

        await expect(
            page.getByRole('heading', { name: 'Как мы собрали стартер на Vite', level: 1 }),
        ).toBeVisible();

        await page.getByRole('link', { name: '← К списку статей' }).click();

        await expect(page.getByRole('heading', { name: 'Статьи', level: 1 })).toBeVisible();
    });

    test('поиск фильтрует список', async ({ page }) => {
        await page.goto('/posts');

        await page.getByLabel('Поиск по статьям').fill('CSS');

        await expect(
            page.getByRole('link', { name: 'CSS-модули против utility-first' }),
        ).toBeVisible();
        await expect(
            page.getByRole('link', { name: 'Как мы собрали стартер на Vite' }),
        ).toBeHidden();
    });

    test('пагинация листает страницы', async ({ page }) => {
        await page.goto('/posts');

        await expect(page.getByText('Страница 1 из 2')).toBeVisible();

        await page.getByRole('button', { name: 'Вперёд' }).click();

        await expect(
            page.getByRole('link', { name: 'TanStack Query и Redux Toolkit вместе' }),
        ).toBeVisible();
        await expect(page.getByText('Страница 2 из 2')).toBeVisible();
    });

    test('публикация статьи через форму', async ({ page }) => {
        await page.goto('/posts');

        await page.getByLabel('Заголовок').fill('Статья из e2e-теста');
        await page.getByLabel('Краткое описание').fill('Описание статьи из e2e-теста');
        await page.getByLabel('Текст').fill('Достаточно длинный текст статьи для валидации формы.');
        await page.getByLabel('Теги через запятую').fill('e2e, playwright');

        await page.getByRole('button', { name: 'Опубликовать' }).click();

        await expect(page.getByText('Статья опубликована')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Статья из e2e-теста' })).toBeVisible();
    });

    test('неизвестный маршрут ведёт на 404', async ({ page }) => {
        await page.goto('/unknown-route');

        await expect(page.getByRole('heading', { name: 'Страница не найдена' })).toBeVisible();
    });
});
