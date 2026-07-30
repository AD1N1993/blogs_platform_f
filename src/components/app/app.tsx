import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Notifications } from '#/components/notifications';
import { PageLayout } from '#/components/page-layout';
import { Spinner } from '#/components/spinner';
import { APPLICATION_ROUTES } from '#/utils/constants';

const PostsPage = lazy(() =>
    import('#/pages/posts-page').then((module) => ({ default: module.PostsPage })),
);
const PostPage = lazy(() =>
    import('#/pages/post-page').then((module) => ({ default: module.PostPage })),
);
const NotFoundPage = lazy(() =>
    import('#/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);

export const App = () => (
    <PageLayout>
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route
                    path={APPLICATION_ROUTES.root}
                    element={<Navigate to={APPLICATION_ROUTES.posts} replace />}
                />
                <Route path={APPLICATION_ROUTES.posts} element={<PostsPage />} />
                <Route path={APPLICATION_ROUTES.post} element={<PostPage />} />
                <Route path={APPLICATION_ROUTES.notFound} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
        <Notifications />
    </PageLayout>
);
