"use client"

import {memo, useLayoutEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {motion, useScroll, useTransform} from "framer-motion";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
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
import {TCardVariant} from "@/types/global";

import styles from "./title-section.module.scss";
import {useWindowWidth} from "@react-hook/window-size";

interface TitleSectionProps {
    aboutUsData: IAboutUsData;
    isMobile?: boolean;
    aboutUsCards?: TAboutCard[];
}

export const TitleSection = memo(({isMobile, aboutUsCards, aboutUsData}: TitleSectionProps) => {
    const [isAppleOS, setIsAppleOS] = useState<boolean>(true);

    useLayoutEffect(() => {
        const value = isApple();
        setIsAppleOS(value);
    }, []);

    const aboutCardsFiltered = aboutUsCards?.map(card => card.type === "title" ? {
        id: card.id,
        title: "",
        description: "",
        type: "empty" as TCardVariant
    } : card);

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

    const tl = gsap.timeline();

    useGSAP(
        () => {
            tl.to(location.current, {
                y: "0%",
                duration: 1,
            })
                .to(
                    title.current,
                    {
                        y: "0%",
                        stagger: 0.05,
                        duration: 1,
                    },
                    0,
                )
                .to(
                    description.current,
                    {
                        y: "0%",
                        stagger: 0.05,
                        duration: 1,
                    },
                    0,
                )
            // .to(arrow.current, {
            //     opacity: 1,
            // });
        },
        {
            scope: containerRef,
        },
    );

    const width = useWindowWidth();

    const coefficient = useMemo(() => width / 1920 * 10, [width]);

    const {scrollY} = useScroll();
    const yCardsContainer = useTransform(scrollY, [0, 1000], [coefficient * 21, -coefficient * 21]);
    const yBackground = useTransform(scrollY, [0, 1000], [0, 70]);

    const lenis = useLenis();

    if (isMobile) {
        const titleCard = aboutUsCards?.filter(card => card.type === "title")[0];

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

            <motion.div className={styles.cardsContainer} style={{y: yCardsContainer}}>
                {aboutCardsFiltered?.map((item, index) => (
                    <AboutCard item={item} key={index}/>
                ))}
            </motion.div>

            <motion.div ref={backgroundRef} className={styles.backgroundContainer} style={{y: yBackground}}>
                <Image
                    // src={generateImageUrl(homeData.heroBg.data.attributes.url)}
                    src={background}
                    quality={100}
                    alt="background image"
                    fill
                />
            </motion.div>
        </section>
    )
});

TitleSection.displayName = "TitleSection";