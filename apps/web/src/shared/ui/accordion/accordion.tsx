import {memo, ReactNode, useCallback, useState} from "react";
import clsx from "clsx";
import AnimateHeight from 'react-animate-height';

import styles from "./accordion.module.scss";

interface AccordionProps {
    label?: ReactNode;
    children?: ReactNode;
    className?: string;
    startValue?: boolean;
    onToggle?: () => void;
    onClickOpen?: () => void;
    onClickClose?: () => void;
}

export const Accordion = memo((props: AccordionProps) => {
    const {
        label,
        children,
        className,
        startValue = false,
        onToggle,
        onClickOpen,
        onClickClose,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(startValue);
    const [height, setHeight] = useState<number | "auto">(startValue ? "auto" : 0);

    const onToggleHandler = useCallback(() => {
        setIsOpen(prev => !prev);
        onToggle?.();
        if (isOpen) {
            onClickOpen?.();
            setHeight(0);
        } else {
            onClickClose?.();
            setHeight("auto");
        }
    }, [isOpen, onClickClose, onClickOpen, onToggle]);

    return (
        <div
            className={clsx(styles.accordionWrapper, [className])}
            onClick={onToggleHandler}
        >
            {label}
            <AnimateHeight
                duration={300}
                height={height}
            >
                {children}
            </AnimateHeight>
        </div>
    )
})

Accordion.displayName = "Accordion"