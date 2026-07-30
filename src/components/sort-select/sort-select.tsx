import { ChevronDownIcon } from '#/components/icons';

import styles from './sort-select.module.css';

export type SortOption<TValue extends string> = {
    value: TValue;
    label: string;
};

type SortSelectProps<TValue extends string> = {
    value: TValue;
    options: SortOption<TValue>[];
    onChange: (value: TValue) => void;
    label?: string;
};

export const SortSelect = <TValue extends string>({
    value,
    options,
    onChange,
    label = 'Sorting',
}: SortSelectProps<TValue>) => (
    <div className={styles.wrapper}>
        <select
            className={styles.select}
            aria-label={label}
            value={value}
            onChange={(event) => onChange(event.target.value as TValue)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <ChevronDownIcon className={styles.icon} />
    </div>
);
