import type { User, UserInput, UsersFilter, UsersPage } from '#/types/user';

import { adminHttpClient } from './admin-http-client';

export const usersApi = {
    search: async (filter: UsersFilter = {}): Promise<UsersPage> => {
        const { data } = await adminHttpClient.get<UsersPage>('/users', { params: filter });

        return data;
    },

    create: async (input: UserInput): Promise<User> => {
        const { data } = await adminHttpClient.post<User>('/users', input);

        return data;
    },

    remove: async (userId: string): Promise<void> => {
        await adminHttpClient.delete(`/users/${userId}`);
    },
};
