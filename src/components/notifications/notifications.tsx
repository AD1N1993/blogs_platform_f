import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '#/hooks/app';
import { notificationsSelectors } from '#selectors';
import { clearNotifications, hideNotification } from '#slices/notifications-slice';

import styles from './notifications.module.css';

export const Notifications = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(notificationsSelectors.items);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className={styles.container} aria-live='polite'>
            {items.map(({ id, title, description, badge }) => (
                <div key={id} className={cn(styles.notification, styles[badge])}>
                    <div className={styles.content}>
                        <p className={styles.title}>{title}</p>
                        {description ? <p className={styles.description}>{description}</p> : null}
                    </div>
                    <button
                        type='button'
                        className={styles.close}
                        aria-label='Закрыть уведомление'
                        onClick={() => dispatch(hideNotification(id))}
                    >
                        ×
                    </button>
                </div>
            ))}

            {items.length > 1 ? (
                <button
                    type='button'
                    className={styles.clearAll}
                    onClick={() => dispatch(clearNotifications())}
                >
                    Скрыть все
                </button>
            ) : null}
        </div>
    );
};
