import styles from './app-header.module.css';

export const APP_TITLE = 'Blogger Platform';

export const AppHeader = () => (
    <header className={styles.header}>
        <h1 className={styles.title}>{APP_TITLE}</h1>
    </header>
);
