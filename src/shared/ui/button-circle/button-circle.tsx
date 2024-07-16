import {ComponentPropsWithoutRef, ElementType, memo, MouseEvent, ReactNode, useCallback} from 'react';

import {clsx} from "clsx";

import styles from "./button-circle.module.scss";

interface ButtonProps<T extends ElementType = "button"> extends ComponentPropsWithoutRef<"button"> {
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    as?: T;
}

export const ButtonCircle = memo(<T extends ElementType = "button">(
    props: ButtonProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,) => {
    const {
        className,
        children,
        disabled,
        onClick,
        as: Component = "button",
        ...otherProps
    } = props;

    const onClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
    }, [onClick]);

    return (
        <Component
            type="button"
            className={clsx(styles.Button, [className])}
            {...otherProps}
            disabled={disabled}
            onClick={onClickHandler}
        >
            <div className={styles.content}>
                {children}
            </div>
        </Component>
    );
});

ButtonCircle.displayName = "ButtonCircle";
