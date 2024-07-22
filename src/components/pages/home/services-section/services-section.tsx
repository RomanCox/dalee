"use client";

import {useWindowWidth} from "@react-hook/window-size";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";
import {memo, useCallback, useEffect, useRef, useState} from "react";

import ServiceCard from "./service-card";

import {TService} from "@/types/service.type";

import styles from "./services-section.module.scss";

interface ServicesSectionProps {
    servicesCards: TService[];
}

export const ServicesSection = memo(({servicesCards}: ServicesSectionProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [topOffset, setTopOffset] = useState<number>(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const width = useWindowWidth();

    const content = isMobile
        ? servicesCards.filter((item) => item.id !== 1 && item.id !== 2)
        : servicesCards;

    const cards = useRef<HTMLDivElement[]>([]);

    const addToRefsCard = useCallback((el: HTMLDivElement) => {
        if (el) {
            el.style.height = "21.6rem";
        }
        if (el && !cards.current.includes(el)) {
            cards.current.push(el);
        }
    }, []);

    const {scrollYProgress: scrollYProgress1} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    type ScaleObject = {
        [key: string]: MotionValue<number>;
    };

    const scale: ScaleObject = {
        0: useTransform(scrollYProgress1, [0.29, 1], [1, 0]),
        1: useTransform(scrollYProgress1, [0.37, 1], [1, 0]),
        2: useTransform(scrollYProgress1, [0.5, 1], [1, 0]),
        3: useTransform(scrollYProgress1, [0.62, 1], [1, 0]),
        4: useTransform(scrollYProgress1, [0.75, 1], [1, 0]),
        5: useTransform(scrollYProgress1, [0.9, 1], [1, 0]),
    };

    const scaleLast = useTransform(scrollYProgress1, [0.9, 1], [1, 1]);

    useEffect(() => {
        if (width > 767) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }, [width]);

    useEffect(() => {
        setTimeout(() => {
            const titleWrapper = titleWrapperRef.current;
            if (titleWrapper) {
                const titleHeight = titleWrapper.getBoundingClientRect().height;
                setTopOffset(titleHeight);
            }
        }, 0);
    }, [titleWrapperRef, width]);

    return (
        <section ref={sectionRef} className={styles.section}>
            {isMobile ? (
                <>
                    <div className={styles.titleWrapper} ref={titleWrapperRef}>
                        <h2 className={styles.title}>Услуги</h2>
                    </div>
                    {content.map((item, index) => (
                        <motion.div
                            key={item.id}
                            style={{
                                scale: index === content.length - 1 ? scaleLast : scale[index],
                                position: "sticky",
                                top: `${topOffset}px`,
                                zIndex: index === content.length - 1 ? 1 : 0,
                                willChange: "transform",
                            }}>
                            <ServiceCard
                                ref={addToRefsCard}
                                className={styles.card}
                                item={item}
                                top={topOffset}
                            />
                        </motion.div>
                    ))}
                </>
            ) : (
                content.map((item) => (
                    <ServiceCard key={item.id} className={styles.card} item={item}/>
                ))
            )}
        </section>
    );
});

ServicesSection.displayName = "ServicesSection";
