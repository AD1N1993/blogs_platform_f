import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '#/components/app-layout';
import { AuthLayout } from '#/components/auth-layout';
import { Spinner } from '#/components/spinner';
import { useAppDispatch } from '#/hooks/app';
import { useMeQuery } from '#/hooks/use-auth';
import { APPLICATION_ROUTES } from '#/utils/constants';
import { authTokenStorage } from '#services/auth-token-storage';
import { setCurrentUser } from '#slices/auth-slice';

const BlogsPage = lazy(() =>
    import('#/pages/blogs-page').then((module) => ({ default: module.BlogsPage })),
);
const BlogPage = lazy(() =>
    import('#/pages/blog-page').then((module) => ({ default: module.BlogPage })),
);
const PostsPage = lazy(() =>
    import('#/pages/posts-page').then((module) => ({ default: module.PostsPage })),
);
const PostPage = lazy(() =>
    import('#/pages/post-page').then((module) => ({ default: module.PostPage })),
);
const UsersPage = lazy(() =>
    import('#/pages/users-page').then((module) => ({ default: module.UsersPage })),
);
const SignUpPage = lazy(() =>
    import('#/pages/sign-up-page').then((module) => ({ default: module.SignUpPage })),
);
const SignInPage = lazy(() =>
    import('#/pages/sign-in-page').then((module) => ({ default: module.SignInPage })),
);
const EmailConfirmationPage = lazy(() =>
    import('#/pages/email-confirmation-page').then((module) => ({
        default: module.EmailConfirmationPage,
    })),
);
const EmailConfirmationExpiredPage = lazy(() =>
    import('#/pages/email-confirmation-expired-page').then((module) => ({
        default: module.EmailConfirmationExpiredPage,
    })),
);
const NotFoundPage = lazy(() =>
    import('#/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);

export const App = () => {
    const dispatch = useAppDispatch();
    const { data: currentUser } = useMeQuery(Boolean(authTokenStorage.get()));

    useEffect(() => {
        if (currentUser) {
            dispatch(setCurrentUser(currentUser));
        }
    }, [currentUser, dispatch]);

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path={APPLICATION_ROUTES.signUp} element={<SignUpPage />} />
                    <Route path={APPLICATION_ROUTES.signIn} element={<SignInPage />} />
                    <Route
                        path={APPLICATION_ROUTES.emailConfirmation}
                        element={<EmailConfirmationPage />}
                    />
                    <Route
                        path={APPLICATION_ROUTES.emailConfirmationExpired}
                        element={<EmailConfirmationExpiredPage />}
                    />
                </Route>

                <Route element={<AppLayout />}>
                    <Route
                        path={APPLICATION_ROUTES.root}
                        element={<Navigate to={APPLICATION_ROUTES.blogs} replace />}
                    />
                    <Route path={APPLICATION_ROUTES.blogs} element={<BlogsPage />} />
                    <Route path={APPLICATION_ROUTES.blog} element={<BlogPage />} />
                    <Route path={APPLICATION_ROUTES.posts} element={<PostsPage />} />
                    <Route path={APPLICATION_ROUTES.post} element={<PostPage />} />
                    <Route path={APPLICATION_ROUTES.users} element={<UsersPage />} />
                    <Route path={APPLICATION_ROUTES.notFound} element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};
