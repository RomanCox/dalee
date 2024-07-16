import {memo, useCallback} from "react";
import clsx from "clsx";

import styles from "./quote-section.module.scss";
import {quoteSectionData} from "@/constants/quote";

interface RowProps {
    rowIndex: number;
    animationIndex?: number;
    text: string;
    lastString?: boolean;
}

export const Row  = memo((props: RowProps) => {
    const {
        rowIndex,
        animationIndex,
        text,
        lastString,
    } = props;

    const isAnimate = useCallback((index: number) => {
        switch (rowIndex) {
            case 0: {
                if (animationIndex)
                    return animationIndex >= index;
                break;
            }
            case 1: {
                if (animationIndex)
                    return lastString && typeof quoteSectionData[1].label[0] === "string" ?
                        animationIndex - quoteSectionData[0].label.length - quoteSectionData[1].label[0].length >= index
                        : animationIndex - quoteSectionData[0].label.length >= index;
                break;
            }
            case 2: {
                if (animationIndex)
                    return typeof quoteSectionData[1].label[0] === "string" && typeof quoteSectionData[1].label[2] === "string" ?
                        animationIndex -
                        quoteSectionData[0].label.length -
                        quoteSectionData[1].label[0].length -
                        quoteSectionData[1].label[2].length >= index
                        : animationIndex - quoteSectionData[0].label.length - quoteSectionData[1].label.length;
                break;
            }
            case 3: {
                if (animationIndex)
                    return typeof quoteSectionData[1].label[0] === "string" && typeof quoteSectionData[1].label[2] === "string" ?
                        animationIndex -
                        quoteSectionData[0].label.length -
                        quoteSectionData[1].label[0].length -
                        quoteSectionData[1].label[2].length -
                        quoteSectionData[2].label.length >= index
                        : animationIndex -
                        quoteSectionData[0].label.length -
                        quoteSectionData[1].label.length -
                        quoteSectionData[2].label.length >= index;
                break;
            }
        }
    }, [animationIndex, lastString, rowIndex]);

    return (
        <h3 className={styles.text}>
            {text.split("").map((symbol, index) => (
                <span key={index} className={clsx({[styles.coloredSymbol]: isAnimate(index)})}>{symbol}</span>
            ))}
        </h3>
    )
});

Row.displayName = "Row";