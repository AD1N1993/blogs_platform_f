import { format, isValid, parseISO } from 'date-fns';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm';

export const formatDate = (value: string | null | undefined, pattern = DATE_FORMAT): string => {
    if (!value) {
        return '';
    }

    const date = parseISO(value);

    return isValid(date) ? format(date, pattern) : '';
};

export const formatDateTime = (value: string | null | undefined): string =>
    formatDate(value, DATE_TIME_FORMAT);
