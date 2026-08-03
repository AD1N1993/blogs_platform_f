import { useState } from 'react';

import { CommentForm } from '#/components/comment-form';
import { CommentItem } from '#/components/comment-item';
import { DeleteCommentModal } from '#/components/delete-comment-modal';
import { ShowMoreButton } from '#/components/show-more-button';
import { Spinner } from '#/components/spinner';
import { useAppSelector } from '#/hooks/app';
import { useCreateCommentMutation, usePostCommentsQuery } from '#/hooks/use-comments';
import { authSelectors } from '#selectors';
import { ApiError } from '#services/http-client';

import styles from './comment-section.module.css';

type CommentSectionProps = {
    postId: string;
};

export const CommentSection = ({ postId }: CommentSectionProps) => {
    const currentUser = useAppSelector(authSelectors.user);
    const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(null);

    const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        usePostCommentsQuery(postId);
    const createComment = useCreateCommentMutation(postId);

    const comments = data?.pages.flatMap((page) => page.items) ?? [];
    const totalCount = data?.pages[0]?.totalCount ?? 0;

    const handleCreate = (content: string) => {
        createComment.mutate({ content });
    };

    return (
        <div className={styles.section}>
            <h3 className={styles.title}>Comments ({totalCount})</h3>

            {currentUser ? (
                <CommentForm
                    key={createComment.isSuccess ? createComment.submittedAt : 'new'}
                    submitLabel='Send a comment'
                    isSubmitting={createComment.isPending}
                    errorMessage={
                        createComment.isError && createComment.error instanceof ApiError
                            ? createComment.error.message
                            : undefined
                    }
                    onSubmit={handleCreate}
                />
            ) : null}

            {isPending ? <Spinner /> : null}

            {isError ? (
                <p className={styles.error} role='alert'>
                    Failed to load comments: {error.message}
                </p>
            ) : null}

            {data && comments.length === 0 ? <p className={styles.empty}>No comments yet</p> : null}

            {comments.length > 0 ? (
                <div className={styles.list}>
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            isOwn={comment.commentatorInfo.userId === currentUser?.userId}
                            onDeleteRequest={setCommentIdToDelete}
                        />
                    ))}
                </div>
            ) : null}

            {hasNextPage ? (
                <ShowMoreButton
                    onClick={() => void fetchNextPage()}
                    isLoading={isFetchingNextPage}
                />
            ) : null}

            <DeleteCommentModal
                postId={postId}
                commentId={commentIdToDelete}
                onClose={() => setCommentIdToDelete(null)}
            />
        </div>
    );
};
