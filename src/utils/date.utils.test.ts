import { describe, expect, it } from 'vitest';

import { DATE_TIME_FORMAT, formatDate, formatDateTime } from './date.utils';

describe('formatDate', () => {
    it('форматирует ISO-дату в dd.MM.yyyy', () => {
        expect(formatDate('2026-07-29T10:15:00.000Z')).toBe('29.07.2026');
    });

    it('принимает произвольный паттерн', () => {
        expect(formatDate('2026-07-29T00:00:00.000Z', 'yyyy')).toBe('2026');
    });

    it('возвращает пустую строку для пустого значения', () => {
        expect(formatDate(null)).toBe('');
        expect(formatDate(undefined)).toBe('');
        expect(formatDate('')).toBe('');
    });

    it('возвращает пустую строку для невалидной даты', () => {
        expect(formatDate('не дата')).toBe('');
    });
});

describe('formatDateTime', () => {
    it('использует формат с временем', () => {
        expect(DATE_TIME_FORMAT).toBe('dd.MM.yyyy HH:mm');
        expect(formatDateTime('2026-07-29T10:15:00')).toBe('29.07.2026 10:15');
    });
});
