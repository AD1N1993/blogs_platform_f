import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import styles from './comment-form.module.css';
import { commentSchema, type CommentFormValues } from './comment.schema';

type CommentFormProps = {
    initialValue?: string;
    submitLabel: string;
    placeholder?: string;
    isSubmitting: boolean;
    errorMessage?: string;
    onSubmit: (content: string) => void;
    onCancel?: () => void;
};

export const CommentForm = ({
    initialValue = '',
    submitLabel,
    placeholder = 'Provide your comment...',
    isSubmitting,
    errorMessage,
    onSubmit,
    onCancel,
}: CommentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: { content: initialValue },
        mode: 'onChange',
    });

    const submit = (values: CommentFormValues) => onSubmit(values.content);

    return (
        <form className={styles.form} onSubmit={(event) => void handleSubmit(submit)(event)}>
            <textarea
                className={styles.textarea}
                placeholder={placeholder}
                rows={3}
                {...register('content')}
            />
            {errors.content ? <span className={styles.error}>{errors.content.message}</span> : null}
            {errorMessage ? <span className={styles.error}>{errorMessage}</span> : null}

            <div className={styles.actions}>
                {onCancel ? (
                    <button type='button' className={styles.cancel} onClick={onCancel}>
                        Cancel
                    </button>
                ) : null}
                <button type='submit' className={styles.submit} disabled={!isValid || isSubmitting}>
                    {isSubmitting ? 'Sending…' : submitLabel}
                </button>
            </div>
        </form>
    );
};
