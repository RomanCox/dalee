"use client";

import {useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useGSAP} from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import {useLenis} from "lenis/react";
import {motion, useScroll, useTransform} from "framer-motion";

import {generateImageUrl, isApple} from "@/utils/helpers";
import Icon from "@/components/ui/icon";

import LogoIcon from "@/components/ui/logo";

import {THomePage} from "@/types/home-page.type";
import {TCommon} from "@/types/common.type";

import styles from "./hero-section.module.scss";

interface HeroSectionProps {
    homeData: THomePage;
    commonData: TCommon;
}

const HeroSection = ({commonData, homeData}: HeroSectionProps) => {
    const [isAppleOS, setIsAppleOS] = useState<boolean>(true);

    useLayoutEffect(() => {
        const value = isApple();
        setIsAppleOS(value);
    }, []);

    const container = useRef(null);
    const background = useRef(null);
    const location = useRef(null);
    const arrow = useRef(null);

    const title = useRef<HTMLSpanElement[]>([]);
    title.current = [];
    const description = useRef<HTMLSpanElement[]>([]);
    description.current = [];

    const addToTitle = (el: HTMLSpanElement) => {
        if (!title.current.includes(el)) {
            title.current.push(el);
        }
    };

    const addToDescription = (el: HTMLSpanElement) => {
        if (!description.current.includes(el)) {
            description.current.push(el);
        }
    };

    // const mm = gsap.matchMedia();
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

            // mm.add("(min-width: 768px)", () => {
            //   gsap.to(image.current, {
            //     scrollTrigger: {
            //       // scrub: true,
            //     },
            //     yPercent: 7,
            //   });
            // });
        },
        {
            scope: container,
        },
    );

    const lenis = useLenis();

    // useEffect(() => {
    //     gsap.registerPlugin(useGSAP, ScrollTrigger);
    // }, []);

    const {scrollY} = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 70]);

    return (
        <section ref={container} className={styles.section}>
            <LogoIcon className={styles.logo_mobile}/>

            <div className={styles.titleContainer}>
                <p className={clsx(styles.location, {[styles.macOsLocation]: isAppleOS})}>
                    <span className={styles.mask}>
                        <span ref={location} className={styles.text}>
                            {commonData.location}
                        </span>
                    </span>
                </p>
                <h1 className={clsx(styles.title)}>
                    {homeData.heroBlock.title.map((item) => (
                        <span key={item.id} className={styles.mask}>
                            <span ref={addToTitle} className={clsx(styles.text, {[styles.macOsTitle]: isAppleOS})}>
                                {item.row}
                            </span>
                        </span>
                    ))}
                </h1>
                <p className={clsx(styles.description, {[styles.macOsDescription]: isAppleOS})}>
                    {homeData.heroBlock.description.map((item) => (
                        <span key={item.id} className={styles.mask}>
                            <span ref={addToDescription} className={styles.text}>
                                {item.row}
                            </span>
                        </span>
                    ))}
                </p>
                <Link
                    ref={arrow}
                    href={"#mission"}
                    onClick={(e) => {
                        e.preventDefault();
                        lenis?.scrollTo("#mission", {offset: -150, lerp: 0.05});
                    }}
                    className={styles.arrow}
                >
                    <Icon width="59" height="67" name="arrow-down"/>
                </Link>
            </div>

            <motion.div ref={background} className={styles.backgroundContainer} style={{ y }}>
                <Image
                    src={generateImageUrl(homeData.heroBlock.background.data.attributes.url)}
                    quality={100}
                    alt="hero background image"
                    fill
                />
            </motion.div>

            <Image
                className={styles.background_mobile}
                src={generateImageUrl(homeData.heroBlock.backgroundMobile.data.attributes.url)}
                quality={100}
                alt="hero mobile background image"
                fill
            />
        </section>
    );
};

export default HeroSection;
