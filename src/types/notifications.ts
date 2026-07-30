export type NotificationBadge = 'positive' | 'negative' | 'attention';

export type Notification = {
    id: string;
    title: string;
    description?: string;
    badge: NotificationBadge;
};

export type NotificationsReduxState = {
    items: Notification[];
};
