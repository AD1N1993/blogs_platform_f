import { useState } from 'react';

import { AddUserModal } from '#/components/add-user-modal';
import { DeleteUserModal } from '#/components/delete-user-modal';
import { TrashIcon } from '#/components/icons';
import { PageHeader } from '#/components/page-header';
import { Pagination } from '#/components/pagination';
import { Spinner } from '#/components/spinner';
import { useUsersQuery } from '#/hooks/use-users';
import { USERS_PAGE_SIZE } from '#/utils/constants';
import { formatDate } from '#/utils/date.utils';

import styles from './users-page.module.css';

export const UsersPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(USERS_PAGE_SIZE);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

    const { data, isPending, isError, error } = useUsersQuery({ pageNumber, pageSize });
    const users = data?.items ?? [];

    const handlePageSizeChange = (nextPageSize: number) => {
        setPageSize(nextPageSize);
        setPageNumber(1);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <PageHeader title='Users' />
                <button
                    type='button'
                    className={styles.addButton}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add user
                </button>
            </div>

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Failed to load users: {error.message}
                </p>
            ) : null}

            {data && users.length === 0 ? <p className={styles.empty}>Nothing found</p> : null}

            {users.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User ID</th>
                            <th>Date added</th>
                            <th aria-hidden='true' />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>{user.id}</td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>
                                    <button
                                        type='button'
                                        className={styles.deleteButton}
                                        onClick={() => setUserIdToDelete(user.id)}
                                        aria-label={`Delete user ${user.login}`}
                                    >
                                        <TrashIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}

            {data && data.pagesCount > 1 ? (
                <Pagination
                    page={data.page}
                    pagesCount={data.pagesCount}
                    pageSize={pageSize}
                    onPageChange={setPageNumber}
                    onPageSizeChange={handlePageSizeChange}
                />
            ) : null}

            <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <DeleteUserModal userId={userIdToDelete} onClose={() => setUserIdToDelete(null)} />
        </div>
    );
};
