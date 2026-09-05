import {memo, useCallback, useState} from "react";
import clsx from "clsx";

import styles from "./mobile-menu-button.module.scss";

interface MobileMenuButtonProps {
    className?: string;
    onClick?: () => void;
    isOpen?: boolean;
}

export const MobileMenuButton = memo((props: MobileMenuButtonProps) => {
    const {
        className,
        onClick,
        isOpen,
    } = props;

    const [isDisabled, setIsDisabled] = useState<boolean | undefined>();

    const onclickHandler = useCallback(() => {
        onClick?.();
        setIsDisabled(true);
        setTimeout(() => {setIsDisabled(false)}, 600);
    }, [onClick]);

    const mods = {
        [styles.open]: isOpen,
        [styles.close]: isOpen !== undefined && !isOpen,
    }

    return (
        <>
            <button
                className={clsx(styles.button, mods, [className])}
                onClick={onclickHandler}
                disabled={isDisabled}
            />
        </>
    )
});

MobileMenuButton.displayName = "MobileMenuButton";