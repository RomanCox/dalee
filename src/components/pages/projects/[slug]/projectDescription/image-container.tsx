"use client";

import { memo, MutableRefObject, RefObject, useRef} from "react";
import Image from "next/image";
import gsap from "gsap";

import styles from "./project-description-desktop.module.scss";
import { useGSAP } from '@gsap/react';
import { ISlide } from "@/constants/project";


interface ImageContainerProps {
    mainSlideRef: RefObject<HTMLImageElement>;
    slide: ISlide;
    slideRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    index: number;
    imageContainerRef: RefObject<HTMLDivElement>;
}

export const ImageContainer = memo(({ mainSlideRef, slideRefs, slide, index, imageContainerRef }: ImageContainerProps) => {
    const setImageRef = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        const slideRef = index === 0 ? mainSlideRef.current : slideRefs.current[index - 1];
        if (setImageRef.current) {
            gsap.to(setImageRef.current, {
                scrollTrigger: {
                    trigger: slideRef,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                },
                opacity: 1,
            });
        }
    }, { scope: imageContainerRef });

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