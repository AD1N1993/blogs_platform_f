export type PendingRegistration = {
    login: string;
    email: string;
    password: string;
    confirmationCode: string;
    isExpired: boolean;
    isConfirmed: boolean;
};

const STORAGE_KEY = 'msw:pending-registrations';

/**
 * A real confirmation link opens in a fresh page load (new tab, or clicked from an email
 * client), so an in-memory array wouldn't survive from sign-up to confirmation. localStorage
 * stands in for the backend's registration table across that reload.
 */
const readAll = (): PendingRegistration[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? (JSON.parse(raw) as PendingRegistration[]) : [];
    } catch {
        return [];
    }
};

const writeAll = (registrations: PendingRegistration[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
};

export const pendingRegistrationsStore = {
    findByEmail: (email: string): PendingRegistration | undefined =>
        readAll().find((item) => item.email === email),

    findByLoginOrEmail: (loginOrEmail: string): PendingRegistration | undefined =>
        readAll().find((item) => item.login === loginOrEmail || item.email === loginOrEmail),

    findByConfirmationCode: (code: string): PendingRegistration | undefined =>
        readAll().find((item) => item.confirmationCode === code),

    add: (registration: PendingRegistration): void => {
        writeAll([...readAll(), registration]);
    },

    update: (email: string, changes: Partial<PendingRegistration>): void => {
        writeAll(readAll().map((item) => (item.email === email ? { ...item, ...changes } : item)));
    },
};
