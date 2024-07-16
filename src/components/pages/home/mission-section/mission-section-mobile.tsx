"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useLenis} from "lenis/react";
import clsx from "clsx";
import {useWindowHeight, useWindowWidth} from "@react-hook/window-size";

import PlayBtn from "@/components/ui/play-btn/play-btn";
import {RowMobile} from "@/components/pages/home/mission-section/row-mobile";

import videoPreviewMobile from "/public/images/mission/video-preview-mobile.png";

import {imageAnimationDuration} from "@/constants/mission";

import {MissionSectionProps} from "@/components/pages/home/mission-section/mission-section";

import styles from "./mission-section.module.scss";

interface MissionSectionMobileProps extends MissionSectionProps {
    openModal: () => void;
}

const MissionSectionMobile = ({missionData, openModal}: MissionSectionMobileProps) => {
    const [isFirstImageShow, setIsFirstImageShow] = useState(false);
    const [isSecondImageShow, setIsSecondImageShow] = useState(false);
    const [isThirdImageShow, setIsThirdImageShow] = useState(false);
    const [animationIndex, setAnimationIndex] = useState<number>(-1);

    let totalCharacters = 1;

    missionData.forEach(item => {
        totalCharacters += item.label.length;

        if (item.image) {
            totalCharacters += 1;
        }
    });

    const height = useWindowHeight();
    const width = useWindowWidth();

    const widthCoefficient = useMemo(() => width / 375 * 50, [width]);

    const scrollCoefficient = useMemo(() => {
        return Math.ceil((height) / (2 * totalCharacters));
    }, [height, totalCharacters]);

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

    useLenis(({scroll}) => {
        const newValue = Math.floor((scroll - widthCoefficient) / scrollCoefficient);
        setAnimationIndex(newValue);
    }, [widthCoefficient, scrollCoefficient]);

    useEffect(() => {
        if (animationIndex >= missionData[0].label.length + missionData[1].label.length) {
            setIsFirstImageShow(true);
        } else {
            setIsFirstImageShow(false);
        }
        if (animationIndex >= (
            missionData[0].label.length +
            missionData[1].label.length +
            missionData[2].label.length +
            missionData[3].label.length
        )) {
            setIsSecondImageShow(true);
        } else {
            setIsSecondImageShow(false);
        }
        if (animationIndex >= (
            missionData[0].label.length +
            missionData[1].label.length +
            missionData[2].label.length +
            missionData[3].label.length +
            missionData[4].label.length +
            missionData[5].label.length +
            missionData[6].label.length
        )) {
            setIsThirdImageShow(true);
        } else {
            setIsThirdImageShow(false);
        }
    }, [animationIndex, missionData]);

    return (
        <>
            <div className={styles.container}>
                {missionData.map((row, index) => (
                    <div key={row.id} className={styles.rowContainer}>
                        {row.imagePosition === "start" && row.image && (
                            <span
                                className={clsx(styles.image_container, {[styles.displayedImage]: isSecondImageShow})}
                                style={{"--duration": `${imageAnimationDuration}ms`}}
                            >
                                <Image ref={imageRef2} src={row.image} alt="" aria-hidden/>
                            </span>
                        )}
                        <RowMobile
                            text={row.label as string}
                            rowIndex={index}
                            animationIndex={animationIndex}
                        />
                        {row.imagePosition === "end" && row.image && (
                            <span
                                className={clsx(styles.image_container, {[styles.displayedImage]: (row.id === 1 ? isFirstImageShow : isThirdImageShow)})}
                                style={{"--duration": `${imageAnimationDuration}ms`}}
                            >
                                <Image ref={row.id === 1 ? imageRef1 : imageRef3} src={row.image} alt="" aria-hidden/>
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.video_preview_mobile}>
                <Image src={videoPreviewMobile} alt="" aria-hidden/>
                <PlayBtn
                    className={styles.play_mobile}
                    variant="blurred"
                    onClick={openModal}
                />
            </div>
        </>
    );
};

export default MissionSectionMobile;
