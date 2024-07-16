import {memo, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {useLenis} from "lenis/react";

import {useMediaQuery} from "@/shared/hooks/use-match-media";
import {useWindowHeight, useWindowWidth} from "@react-hook/window-size";

import {Row} from "./row";

import {imageAnimationDuration, IQuoteItem} from "@/constants/quote";

import styles from "./quote-section.module.scss";
import Icon from "@/components/ui/icon";


export interface QuoteSectionProps {
    quoteSectionData: IQuoteItem[];
}

export const QuoteSection = memo(({quoteSectionData}: QuoteSectionProps) => {

    const [isFirstImageShow, setIsFirstImageShow] = useState(false);
    const [isSecondImageShow, setIsSecondImageShow] = useState(false);
    const [isAuthorShow, setIsAuthorShow] = useState(false);
    const [animationIndex, setAnimationIndex] = useState<number>(-1);

    const height = useWindowHeight();
    const width = useWindowWidth();

    let totalCharacters = 1;

    quoteSectionData.forEach((item) => {
        if (Array.isArray(item.label)) {
            totalCharacters += item.label.reduce(
                (sum, part) => sum + (typeof part === "string" ? part.length : 0),
                0,
            );
        } else {
            totalCharacters += item.label.length;
        }

        if (item.image) {
            totalCharacters += 1;
        }
    });

    const isMobile = useMediaQuery("(max-width: 767px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const widthCoefficient = useMemo(() => (width / 1920) * 400, [width]);

    const scrollCoefficient = useMemo(() => {
        if (isTablet) {
            return Math.ceil((height / 2 - widthCoefficient) / totalCharacters);
        }
        return Math.ceil((3 * height / 2 - widthCoefficient) / totalCharacters);
    }, [height, totalCharacters, widthCoefficient, isTablet]);

    const containerRef = useRef(null);
    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);



    // useGSAP(
    //     () => {
    //         gsap.to([imageRef1.current, imageRef2.current], {
    //             scrollTrigger: {
    //                 scrub: true,
    //             },
    //             yPercent: 40,
    //         });
    //     },
    //     {scope: containerRef},
    // );

    useLenis(
        ({scroll}) => {
            const newValue = Math.floor(
                (scroll - widthCoefficient) / scrollCoefficient,
            );
            setAnimationIndex(newValue);
        },
        [widthCoefficient, scrollCoefficient],
    );

    useEffect(() => {
        if (animationIndex >= quoteSectionData[0].label.length + (typeof quoteSectionData[1].label[0] === "string" ? quoteSectionData[1].label[0].length : 0)) {
            setIsFirstImageShow(true);
        } else {
            setIsFirstImageShow(false);
        }
        if (
            animationIndex >=
            quoteSectionData[0].label.length +
            (typeof quoteSectionData[1].label[0] === "string" ? quoteSectionData[1].label[0].length : 0) +
            (typeof quoteSectionData[1].label[2] === "string" ? quoteSectionData[1].label[2].length : 0) +
            quoteSectionData[2].label.length
        ) {
            setIsSecondImageShow(true);
        } else {
            setIsSecondImageShow(false);
        }
        if (
            animationIndex >=
            quoteSectionData[0].label.length +
            (typeof quoteSectionData[1].label[0] === "string" ? quoteSectionData[1].label[0].length : 0) +
            (typeof quoteSectionData[1].label[2] === "string" ? quoteSectionData[1].label[2].length : 0) +
            quoteSectionData[2].label.length +
            quoteSectionData[3].label.length
        ) {
            setIsAuthorShow(true);
        } else {
            setIsAuthorShow(false);
        }
    }, [animationIndex, quoteSectionData]);

    return (
        <section ref={containerRef} id="mission" className={styles.section}>
            <div className={styles.container}>
                {quoteSectionData.map((row, index) => (
                    <div key={row.id} className={styles.rowContainer}>
                        {Array.isArray(row.label) ? (
                            <div className={styles.lastRowsContainer}>
                                {row.label.map((item, i) => {
                                    if (typeof item === "string") {
                                        return (
                                            <Row
                                                key={item}
                                                rowIndex={index}
                                                text={item}
                                                animationIndex={animationIndex}
                                                lastString={i === 2}
                                            />
                                        );
                                    } else {
                                        return (
                                            <span
                                                key={String(item)}
                                                className={clsx(styles.image_container, {
                                                    [styles.displayedImage]: isFirstImageShow,
                                                })}
                                                style={{"--duration": `${imageAnimationDuration}ms`}}
                                            >
                                                <Image ref={imageRef1} src={item} alt="" aria-hidden/>
                                            </span>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <div key={row.id} className={styles.rowContainer}>
                                {row.id === 3 && !isMobile && (
                                    <div
                                        className={clsx(styles.socialsContainer, {
                                            [styles.displayedImage]: isSecondImageShow,
                                        })}
                                        style={{"--duration": `${imageAnimationDuration}ms`}}
                                    >
                                        <div className={styles.social}>
                                            <Icon height="36" width="36" name={"telegram"} />
                                        </div>
                                        <div className={styles.social}>
                                            <Icon height="36" width="36" name={"instagram"} />
                                        </div>
                                        <div className={styles.social}>
                                            <Icon height="36" width="36" name={"vk"} />
                                        </div>
                                    </div>
                                )}
                                {row.id === 3 && row.image && (
                                    <span
                                        className={clsx(styles.image_container, {
                                            [styles.displayedImage]: isSecondImageShow,
                                        })}
                                        style={{"--duration": `${imageAnimationDuration}ms`}}
                                    >
                                        <Image ref={imageRef2} src={row.image} alt="" aria-hidden/>
                                    </span>
                                )}
                                <Row
                                    text={row.label}
                                    rowIndex={index}
                                    animationIndex={animationIndex}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className={clsx(styles.authorContainer, {[styles.displayedAuthor]: isAuthorShow})}>
                    <p>Гозенко Александр —</p>
                    <p>СЕО компании.</p>
                </div>
            </div>
        </section>
    )
});

QuoteSection.displayName = "QuoteSection";