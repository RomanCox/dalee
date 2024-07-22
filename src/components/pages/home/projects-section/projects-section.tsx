"use client";

import {useWindowSize} from "@react-hook/window-size";
import clsx from "clsx";
import Image from "next/image";
import {memo, MouseEvent, TouchEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,} from "react";
import {Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import {Icon} from "@/shared/ui/icon/icon";
import {Text} from "@/shared/ui/text/text";

import ArrowIcon from "@/assets/icons/common/arrow.svg";

import {TProjectWithId} from "@/types/projects.type";
import {generateImageUrl} from "@/utils/helpers";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./projects-section.module.scss";

interface IWindowSize {
    width: number | null;
    height: number | null;
}

interface ProjectsSectionProps {
    slidesData: TProjectWithId[];
}

const ANIMATION_DURATION = 300;

export const ProjectsSection = memo(({slidesData}: ProjectsSectionProps) => {
    const slidesWithCopiedElements = useMemo(() =>
        slidesData.length <= 7 ?
            [
                slidesData[slidesData.length - 1],
                ...slidesData,
                slidesData[0],
            ] : [
                slidesData[slidesData.length - 1],
                ...slidesData,
            ], [slidesData]);

    const [width, height] = useWindowSize();

    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: null,
        height: 0,
    });

    useLayoutEffect(() => {
        setWindowSize({
            width,
            height,
        });
    }, [height, width]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width,
                height,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [height, width]);

    const [slides, setSlides] = useState<TProjectWithId[]>(slidesWithCopiedElements);
    const [activeSlideId, setActiveSlideId] = useState<number>(1);
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
    const [isAnimation, setIsAnimation] = useState<boolean>(false);
    const [translateX, setTranslateX] = useState<number>(0);
    const [isMoveLeft, setIsMoveLeft] = useState<boolean>(false);
    const [isMoveRight, setIsMoveRight] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [hoveredValue, setHoveredValue] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const intervalIdRef = useRef<number | null>(null);
    const leftBtnRef = useRef<HTMLButtonElement>(null);
    const rightBtnRef = useRef<HTMLButtonElement>(null);

    const startXRef = useRef<number | null>(null);

    const activeSlide = useMemo(() => {
        if (slidesData.find(slide => slide.id === activeSlideId)?.image) {
            return slidesData.find(slide => slide.id === activeSlideId);
        }
        return null;
    }, [activeSlideId, slidesData]);

    const onBtnHover = useCallback(() => {
        setIsHovered((prev) => !prev);
    }, []);

    const goRight = useCallback(() => {
        if (windowSize.width && windowSize.width >= 860) {
            setIsAnimation(true);
            if (slidesData.length <= 7) {
                // setActiveSlide((prev) => (prev < slidesData.length - 1 ? prev + 1 : 0));
                setActiveSlideId((prev) => (prev < slidesData.length - 2 ? prev + 1 : 0));
            } else {
                // setActiveSlide((prev) => (prev < slidesData.length ? prev + 1 : 0));
                setActiveSlideId((prev) => (prev < slidesData.length - 1 ? prev + 1 : 0));
            }
            setTranslateX((prev) => prev - 130);
            setIsBtnDisable(true);

            const rightMove = () => {
                let secondViewedSlide = slides[1];
                if (slidesData.length <= 7) {
                    secondViewedSlide = slides[2];
                }

                const newSlides = [...slides.slice(1), secondViewedSlide];
                setSlides(newSlides);
                setIsBtnDisable(false);
                setIsAnimation(false);
                setTranslateX((prev) => prev + 130);
            };

            setTimeout(rightMove, ANIMATION_DURATION);
        }
    }, [slides, slidesData.length, windowSize.width]);

    const goLeft = useCallback(() => {
        if (windowSize.width && windowSize.width >= 860) {
            setIsAnimation(true);
            if (slidesData.length <= 7) {
                // setActiveSlide((prev) => (prev > 0 ? prev - 1 : slidesData.length - 1));
                setActiveSlideId((prev) => (prev > 0 ? prev - 1 : slidesData.length - 2));
            } else {
                // setActiveSlide((prev) => (prev > 0 ? prev - 1 : slidesData.length));
                setActiveSlideId((prev) => (prev > 0 ? prev - 1 : slidesData.length - 1));
            }
            setTranslateX((prev) => prev + 130);
            setIsBtnDisable(true);

            const leftMove = () => {
                let secondViewedSlide = slides[slides.length - 2];
                if (slidesData.length <= 7) {
                    secondViewedSlide = slides[slides.length - 3];
                }

                const newSlides = [
                    secondViewedSlide,
                    ...slides.slice(0, slides.length - 1),
                ];
                setSlides(newSlides);
                setIsBtnDisable(false);
                setIsAnimation(false);
                setTranslateX((prev) => prev - 130);
            };

            setTimeout(leftMove, ANIMATION_DURATION);
        }
    }, [slides, slidesData.length, windowSize.width]);

    const setSliderIsMoved = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.clientX < hoveredValue) {
                !isDragging && setIsMoveLeft(true);
                !isDragging && setIsMoveRight(false);
            } else if (e.clientX > window.innerWidth - hoveredValue) {
                !isDragging && setIsMoveRight(true);
                !isDragging && setIsMoveLeft(false);
            } else {
                setIsMoveLeft(false);
                setIsMoveRight(false);
            }
        },
        [hoveredValue, isDragging],
    );

    const setSliderIsStopped = useCallback(() => {
        setIsMoveLeft(false);
        setIsMoveRight(false);
    }, []);

    const handleMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (!isBtnDisable) {
                startXRef.current = e.clientX;
                setIsDragging(true);
            }
        },
        [isBtnDisable],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (
                isDragging &&
                startXRef.current !== null &&
                e.clientX > hoveredValue + 30 &&
                e.clientX < window.innerWidth - (hoveredValue + 30)
            ) {
                const moveX = e.clientX - startXRef.current;
                if (moveX > 150) {
                    startXRef.current = e.clientX;
                    goLeft();
                    setIsDragging(false);
                }
                if (moveX < -150) {
                    startXRef.current = e.clientX;
                    goRight();
                    setIsDragging(false);
                }
            }
        },
        [goLeft, goRight, hoveredValue, isDragging],
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        startXRef.current = null;
    }, []);

    const handleTouchStart = useCallback(
        (e: TouchEvent<HTMLDivElement>) => {
            if (!isBtnDisable) {
                startXRef.current = e.touches[0].clientX;
                setIsDragging(true);
            }
        },
        [isBtnDisable],
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent<HTMLDivElement>) => {
            if (
                isDragging &&
                startXRef.current !== null &&
                e.touches[0].clientX > hoveredValue + 30 &&
                e.touches[0].clientX < window.innerWidth - (hoveredValue + 30)
            ) {
                const moveX = e.touches[0].clientX - startXRef.current;
                if (moveX > 150) {
                    startXRef.current = e.touches[0].clientX;
                    goLeft();
                    setIsDragging(false);
                }
                if (moveX < -150) {
                    startXRef.current = e.touches[0].clientX;
                    goRight();
                    setIsDragging(false);
                }
            }
        },
        [goLeft, goRight, hoveredValue, isDragging],
    );

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        startXRef.current = null;
    }, []);

    const firstSlidesCondition = useCallback((id: number) => {
        if (activeSlideId === 0) {
            // return id === slidesData.length || id === activeSlideId + 1;
            return id === slidesData.length - 1 || id === activeSlideId + 1;
        }

        if (activeSlideId === slidesData.length - 1) {
            // return id === slidesData.length - 1 || id === 0;
            return id === slidesData.length - 2 || id === 0;
        }

        return id === activeSlideId - 1 || id === activeSlideId + 1;
    }, [activeSlideId, slidesData.length]);

    const secondSlidesCondition = useCallback((id: number) => {
        if (activeSlideId === 0) {
            // return id === slidesData.length - 1 || id === activeSlideId + 2;
            return id === slidesData.length - 2 || id === activeSlideId + 2;
        }

        if (activeSlideId === 1) {
            // return id === slidesData.length || id === activeSlideId + 2;
            return id === slidesData.length - 1 || id === activeSlideId + 2;
        }

        if (activeSlideId === slidesData.length - 2) {
            // return id === slidesData.length - 3 || id === 0;
            return id === slidesData.length - 4 || id === 0;
        }

        if (activeSlideId === slidesData.length - 1) {
            // return id === slidesData.length - 2 || id === 1;
            return id === slidesData.length - 3 || id === 1;
        }

        return id === activeSlideId - 2 || id === activeSlideId + 2;
    }, [activeSlideId, slidesData.length]);

    const otherSlidesCondition = useCallback((id: number) => {
        if (activeSlideId === 0) {
            return id !== activeSlideId &&
                id !== slidesData.length &&
                id !== slidesData.length - 1 &&
                id !== activeSlideId + 1 &&
                id !== activeSlideId + 2;
        }

        if (activeSlideId === 1) {
            return id !== activeSlideId &&
                id !== slidesData.length &&
                id !== activeSlideId - 1 &&
                id !== activeSlideId + 1 &&
                id !== activeSlideId + 2;
        }

        if (activeSlideId === slidesData.length) {
            return id !== activeSlideId &&
                id !== activeSlideId - 2 &&
                id !== activeSlideId - 1 &&
                id !== 0 &&
                id !== 1;
        }

        return id !== activeSlideId &&
            id !== activeSlideId - 2 &&
            id !== activeSlideId - 1 &&
            id !== activeSlideId + 1 &&
            id !== activeSlideId + 2;
    }, [activeSlideId, slidesData.length]);

    const newSlideMods = useCallback((id: number) => {

        return {
            [styles.otherSlides]: otherSlidesCondition(id),
            [styles.activeSlide]: id === activeSlideId,
            [styles.activeAllProjectsSlide]: activeSlideId === slides.find(slide => slide.empty)?.id,
            [styles.firstSlidesFromActive]: firstSlidesCondition(id),
            [styles.secondSlidesFromActive]: secondSlidesCondition(id),
        }
    }, [activeSlideId, firstSlidesCondition, otherSlidesCondition, secondSlidesCondition, slides])

    useEffect(() => {
        if (isMoveLeft) {
            if (intervalIdRef.current === null) {
                intervalIdRef.current = window.setInterval(() => {
                    leftBtnRef.current?.click();
                }, 5000);
            }
        } else {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }
    }, [isMoveLeft]);

    useEffect(() => {
        if (isMoveRight) {
            if (intervalIdRef.current === null) {
                intervalIdRef.current = window.setInterval(() => {
                    rightBtnRef.current?.click();
                }, 5000);
            }
        } else {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }
    }, [isMoveRight]);

    useEffect(() => {
        if (windowSize.width && windowSize.width >= 1440) {
            setTranslateX(-130);
            setHoveredValue(400);
        } else if (windowSize.width && windowSize.width >= 1280) {
            setTranslateX(-260);
            setHoveredValue(270);
        } else if (windowSize.width && windowSize.width > 860) {
            setTranslateX(-390);
            setHoveredValue(140);
        } else {
            setTranslateX(0);
            setHoveredValue(0);
        }
    }, [windowSize]);

    useEffect(() => {
        return () => {
            intervalIdRef.current = null;
        };
    }, []);

    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                {/*{windowSize.width && windowSize.width > 860 && activeSlide && activeSlide.image && (*/}
                {activeSlide && activeSlide.image && (
                    <Image
                        className={clsx(styles.blurredImage, {
                            [styles.isHoveredBlurredImage]: isHovered,
                        })}
                        src={generateImageUrl(activeSlide.image.data.attributes.url)}
                        alt={activeSlide.title}
                        width={activeSlide.image.data.attributes.width}
                        height={activeSlide.image.data.attributes.height}
                        style={{
                            "--animationDuration": `${ANIMATION_DURATION}ms`,
                        }}
                        priority
                    />
                )}
                <Text
                    className={styles.textWrapper}
                    title={"ПРОЕКТЫ"}
                    titleTag={"h2"}
                    addTitle={`(${slidesData.length.toString().padStart(2, "0")})`}
                    text={"Воплощаем мечты в реальность."}
                />
                <div
                    className={styles.sliderWrapper}
                    onMouseMove={setSliderIsMoved}
                    onMouseLeave={setSliderIsStopped}>
                    {windowSize.width && windowSize.width > 860 ? (
                        <div className={styles.slidesContainer}>
                            <button
                                className={clsx(styles.navBtn, {[styles.leftBtn]: true})}
                                ref={leftBtnRef}
                                onClick={goLeft}
                                onMouseEnter={onBtnHover}
                                onMouseLeave={onBtnHover}
                                disabled={isBtnDisable}>
                                <Icon Svg={ArrowIcon}/>
                            </button>
                            <button
                                className={clsx(styles.navBtn, {[styles.rightBtn]: true})}
                                ref={rightBtnRef}
                                onClick={goRight}
                                onMouseEnter={onBtnHover}
                                onMouseLeave={onBtnHover}
                                disabled={isBtnDisable}>
                                <Icon Svg={ArrowIcon}/>
                            </button>

                            {slides.map((slide, index) => (
                                <div
                                    key={slide.title + index}
                                    // className={clsx(styles.slideWrapper, slideMods(slide.id))}
                                    className={clsx(styles.slideWrapper, newSlideMods(slide.id))}
                                    style={{
                                        transform: `translateX(${translateX}px)`,
                                        transition: isAnimation
                                            ? `all ${ANIMATION_DURATION}ms`
                                            : "none",
                                        "--animationDuration": `${ANIMATION_DURATION}ms`,
                                    }}
                                    onMouseEnter={activeSlideId === slide.id ? (() => {
                                        setIsHovered(true)
                                    }) : undefined}
                                    onMouseLeave={activeSlideId === slide.id ? (() => {
                                        setIsHovered(false)
                                    }) : undefined}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {activeSlideId === slide.id && slide.image && (
                                        <div className={styles.slideTextWrapper}>
                                            <span>{slide.title}</span>
                                            <div className={styles.slideDescription}>
                                                <span>{slide.status}</span>
                                                <span>{slide.location}</span>
                                                {slide.area && (
                                                    <span>
                                                        {`${slide.area} м`}
                                                        <span>2</span>
                                                    </span>
                                                )}
                                                {slide.year && <span>{slide.year}</span>}
                                            </div>
                                        </div>
                                    )}

                                    {slide.image?.data ? (
                                        <Image
                                            className={clsx(styles.image, {
                                                [styles.hoveredBtn]: isHovered,
                                            })}
                                            src={generateImageUrl(slide.image.data.attributes.url)}
                                            alt={slide.title}
                                            width={slide.image.data.attributes.width}
                                            height={slide.image.data.attributes.height}
                                            priority
                                        />
                                    ) : (
                                        <div
                                            className={clsx(styles.slideTextWrapper, {
                                                [styles.allProjectsTextWrapper]: !slide.image,
                                                [styles.allProjectsTextWrapperActiveSlide]:
                                                !slide.image && activeSlideId === slide.id,
                                            })}>
                                            <div>{slide.title}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.slidesContainer}>
                            <Swiper
                                slidesPerView={"auto"}
                                initialSlide={3}
                                spaceBetween={20}
                                centeredSlides={true}
                                loop={true}
                                grabCursor={true}
                                pagination={true}
                                lazyPreloadPrevNext={6}
                                rewind={true}
                                modules={[Pagination]}
                                className="projects-swiper"
                                onSlideChange={(windowSize.width && windowSize.width <= 860) ? ((swiper) => setActiveSlideId(swiper.activeIndex)) : undefined}
                            >
                                {/*{slidesData.map((slide, index) => (*/}
                                {slidesData.map((slide, index) => (
                                    <SwiperSlide key={slide.title + index}>
                                        <div className={styles.slideWrapper}>
                                            {slide.image?.data ? (
                                                <>
                                                    <div className={styles.slideTextWrapper}>
                                                        <span>{slide.title}</span>
                                                        {slide.area && (
                                                            <span>
                                                                {`${slide.area} м`}
                                                                <span>2</span>
                                                            </span>
                                                        )}
                                                        {slide.year && (
                                                            <span>{`/${slide.year.slice(2)}`}</span>
                                                        )}
                                                    </div>
                                                    <Image
                                                        className={clsx(styles.image, {
                                                            [styles.hoveredBtn]: activeSlideId === slide.id,
                                                        })}
                                                        src={generateImageUrl(
                                                            slide.image.data.attributes.url,
                                                        )}
                                                        alt={slide.title}
                                                        width={slide.image.data.attributes.width}
                                                        height={slide.image.data.attributes.height}
                                                        priority
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className={clsx(styles.slideTextWrapper, {
                                                        [styles.allProjectsTextWrapper]: !slide.image,
                                                        [styles.allProjectsTextWrapperActiveSlide]:
                                                        !slide.image && activeSlideId === slide.id,
                                                    })}>
                                                    <div>{slide.title}</div>
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
});

ProjectsSection.displayName = "ProjectsSection";
