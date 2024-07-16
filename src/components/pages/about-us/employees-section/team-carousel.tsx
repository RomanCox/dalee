import {memo, useEffect, useLayoutEffect, useRef, useState} from "react";

import {IOtherEmployee, SliderTime} from "@/constants/employees";

import styles from "./team-carousel.module.scss";
import Image from "next/image";
import clsx from "clsx";

type CoefficientType = 0 | 1;

interface TeamCarouselProps {
    data: IOtherEmployee[];
}

export const TeamCarousel = memo(({data}: TeamCarouselProps) => {
    const [isMove, setIsMove] = useState<boolean>(false);
    const [offSet, setOffSet] = useState<number>(0);
    const [gap, setGap] = useState<number>(0);
    const [coefficient, setCoefficient] = useState<CoefficientType>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const slides = [...data, ...data];

    useEffect(() => {
        if (isMove) {
            setCoefficient(1);
            setTimeout(() => {
                setIsMove(false);
            }, SliderTime)
        } else {
            setCoefficient(0);
            setIsMove(true);
        }
    }, [isMove]);

    useEffect(() => {
        if (containerRef.current) {
            setOffSet(Math.ceil((containerRef.current.offsetWidth - 50) / 2) + 50 / 2);
        }

        setIsMove(true);
    }, [gap]);
    // }, []);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const computedStyles = window.getComputedStyle(container);
            const gapValue = computedStyles.getPropertyValue('gap');
            setGap(parseFloat(gapValue));
        }
    }, []);

    return (
        <div className={styles.sliderWrapper}>
            <div className={clsx(styles.gradient, styles.left)}/>
            <div className={clsx(styles.gradient, styles.right)}/>
            <div
                className={styles.sliderContainer}
                ref={containerRef}
                style={{
                    // transform: isMove ? `translateX(${offSet * coefficient - offSet}px)` : "none",
                    transform: isMove ? `translateX(${-(offSet * coefficient)}px)` : "none",
                    transition: `transform ${SliderTime}ms linear`
                }}
            >
                {slides.map((slide, index) => (
                    <div key={`${slide.id}-${index}`} className={styles.slideContainer}>
                        <Image src={slide.photo} alt={"employee photo"}/>
                    </div>
                ))}
            </div>
        </div>
    )
});

TeamCarousel.displayName = "TeamCarousel";