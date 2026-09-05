"use client";

import {memo, useCallback, useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {clsx} from "clsx";
import {Swiper, SwiperSlide} from "swiper/react";

import Icon from "@/components/ui/icon";

import {IProjectData, projectLinksData, SlideType} from "@/constants/project";

import styles from "./project-description-mobile.module.scss";
import "swiper/css";

interface ProjectDescriptionProps {
    projectData: IProjectData;
}

export const ProjectDescriptionMobile = memo(({projectData}: ProjectDescriptionProps) => {
    const [chapter, setChapter] = useState<SlideType>(projectData.otherSlides[0].title);

    const onChooseChapter = useCallback((chapter: SlideType) => {
        setChapter(chapter);
    }, []);

    const slides = useMemo(() => {
        const arr = projectData.otherSlides.filter(slide => slide.title === chapter);

        if (arr.length === 1) {
            return arr;
        }

        return [...arr, ...arr]
    }, [chapter, projectData.otherSlides]);

    const [activeSlideId, setActiveSlideId] = useState<number>(slides.length / 2);

    return (
        <section className={styles.sectionWrapper}>
            <Image
                src={projectData.mainSlide.image}
                alt={"project image"}
                className={styles.mainSlide}
                priority
            />
            <div className={styles.titleBlock}>
                <div className={styles.descriptionMainSlide}>
                    <Image className={styles.titleImage} src={projectData.title} alt={"заголовок"}/>
                    <div className={styles.divider}/>
                    <div className={styles.descriptionsWrapper}>
                        {projectData.mainSlide.description.map(item => (
                            <div key={item.label} className={styles.descriptionContainer}>
                                <p className={styles.label}>{item.label}</p>
                                {Array.isArray(item.value) ? (
                                    <div className={styles.valuesContainer}>
                                        {item.value.map(value => (
                                            <p key={value} className={styles.value}>{value}</p>
                                        ))}
                                    </div>
                                ) : (<p className={styles.value}>{item.value}</p>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.filtersBlock}>
                {projectData.slideTypes.map(filter => (
                    <div
                        key={filter}
                        className={clsx(styles.filter, {[styles.activeFilter]: chapter === filter})}
                        onClick={() => onChooseChapter(filter)}
                    >
                        {filter}
                    </div>
                ))}
            </div>

            <Swiper
                slidesPerView={"auto"}
                initialSlide={slides.length / 2}
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                grabCursor={true}
                lazyPreloadPrevNext={3}
                className="project-page-mobile-swiper"
                onSlideChange={(swiper) => setActiveSlideId(swiper.realIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slideContainer}>
                            <Image src={slide.image} alt={"image"} className={styles.image}/>
                            <p
                                className={clsx(styles.description,
                                    {[styles.visibleDescription]: index === activeSlideId}
                                )}
                            >
                                {slide.description}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.projectLinksContainer}>
                {projectLinksData.map(item => (
                    <Link
                        key={item.title}
                        href={`/projects/${item.slug}`}
                        className={clsx(styles.projectLink, {
                            [styles.prevLink]: item.position === "left",
                            [styles.nextLink]: item.position === "right",
                        })}
                    >
                        <p className={styles.position}>{item.position === "left" ? "предыдущий проект" : "следующий проект"}</p>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.projectLinkTitle}>{item.title}</h3>
                            <Icon name={"arrow-down"} width={"39"} height={"38"}
                                  className={styles.projectLinkIcon}/>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
});

ProjectDescriptionMobile.displayName = "ProjectDescriptionMobile";