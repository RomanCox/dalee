import {memo, useCallback} from "react";
import clsx from "clsx";

import {missionData} from "@/constants/mission";

import styles from "./mission-section.module.scss";

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
                    return animationIndex - missionData[0].label.length >= index;
                break;
            }
            case 2: {
                if (animationIndex)
                    return animationIndex -
                        missionData[0].label.length -
                        missionData[1].label.length >= index;
                break;
            }
            case 3: {
                if (animationIndex)
                    return animationIndex -
                        missionData[0].label.length -
                        missionData[1].label.length -
                        missionData[2].label.length >= index;
                break;
            }
            case 4: {
                if (animationIndex)
                    return lastString && typeof missionData[4].label[0] === "string" ?
                        animationIndex -
                        missionData[0].label.length -
                        missionData[1].label.length -
                        missionData[2].label.length -
                        missionData[3].label.length -
                        missionData[4].label[0].length >= index :
                        animationIndex -
                        missionData[0].label.length -
                        missionData[1].label.length -
                        missionData[2].label.length -
                        missionData[3].label.length >= index;
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