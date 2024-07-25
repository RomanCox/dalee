"use client";

import {memo, useEffect, useRef} from "react";
import Image from "next/image";
import gsap from "gsap";

import {ISlide} from "@/constants/project";

import styles from "./project-description-desktop.module.scss";

interface ImageContainerProps {
    slide: ISlide;
    mainSlideRef: HTMLDivElement | null;
    slideRefs: (HTMLDivElement | null)[];
    index: number;
}

export const ImageContainer = memo(({
                                        slide,
                                        mainSlideRef,
                                        slideRefs,
                                        index,
                                    }: ImageContainerProps) => {
    const setImageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.to(setImageRef.current, {
            scrollTrigger: {
                trigger: slideRefs[index - 1],
                start: "top top",
                end: "bottom center",
                scrub: true,
                markers: index === 1,
            },
            opacity: 1,
        });
    }, [index, mainSlideRef, slideRefs]);

    return (
        <div key={index} className={styles.imageContainer} ref={setImageRef}>
            <Image
                src={slide.image}
                alt={"project image"}
                className={styles.image}
                priority
            />
        </div>
    )
});

ImageContainer.displayName = "ImageContainer";