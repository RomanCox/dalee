import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";

import {coloringInterval} from "@/constants/mission";

import styles from "./mission-section.module.scss";

interface RowProps {
    text: string;
    delayText: number;
    delayImage: number;
    setShowImage?: Dispatch<SetStateAction<boolean>>;
}

export const RowTablet = memo((props: RowProps) => {
    const {
        text,
        delayText,
        delayImage,
        setShowImage,
    } = props;

    const [symbolIndex, setSymbolIndex] = useState<number | undefined>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (symbolIndex === undefined) {
                setTimeout(() => setSymbolIndex(0), delayText);
            }
            if (symbolIndex !== undefined && symbolIndex < text.length) {
                setSymbolIndex(prev => (prev !== undefined) ? (prev + 1) : 0);
            }
        }, coloringInterval);
        return () => clearTimeout(timeout);
    }, [delayText, symbolIndex, text.length]);

    useEffect(() => {
        const imageTimeout = setTimeout(() => {
            setShowImage?.(true);
        }, delayImage);

        return () => clearTimeout(imageTimeout);
    }, [delayImage, setShowImage, text]);

    return (
        <h3 className={styles.text}>
            {text.split("").map((symbol, index) => (
                <span key={index} className={clsx({[styles.coloredSymbol]: symbolIndex && index <= symbolIndex})}>{symbol}</span>
                // <span key={index} className={clsx({[styles.coloredSymbol]: isAnimate(index)})}>{symbol}</span>
            ))}
        </h3>
    )
});

RowTablet.displayName = "RowTablet";