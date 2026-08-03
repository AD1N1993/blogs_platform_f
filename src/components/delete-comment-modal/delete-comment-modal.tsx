import { Modal } from '#/components/modal';
import { useDeleteCommentMutation } from '#/hooks/use-comments';
import { ApiError } from '#services/http-client';

import styles from './delete-comment-modal.module.css';

type DeleteCommentModalProps = {
    postId: string;
    commentId: string | null;
    onClose: () => void;
};

export const DeleteCommentModal = ({ postId, commentId, onClose }: DeleteCommentModalProps) => {
    const deleteComment = useDeleteCommentMutation(postId);

    const handleClose = () => {
        deleteComment.reset();
        onClose();
    };

    const handleConfirm = () => {
        if (!commentId) return;

        deleteComment.mutate(commentId, { onSuccess: handleClose });
    };

    return (
        <Modal title='Delete Comment' isOpen={commentId !== null} onClose={handleClose}>
            <p className={styles.message}>Are you sure you want to delete comment?</p>

            {deleteComment.isError ? (
                <p className={styles.error} role='alert'>
                    {deleteComment.error instanceof ApiError
                        ? deleteComment.error.message
                        : 'Failed to delete comment'}
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
                    disabled={deleteComment.isPending}
                >
                    {deleteComment.isPending ? 'Deleting…' : 'Yes'}
                </button>
            </div>
        </Modal>
    );
};
