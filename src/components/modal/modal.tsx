import { type ReactNode, useEffect, useRef } from 'react';

import { CloseIcon } from '#/components/icons';

import styles from './modal.module.css';

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className={styles.dialog} onClose={onClose} onCancel={onClose}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <button
                    type='button'
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label='Close'
                >
                    <CloseIcon />
                </button>
            </div>

            {children}
        </dialog>
    );
};
