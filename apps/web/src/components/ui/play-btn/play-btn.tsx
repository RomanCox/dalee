"use client";

import {ButtonHTMLAttributes} from "react";
import clsx from "clsx";

import Icon from "../icon";

import styles from "./play-btn.module.scss";

interface PlayBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    className?: string;
    variant?: "default" | "blurred";
}

const PlayBtn = ({onClick, className, variant = "default", style}: PlayBtnProps) => {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.btn, styles[variant], className)}
            style={style}
        >
            <Icon name="triangle" width="30" height="34"/>
        </button>
    );
};

export default PlayBtn;
