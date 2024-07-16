import {memo, useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {motion, useScroll, useTransform} from "framer-motion";
import {useLenis} from "lenis/react";
import clsx from "clsx";

import {isApple} from "@/utils/helpers";

import {AboutCard} from "@/components/pages/about-us/title-section/about-card";
import LogoIcon from "@/components/ui/logo";
import Icon from "@/components/ui/icon";

import background from "/public/images/about/about-us-page-background.png";
import mobileBackground from "/public/images/projects/projects-page-mobile-bg.png";

import {TAboutCard} from "@/types/about-card.type";
import {IAboutUsData} from "@/constants/about-us";

import styles from "./title-section.module.scss";


interface TitleSectionProps {
    aboutUsData: IAboutUsData;
    isMobile?: boolean;
    aboutCards?: TAboutCard[];
}

export const TitleSection = memo(({isMobile, aboutCards, aboutUsData}: TitleSectionProps) => {
    const [isAppleOS, setIsAppleOS] = useState<boolean>(true);

    useLayoutEffect(() => {
        const value = isApple();
        setIsAppleOS(value);
    }, []);

    const aboutCardsFiltered = aboutCards?.filter(card => card.type !== "title");

    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const location = useRef<HTMLSpanElement>(null);
    const title = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLAnchorElement>(null);
    const description = useRef<HTMLSpanElement[]>([]);

    const addToDescription = (el: HTMLSpanElement) => {
        if (!description.current.includes(el)) {
            description.current.push(el);
        }
    };

    const {scrollY} = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 70]);

    const lenis = useLenis();

    if (isMobile) {
        const titleCard = aboutCards?.filter(card => card.type === "title")[0];

        return (
            <section ref={containerRef} className={styles.sectionWrapper}>
                <LogoIcon className={styles.logo_mobile}/>

                <p className={styles.location}>
                    Россия, Краснодар.
                </p>
                <h1 className={styles.titleMobile}>{titleCard?.title}</h1>
                <p className={styles.descriptionMobile}>{titleCard?.description}</p>

                <Link
                    ref={arrowRef}
                    href={"#cards"}
                    onClick={(e) => {
                        e.preventDefault();
                        lenis?.scrollTo("#cards", {offset: -150, lerp: 0.05});
                    }}
                    className={styles.arrow}
                >
                    <Icon width="59" height="67" name="arrow-down"/>
                </Link>

                <Image
                    className={styles.background_mobile}
                    // src={generateImageUrl(homeData.heroBlock.backgroundMobile.data.attributes.url)}
                    src={mobileBackground}
                    quality={100}
                    alt="hero mobile background image"
                    fill
                />
            </section>
        )
    }

    return (
        <section ref={containerRef} className={styles.sectionWrapper}>
            <div className={styles.titleContainer}>
                <p className={styles.location}>
                    {/*Россия, Краснодар.*/}
                    <span className={styles.mask}>
                    <span ref={location} className={styles.text}>
                        {aboutUsData.location}
                    </span>
                </span>
                </p>
                <h1 className={styles.title}>
                <span className={styles.mask}>
                    <span ref={title} className={clsx(styles.text, {[styles.macOsTitle]: isAppleOS})}>
                        {aboutUsData.title}
                    </span>
                </span>
                </h1>
                <p className={styles.description}>
                    {aboutUsData.description.map(item => (
                        <span key={item} className={styles.mask}>
                        <span ref={addToDescription} className={styles.text}>
                            {item}
                        </span>
                    </span>
                    ))}
                </p>
            </div>
            <div className={styles.cardsContainer}>
                {aboutCardsFiltered?.map((item, index) => (
                    <AboutCard item={item} key={index}/>
                ))}
            </div>

            {isMobile ? (
                <Image
                    className={styles.background_mobile}
                    // src={generateImageUrl(homeData.heroBlock.backgroundMobile.data.attributes.url)}
                    src={mobileBackground}
                    quality={100}
                    alt="hero mobile background image"
                    fill
                />
            ) : (
                <motion.div ref={backgroundRef} className={styles.backgroundContainer} style={{y}}>
                    <Image
                        // src={generateImageUrl(homeData.heroBg.data.attributes.url)}
                        src={background}
                        quality={100}
                        alt="background image"
                        fill
                    />
                </motion.div>
            )}
        </section>
    )
});

TitleSection.displayName = "TitleSection";