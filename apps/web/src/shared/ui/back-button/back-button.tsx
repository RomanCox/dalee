import {memo, ReactNode} from "react";
import {useRouter} from "@tanstack/react-router";
import clsx from "clsx";

interface BackButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export const BackButton = memo(({children, onClick, className}: BackButtonProps) => {
    const router = useRouter();

    const onBackHandler = () => {
        router.history.back();
        onClick?.()
    };

    return (
        <button onClick={onBackHandler} className={clsx(className)}>
            {children}
        </button>
    )
});

BackButton.displayName = "BackButton";