import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '#/hooks/app';
import { useCreatePostMutation } from '#/hooks/use-posts';
import { showNotification } from '#slices/notifications-slice';

import styles from './post-form.module.css';

const postSchema = z.object({
    title: z.string().trim().min(5, 'Минимум 5 символов').max(120, 'Максимум 120 символов'),
    excerpt: z.string().trim().min(10, 'Минимум 10 символов').max(300, 'Максимум 300 символов'),
    content: z.string().trim().min(20, 'Минимум 20 символов'),
    tags: z.string().trim(),
});

type PostFormValues = z.infer<typeof postSchema>;

const DEFAULT_VALUES: PostFormValues = { title: '', excerpt: '', content: '', tags: '' };

export const PostForm = () => {
    const dispatch = useAppDispatch();
    const { mutateAsync, isPending } = useCreatePostMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: DEFAULT_VALUES,
    });

    const onSubmit = handleSubmit(async ({ tags, ...values }) => {
        try {
            await mutateAsync({
                ...values,
                tags: tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            });

            reset(DEFAULT_VALUES);
            dispatch(showNotification({ title: 'Статья опубликована', badge: 'positive' }));
        } catch (error) {
            dispatch(
                showNotification({
                    title: 'Не удалось опубликовать статью',
                    description: error instanceof Error ? error.message : undefined,
                    badge: 'negative',
                }),
            );
        }
    });

    return (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
            <h2 className={styles.title}>Новая статья</h2>

            <label className={styles.field}>
                <span className={styles.label}>Заголовок</span>
                <input className={styles.input} {...register('title')} />
                {errors.title ? <span className={styles.error}>{errors.title.message}</span> : null}
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Краткое описание</span>
                <input className={styles.input} {...register('excerpt')} />
                {errors.excerpt ? (
                    <span className={styles.error}>{errors.excerpt.message}</span>
                ) : null}
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Текст</span>
                <textarea className={styles.textarea} rows={5} {...register('content')} />
                {errors.content ? (
                    <span className={styles.error}>{errors.content.message}</span>
                ) : null}
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Теги через запятую</span>
                <input className={styles.input} {...register('tags')} />
            </label>

            <button type='submit' className={styles.submit} disabled={isPending}>
                {isPending ? 'Публикуем…' : 'Опубликовать'}
            </button>
        </form>
    );
};
