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

export const ChevronRightIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M6 4l4 4-4 4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export const UsersIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <circle cx='6' cy='5' r='2.5' stroke='currentColor' strokeWidth='1.5' />
        <path
            d='M1.5 14c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
        />
        <path
            d='M10.5 3.5c1.1 0 2 .9 2 2s-.9 2-2 2M12.5 14c0-1.9-1.2-3.3-3-3.8'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
        />
    </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M4 4l8 8M12 4l-8 8'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
        />
    </svg>
);

export const TrashIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M3 5h10M6.5 5V3.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V5M6.5 8v4M9.5 8v4M4 5l.6 8a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.6-8'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export const MoreIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='currentColor'
        aria-hidden='true'
    >
        <circle cx='8' cy='3' r='1.3' />
        <circle cx='8' cy='8' r='1.3' />
        <circle cx='8' cy='13' r='1.3' />
    </svg>
);

export const PencilIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M11 2.5a1.4 1.4 0 0 1 2 2L4.5 13 2 13.5 2.5 11z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
    >
        <path
            d='M13 8H3M3 8l4-4M3 8l4 4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
