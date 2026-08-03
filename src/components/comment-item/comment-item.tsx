import { useState } from 'react';

import { Avatar } from '#/components/avatar';
import { CommentForm } from '#/components/comment-form';
import { MoreIcon, PencilIcon, TrashIcon } from '#/components/icons';
import { useUpdateCommentMutation } from '#/hooks/use-comments';
import type { Comment } from '#/types/comment';
import { formatDate } from '#/utils/date.utils';
import { ApiError } from '#services/http-client';

import styles from './comment-item.module.css';

type CommentItemProps = {
    comment: Comment;
    postId: string;
    isOwn: boolean;
    onDeleteRequest: (commentId: string) => void;
};

export const CommentItem = ({ comment, postId, isOwn, onDeleteRequest }: CommentItemProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const updateComment = useUpdateCommentMutation(postId);

    const handleEditSubmit = (content: string) => {
        updateComment.mutate(
            { commentId: comment.id, input: { content } },
            { onSuccess: () => setIsEditing(false) },
        );
    };

    if (isEditing) {
        return (
            <div className={styles.item}>
                <div className={styles.header}>
                    <Avatar size='small' />
                    <span className={styles.login}>{comment.commentatorInfo.userLogin}</span>
                    <span className={styles.date}>{formatDate(comment.createdAt)}</span>
                </div>
                <CommentForm
                    initialValue={comment.content}
                    submitLabel='Edit comment'
                    isSubmitting={updateComment.isPending}
                    errorMessage={
                        updateComment.isError && updateComment.error instanceof ApiError
                            ? updateComment.error.message
                            : undefined
                    }
                    onSubmit={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <Avatar size='small' />
                <span className={styles.login}>{comment.commentatorInfo.userLogin}</span>
                <span className={styles.date}>{formatDate(comment.createdAt)}</span>

                {isOwn ? (
                    <div className={styles.menuWrapper}>
                        <button
                            type='button'
                            className={styles.menuButton}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label='Comment options'
                        >
                            <MoreIcon />
                        </button>

                        {isMenuOpen ? (
                            <div className={styles.menu}>
                                <button
                                    type='button'
                                    className={styles.menuItem}
                                    onClick={() => {
                                        setIsEditing(true);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <PencilIcon />
                                    Edit
                                </button>
                                <button
                                    type='button'
                                    className={styles.menuItem}
                                    onClick={() => {
                                        onDeleteRequest(comment.id);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <TrashIcon />
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <p className={styles.content}>{comment.content}</p>
        </div>
    );
};
