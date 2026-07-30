type IconProps = {
    className?: string;
};

export const SearchIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <circle cx='7' cy='7' r='5' stroke='currentColor' strokeWidth='1.5' />
        <path d='M11 11L14 14' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
);

export const ListIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M2 4h12M2 8h12M2 12h8'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
        />
    </svg>
);

export const GridIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <rect x='2' y='2' width='5' height='5' rx='1' fill='currentColor' />
        <rect x='9' y='2' width='5' height='5' rx='1' fill='currentColor' />
        <rect x='2' y='9' width='5' height='5' rx='1' fill='currentColor' />
        <rect x='9' y='9' width='5' height='5' rx='1' fill='currentColor' />
    </svg>
);

export const ImagePlaceholderIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        aria-hidden='true'
    >
        <rect x='3' y='5' width='18' height='14' rx='2' stroke='currentColor' strokeWidth='1.5' />
        <circle cx='8.5' cy='10' r='1.5' fill='currentColor' />
        <path
            d='M4 17l4.5-4.5 3 3L15 12l5 5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
        />
    </svg>
);

export const ChevronDownIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M4 6l4 4 4-4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
