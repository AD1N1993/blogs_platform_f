import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Modal } from '#/components/modal';
import { useCreateUserMutation } from '#/hooks/use-users';
import { ApiError } from '#services/http-client';

import styles from './add-user-modal.module.css';
import { userInputSchema, type UserInputFormValues } from './user-input.schema';

type AddUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const DEFAULT_VALUES: UserInputFormValues = { email: '', login: '', password: '' };

export const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
    const createUser = useCreateUserMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserInputFormValues>({
        resolver: zodResolver(userInputSchema),
        defaultValues: DEFAULT_VALUES,
    });

    const handleClose = () => {
        reset(DEFAULT_VALUES);
        createUser.reset();
        onClose();
    };

    const onSubmit = (input: UserInputFormValues) => {
        createUser.mutate(input, { onSuccess: handleClose });
    };

    return (
        <Modal title='Add user' isOpen={isOpen} onClose={handleClose}>
            <form className={styles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <label className={styles.field}>
                    <span className={styles.label}>Specify: Email of the user</span>
                    <input className={styles.input} type='email' {...register('email')} />
                    {errors.email ? (
                        <span className={styles.error}>{errors.email.message}</span>
                    ) : null}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Username</span>
                    <input className={styles.input} type='text' {...register('login')} />
                    {errors.login ? (
                        <span className={styles.error}>{errors.login.message}</span>
                    ) : null}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Password</span>
                    <input className={styles.input} type='password' {...register('password')} />
                    {errors.password ? (
                        <span className={styles.error}>{errors.password.message}</span>
                    ) : null}
                </label>

                {createUser.isError ? (
                    <p className={styles.error} role='alert'>
                        {createUser.error instanceof ApiError
                            ? createUser.error.message
                            : 'Failed to create user'}
                    </p>
                ) : null}

                <button type='submit' className={styles.submit} disabled={createUser.isPending}>
                    {createUser.isPending ? 'Adding…' : 'Add user'}
                </button>
            </form>
        </Modal>
    );
};
