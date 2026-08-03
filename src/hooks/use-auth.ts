import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '#/utils/constants';
import { authApi } from '#services/auth-api';
import { authTokenStorage } from '#services/auth-token-storage';
import { setCurrentUser } from '#slices/auth-slice';

import { useAppDispatch } from './app';

export const useSignUpMutation = () => useMutation({ mutationFn: authApi.signUp });

export const useConfirmEmailMutation = () => useMutation({ mutationFn: authApi.confirmEmail });

export const useResendEmailMutation = () => useMutation({ mutationFn: authApi.resendEmail });

export const useMeQuery = (enabled: boolean) =>
    useQuery({
        queryKey: QUERY_KEYS.me,
        queryFn: authApi.me,
        enabled,
        retry: false,
    });

export const useLoginMutation = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: async ({ accessToken }) => {
            authTokenStorage.set(accessToken);
            const user = await authApi.me();
            dispatch(setCurrentUser(user));
            queryClient.setQueryData(QUERY_KEYS.me, user);
        },
    });
};

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    return () => {
        authTokenStorage.clear();
        dispatch(setCurrentUser(null));
        queryClient.removeQueries({ queryKey: QUERY_KEYS.me });
    };
};
