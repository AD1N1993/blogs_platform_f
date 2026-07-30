import { expect, test } from '@playwright/test';

test.describe('Blogs', () => {
    test('renders the header, sidebar and blog list', async ({ page }) => {
        await page.goto('/blogs');

        await expect(page.getByRole('heading', { name: 'Blogger Platform' })).toBeVisible();
        await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Blogs', level: 2 })).toBeVisible();
        await expect(page.getByText('The best blog in our village')).toBeVisible();
    });

    test('root redirects to blogs', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveURL(/\/blogs$/);
    });

    test('search filters the list', async ({ page }) => {
        await page.goto('/blogs');
        await expect(page.getByText('The best blog in our village')).toBeVisible();

        await page.getByLabel('Search').fill('Warriors');

        await expect(page.getByText('Warriors')).toBeVisible();
        await expect(page.getByText('The best blog in our village')).toBeHidden();
    });

    test('show more appends blogs to the same list', async ({ page }) => {
        await page.goto('/blogs');
        await expect(page.getByText('The best blog in our village')).toBeVisible();

        await page.getByRole('button', { name: /show more/i }).click();

        await expect(page.getByText('Space and beyond')).toBeVisible();
        await expect(page.getByText('The best blog in our village')).toBeVisible();
        await expect(page.getByRole('button', { name: /show more/i })).toBeHidden();
    });

    test('navigates to posts through the sidebar', async ({ page }) => {
        await page.goto('/blogs');

        await page.getByRole('link', { name: 'Posts' }).click();

        await expect(page).toHaveURL(/\/posts$/);
        await expect(page.getByRole('heading', { name: 'Posts', level: 2 })).toBeVisible();
        await expect(page.getByText("Let's fly into space")).toBeVisible();
    });

    test('unknown route renders the 404 page', async ({ page }) => {
        await page.goto('/unknown-route');

        await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    });
});
