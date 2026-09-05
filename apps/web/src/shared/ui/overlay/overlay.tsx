import { memo } from 'react';
import clsx from 'clsx';
import styles from './overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
    const {
        className,
        onClick,
    } = props;

    return (
        <div
            className={clsx(styles.overlay, [className])}
            onClick={onClick}
        />
    );
});

Overlay.displayName = "Overlay";