import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from './error-boundary.module.css';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = { hasError: false };

    public static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Hook up an external error tracker (Sentry or similar) here
        console.error('Необработанная ошибка рендера', error, errorInfo.componentStack);
    }

    private readonly handleReloadClick = () => {
        window.location.reload();
    };

    public render(): ReactNode {
        const { children, fallback } = this.props;

        if (!this.state.hasError) {
            return children;
        }

        return (
            fallback ?? (
                <div className={styles.container} role='alert'>
                    <h1 className={styles.title}>Что-то пошло не так</h1>
                    <p className={styles.text}>
                        Мы уже знаем о проблеме. Попробуйте обновить страницу.
                    </p>
                    <button
                        type='button'
                        className={styles.button}
                        onClick={this.handleReloadClick}
                    >
                        Обновить страницу
                    </button>
                </div>
            )
        );
    }
}
