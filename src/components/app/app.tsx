import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '#/components/app-layout';
import { Spinner } from '#/components/spinner';
import { APPLICATION_ROUTES } from '#/utils/constants';

const BlogsPage = lazy(() =>
    import('#/pages/blogs-page').then((module) => ({ default: module.BlogsPage })),
);
const BlogPage = lazy(() =>
    import('#/pages/blog-page').then((module) => ({ default: module.BlogPage })),
);
const PostsPage = lazy(() =>
    import('#/pages/posts-page').then((module) => ({ default: module.PostsPage })),
);
const NotFoundPage = lazy(() =>
    import('#/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);

export const App = () => (
    <AppLayout>
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route
                    path={APPLICATION_ROUTES.root}
                    element={<Navigate to={APPLICATION_ROUTES.blogs} replace />}
                />
                <Route path={APPLICATION_ROUTES.blogs} element={<BlogsPage />} />
                <Route path={APPLICATION_ROUTES.blog} element={<BlogPage />} />
                <Route path={APPLICATION_ROUTES.posts} element={<PostsPage />} />
                <Route path={APPLICATION_ROUTES.notFound} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    </AppLayout>
);
