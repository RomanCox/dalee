"use client";

import {memo, useLayoutEffect, useRef, useState} from "react";
import Image, {StaticImageData} from "next/image";
import {motion, useScroll, useTransform} from "framer-motion";
import clsx from "clsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

import {isApple} from "@/utils/helpers";

import background from "/public/images/projects/projects-page-background.png";
import mobileBackground from "/public/images/projects/projects-page-mobile-bg.png";

import styles from "./title-section.module.scss";
import LogoIcon from "@/components/ui/logo";
import Icon from "@/components/ui/icon";
import Link from "next/link";
import {useLenis} from "lenis/react";

interface TitleSectionProps {
    data?: {
        location: string;
        title: string;
        description: string[];
        background: StaticImageData;
    };
    isMobile: boolean;
}

const titleSectionData = {
    location: "Россия, Краснодар.",
    title: "ПРОЕКТЫ",
    description: ["Создаем пространства, которые не только", "воплощают мечты наших клиентов,", "но и предвосхищают их будущие потребности."],
    background: background,
}

export const TitleSection = memo(({isMobile, data = titleSectionData}: TitleSectionProps) => {
    const [isAppleOS, setIsAppleOS] = useState<boolean>(true);

    useLayoutEffect(() => {
        const value = isApple();
        setIsAppleOS(value);
    }, []);


    const container = useRef<HTMLDivElement>(null);
    const background = useRef<HTMLDivElement>(null);
    const location = useRef<HTMLParagraphElement>(null);
    const arrow = useRef<HTMLAnchorElement>(null);
    const title = useRef<HTMLSpanElement>(null);
    const description = useRef<HTMLSpanElement[]>([]);
    description.current = [];

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
                .to(arrow.current, {
                    opacity: 1,
                });
        },
        {
            scope: container,
        },
    );

    const lenis = useLenis();

    const {scrollY} = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 70]);

    return (
        <section ref={container} className={styles.sectionWrapper}>
            {isMobile && (
                <Link href={"/"} className={styles.logo_mobile}>
                    <LogoIcon/>
                </Link>
            )}
            <div className={styles.titleContainer}>
                <p className={clsx(styles.location, {[styles.macOsLocation]: isAppleOS})}>
                    <span className={styles.mask}>
                        <span ref={location} className={styles.text}>
                            {data.location}
                        </span>
                    </span>
                </p>
                <h1 className={clsx(styles.title)}>
                        <span className={styles.mask}>
                            <span ref={title} className={clsx(styles.text, {[styles.macOsTitle]: isAppleOS})}>
                                {data.title}
                            </span>
                        </span>
                </h1>
                <p className={clsx(styles.description, {[styles.macOsDescription]: isAppleOS})}>
                    {data.description.map((item) => (
                        <span key={item} className={styles.mask}>
                            <span ref={addToDescription} className={styles.text}>
                                {item}
                            </span>
                        </span>
                    ))}
                </p>
                <Link
                    ref={arrow}
                    href={"#projects"}
                    onClick={(e) => {
                        e.preventDefault();
                        lenis?.scrollTo("#projects", {offset: 0, lerp: 0.05});
                    }}
                    className={styles.arrow}
                >
                    <Icon width="59" height="67" name="arrow-down"/>
                </Link>
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
                <motion.div ref={background} className={styles.backgroundContainer} style={{y}}>
                    <Image
                        // src={generateImageUrl(homeData.heroBg.data.attributes.url)}
                        src={data?.background}
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