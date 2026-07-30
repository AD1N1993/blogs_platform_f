import styles from './page-header.module.css';

type PageHeaderProps = {
    title: string;
};

export const PageHeader = ({ title }: PageHeaderProps) => <h2 className={styles.title}>{title}</h2>;
