import { useNavigate } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Страница не найдена</h1>
            <p className={styles.text}>Проверьте адрес или вернитесь назад.</p>
            <button type='button' className={styles.button} onClick={() => navigate(-1)}>
                Назад
            </button>
        </div>
    );
};
