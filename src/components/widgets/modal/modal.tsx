"use client";

import {MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import clsx from "clsx";

import {Portal} from "@/shared/ui/portal/portal";
import {Overlay} from "@/shared/ui/overlay/overlay";
import Icon from "@/components/ui/icon";

import styles from "./modal.module.scss";

const ANIMATION_DELAY = 300;

interface ModalProps {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    isOpen: boolean;
    onClose: () => void;
    withoutCloseButton?: boolean;
}

const Modal = (props: ModalProps) => {
    const {
        children,
        className,
        contentClassName,
        isOpen,
        onClose,
        withoutCloseButton,
    } = props;

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const mods = {
        [styles.opened]: isOpen,
        [styles.closed]: isClosing,
    }

    if (!isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                data-lenis-prevent="true"
                className={clsx(styles.modalWrapper, mods, className)}
            >
                <Overlay onClick={closeHandler}/>
                <div
                    className={clsx(styles.content, contentClassName)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {!withoutCloseButton && (
                        <button className={styles.closeBtn} onClick={closeHandler}>
                            <Icon name={"cross-small"} width={"2rem"} height={"2rem"}/>
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
