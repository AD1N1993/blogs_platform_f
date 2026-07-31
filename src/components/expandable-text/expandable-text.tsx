import cn from 'classnames';
import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { ChevronDownIcon } from '#/components/icons';

import styles from './expandable-text.module.css';

type ExpandableTextProps = {
    children: string;
    /** Lines shown while collapsed. */
    lines?: number;
    className?: string;
};

/**
 * Clamps long text and reveals the rest on demand. The toggle only appears when the text
 * actually overflows, so short descriptions render as plain paragraphs.
 */
export const ExpandableText = ({ children, lines = 2, className }: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const textId = useId();

    useLayoutEffect(() => {
        const element = textRef.current;

        if (!element) {
            return;
        }

        const measure = () => setIsClamped(element.scrollHeight > element.clientHeight + 1);

        // Measured while collapsed: once expanded the element grows to fit and never overflows
        if (!isExpanded) {
            measure();
        }

        const observer = new ResizeObserver(() => {
            if (!isExpanded) {
                measure();
            }
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [children, isExpanded, lines]);

    return (
        <div className={className}>
            <p
                ref={textRef}
                id={textId}
                className={cn(styles.text, { [styles.clamped]: !isExpanded })}
                style={{ '--expandable-lines': lines } as CSSProperties}
            >
                {children}
            </p>

            {isClamped ? (
                <button
                    type='button'
                    className={styles.toggle}
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    aria-expanded={isExpanded}
                    aria-controls={textId}
                >
                    <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                    <ChevronDownIcon className={cn(styles.icon, { [styles.up]: isExpanded })} />
                </button>
            ) : null}
        </div>
    );
};
