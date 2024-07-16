"use client";

import {memo, useRef, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {RowTablet} from "./row-tablet";
import PlayBtn from "@/components/ui/play-btn/play-btn";

import {coloringInterval, imageAnimationDuration} from "@/constants/mission";

import {MissionSectionProps} from "@/components/pages/home/mission-section/mission-section";

import styles from "./mission-section.module.scss";

interface MissionSectionTabletProps extends MissionSectionProps {
    openModal: () => void;
}

export const MissionSectionTablet = memo(({missionData, openModal}: MissionSectionTabletProps) => {
    const [isFirstImageShow, setIsFirstImageShow] = useState(false);
    const [isSecondImageShow, setIsSecondImageShow] = useState(false);
    const [isThirdImageShow, setIsThirdImageShow] = useState(false);

    let totalCharacters = 1;

    missionData.forEach(item => {
        if (Array.isArray(item.label)) {
            totalCharacters += item.label.reduce((sum, part) => sum + (typeof part === "string" ? part.length : 0), 0);
        } else {
            totalCharacters += item.label.length;
        }

        if (item.image) {
            totalCharacters += 1;
        }
    });

    const containerRef = useRef(null);
    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);
    const imageRef3 = useRef(null);

    useGSAP(
        () => {
            gsap.to([imageRef1.current, imageRef2.current, imageRef3.current], {
                scrollTrigger: {
                    scrub: true,
                },
                yPercent: 40,
            });
        },
        {scope: containerRef},
    );

    return (
        <div className={styles.container}>
            {missionData.map((row, index, array) => {
                const textAnimationDelay = array.slice(0, index).reduce((acc, item) => {
                    const currentRowDuration = item.label.length * coloringInterval;
                    let result = acc + currentRowDuration;
                    if (item.imagePosition === "start") {
                        result += (imageAnimationDuration / 2);
                    }
                    return result;
                }, 0);

                let delayTextAnimation = textAnimationDelay + (row.imagePosition === "start" || row.id === 3 ? (imageAnimationDuration / 2) :
                    Array.isArray(row.label) && typeof row.label[0] === "string" ? (imageAnimationDuration / 2) : 0);

                const delayForLastRow = (index: number) => {
                    if (index === 2 && typeof row.label[0] === "string") {
                        return delayTextAnimation + row.label[0].length * coloringInterval + (imageAnimationDuration / 2);
                    }
                    return delayTextAnimation;
                }

                const delayImageAnimation = delayTextAnimation +
                    (row.imagePosition === "end" ? row.label.length * coloringInterval : Array.isArray(row.label) && typeof row.label[0] === "string" ? row.label[0].length * coloringInterval : -(imageAnimationDuration / 2));

                return (
                    <div key={row.id} className={styles.row}>
                        {Array.isArray(row.label) ? (
                            <div className={styles.lastRowsContainer}>
                                {row.label.map((item, i) => {
                                        if (typeof item === "string") {
                                            return (
                                                <RowTablet
                                                    key={item}
                                                    text={item}
                                                    delayText={delayForLastRow(i)}
                                                    delayImage={delayImageAnimation}
                                                    setShowImage={
                                                        row.id === 1 ? setIsFirstImageShow : row.id === 2 ? setIsSecondImageShow : setIsThirdImageShow
                                                    }
                                                />
                                            )
                                        } else {
                                            return (
                                                <span
                                                    key={String(item)}
                                                    className={clsx(styles.image_container, {[styles.displayedImage]: isThirdImageShow})}
                                                    style={{"--duration": `${imageAnimationDuration}ms`}}
                                                >
                                                            <Image ref={imageRef3} src={item} alt="" aria-hidden/>
                                                        </span>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        ) : (
                            <>
                                {row.id === 1 && row.image && (
                                    <span
                                        className={clsx(styles.image_container, {[styles.displayedImage]: isFirstImageShow})}
                                        style={{"--duration": `${imageAnimationDuration}ms`}}
                                    >
                                                <Image ref={imageRef1} src={row.image} alt="" aria-hidden/>
                                            </span>
                                )}
                                <RowTablet
                                    text={row.label}
                                    delayText={delayTextAnimation}
                                    delayImage={delayImageAnimation}
                                    setShowImage={
                                        row.id === 1 ? setIsFirstImageShow :
                                            row.id === 2 ? setIsSecondImageShow :
                                                row.id === 4 ? setIsThirdImageShow : undefined
                                    }
                                />
                                {row.id === 2 && row.image && (
                                    <div
                                        className={styles.video_container}
                                    >
                                                <span
                                                    className={clsx(styles.image_container, {[styles.displayedImage]: isSecondImageShow})}
                                                    style={{"--duration": `${imageAnimationDuration}ms`}}
                                                >
                                                    <Image ref={imageRef2} src={row.image} alt="" aria-hidden/>
                                                </span>
                                        <PlayBtn
                                            variant="blurred"
                                            className={clsx(styles.play_btn, {[styles.displayedImage]: isSecondImageShow})}
                                            style={{"--duration": `${imageAnimationDuration}ms`}}
                                            onClick={openModal}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    );
});

MissionSectionTablet.displayName = "MissionSectionTablet";
