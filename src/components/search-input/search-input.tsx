import { SearchIcon } from '#/components/icons';

import styles from './search-input.module.css';

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
};

export const SearchInput = ({
    value,
    onChange,
    placeholder = 'Search',
    label = 'Search',
}: SearchInputProps) => (
    <div className={styles.wrapper}>
        <SearchIcon className={styles.icon} />
        <input
            type='search'
            className={styles.input}
            placeholder={placeholder}
            aria-label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
);
