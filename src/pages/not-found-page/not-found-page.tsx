import { useNavigate } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Page not found</h2>
            <p className={styles.text}>Check the address or go back.</p>
            <button type='button' className={styles.button} onClick={() => navigate(-1)}>
                Go back
            </button>
        </div>
    );
};
