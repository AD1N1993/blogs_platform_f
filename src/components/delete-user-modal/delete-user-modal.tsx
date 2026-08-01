import { Modal } from '#/components/modal';
import { useDeleteUserMutation } from '#/hooks/use-users';
import { ApiError } from '#services/http-client';

import styles from './delete-user-modal.module.css';

type DeleteUserModalProps = {
    userId: string | null;
    onClose: () => void;
};

export const DeleteUserModal = ({ userId, onClose }: DeleteUserModalProps) => {
    const deleteUser = useDeleteUserMutation();

    const handleClose = () => {
        deleteUser.reset();
        onClose();
    };

    const handleConfirm = () => {
        if (!userId) return;

        deleteUser.mutate(userId, { onSuccess: handleClose });
    };

    return (
        <Modal title='Delete Users' isOpen={userId !== null} onClose={handleClose}>
            <p className={styles.message}>Are you sure you want to delete this user?</p>

            {deleteUser.isError ? (
                <p className={styles.error} role='alert'>
                    {deleteUser.error instanceof ApiError
                        ? deleteUser.error.message
                        : 'Failed to delete user'}
                </p>
            ) : null}

            <div className={styles.actions}>
                <button type='button' className={styles.no} onClick={handleClose}>
                    No
                </button>
                <button
                    type='button'
                    className={styles.yes}
                    onClick={handleConfirm}
                    disabled={deleteUser.isPending}
                >
                    {deleteUser.isPending ? 'Deleting…' : 'Yes'}
                </button>
            </div>
        </Modal>
    );
};
