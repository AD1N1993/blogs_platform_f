import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { UserInput, UsersFilter } from '#/types/user';
import { QUERY_KEYS } from '#/utils/constants';
import { usersApi } from '#services/users-api';

export const useUsersQuery = (filter: UsersFilter) =>
    useQuery({
        queryKey: [...QUERY_KEYS.users, filter],
        queryFn: () => usersApi.search(filter),
        placeholderData: keepPreviousData,
    });

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UserInput) => usersApi.create(input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
        },
    });
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => usersApi.remove(userId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
        },
    });
};
