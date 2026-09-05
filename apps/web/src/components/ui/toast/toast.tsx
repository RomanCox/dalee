"use client";

import {CSSProperties, forwardRef} from "react";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import {MarkInCircle} from "../../../../public/images/icons/mark-in-circle";

import styles from "./toast.module.scss";

interface ToastProps {
    text: string;
    // type?: "success";
    // close: () => void;
    style?: CSSProperties;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
    (props, ref) => {
        const {
            text,
            // type = "success",
            // close,
            style
        } = props;
        const {position, onMouseMove} = useMousePosition();

        return (
            <div
                ref={ref}
                className={styles.container}
                onMouseMove={onMouseMove}
                style={{
                    ...style,
                    "--x": `${position.x}px`,
                    "--y": `${position.y}px`,
                }}
            >
                <div className={styles.icon}>
                    <MarkInCircle/>
                </div>

                <p className={styles.text}>{text}</p>
                {/*<button className={styles.close_btn} onClick={close}>*/}
                {/*    <Icon name="cross-small" height="19" width="19"/>*/}
                {/*</button>*/}
            </div>
        );
    },
);

Toast.displayName = "Toast";

export default Toast;
