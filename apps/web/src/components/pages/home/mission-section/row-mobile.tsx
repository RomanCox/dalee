import {memo, useCallback} from "react";
import clsx from "clsx";

import {missionDataMobile} from "@/constants/mission";

import styles from "./mission-section.module.scss";

interface RowProps {
    rowIndex: number;
    animationIndex?: number;
    text: string;
}

export const RowMobile  = memo((props: RowProps) => {
    const {
        rowIndex,
        animationIndex,
        text,
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
                    return animationIndex - missionDataMobile[0].label.length >= index;
                break;
            }
            case 2: {
                if (animationIndex)
                    return animationIndex -
                        missionDataMobile[0].label.length -
                        missionDataMobile[1].label.length >= index;
                break;
            }
            case 3: {
                if (animationIndex)
                    return animationIndex -
                        missionDataMobile[0].label.length -
                        missionDataMobile[1].label.length -
                        missionDataMobile[2].label.length >= index;
                break;
            }
            case 4: {
                if (animationIndex)
                    return animationIndex -
                        missionDataMobile[0].label.length -
                        missionDataMobile[1].label.length -
                        missionDataMobile[2].label.length -
                        missionDataMobile[3].label.length >= index;
                break;
            }
            case 5: {
                if (animationIndex)
                    return animationIndex -
                        missionDataMobile[0].label.length -
                        missionDataMobile[1].label.length -
                        missionDataMobile[2].label.length -
                        missionDataMobile[3].label.length -
                        missionDataMobile[4].label.length >= index;
                break;
            }
            case 6: {
                if (animationIndex)
                    return animationIndex -
                        missionDataMobile[0].label.length -
                        missionDataMobile[1].label.length -
                        missionDataMobile[2].label.length -
                        missionDataMobile[3].label.length -
                        missionDataMobile[4].label.length -
                        missionDataMobile[5].label.length >= index;
                break;
            }
        }
    }, [animationIndex, rowIndex]);

    return (
        <h3 className={styles.text}>
            {text.split("").map((symbol, index) => (
                <span key={index} className={clsx({[styles.coloredSymbol]: isAnimate(index)})}>{symbol}</span>
            ))}
        </h3>
    )
});

RowMobile.displayName = "RowMobile";