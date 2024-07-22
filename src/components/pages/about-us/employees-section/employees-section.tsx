"use client"

import {memo, useCallback, useRef, useState} from "react";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";

import Icon from "@/components/ui/icon";
import {EmployeeCard} from "@/components/pages/about-us/employees-section/employee-card";
// import {TeamCarousel} from "@/components/pages/about-us/employees-section/team-carousel";

import {employees, otherEmployees, teamPhotos} from "@/constants/employees";

import styles from "./employees-section.module.scss";
import "swiper/css";
import "swiper/css/autoplay";
import clsx from "clsx";

interface EmployeesSectionProps {
    isMobile?: boolean;
}

export const EmployeesSection = memo(({isMobile}: EmployeesSectionProps) => {
    const [activeSlideId, setActiveSlideId] = useState<number>(0);

    const [prevBtn, setPrevBtn] = useState<HTMLButtonElement | null>(null);
    const [nextBtn, setNextBtn] = useState<HTMLButtonElement | null>(null);
    // @ts-ignore
    const swiperRef = useRef<Swiper | null>(null);

    const goNext = useCallback(() => {
        swiperRef.current?.slideNext()
    }, []);

    const goPrev = useCallback(() => {
        swiperRef.current?.slidePrev()
    }, []);

    if (isMobile) {
        return (
            <section className={styles.sectionWrapper}>
                <Swiper
                    slidesPerView={"auto"}
                    initialSlide={0}
                    spaceBetween={10}
                    centeredSlides={true}
                    grabCursor={true}
                    lazyPreloadPrevNext={7}
                    loopAdditionalSlides={2}
                    className="employee-swiper"
                    onSlideChange={(swiper) => setActiveSlideId(swiper.realIndex)}
                >
                    {employees.map((employee, index) => (
                        <SwiperSlide key={employee.id}>
                            <EmployeeCard employee={employee} activeSlideId={activeSlideId} index={index}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/*<TeamCarousel data={otherEmployees}/>*/}
                <div className={styles.otherEmployeeSliderContainer}>
                    <div className={clsx(styles.gradient, styles.left)}/>
                    <div className={clsx(styles.gradient, styles.right)}/>
                    <Swiper
                        className={"other-employee-swiper"}
                        spaceBetween={12}
                        slidesPerView={"auto"}
                        loop={true}
                        centeredSlides={true}
                        rewind={true}
                        lazyPreloadPrevNext={4}
                        speed={5500}
                        autoplay={{
                            delay: 0,
                        }}
                        modules={[Autoplay]}
                        allowTouchMove={false}
                        simulateTouch={false}
                    >
                        {otherEmployees.map(item => (
                            <SwiperSlide key={item.id} className={styles.otherEmployeeSlide}>
                                <Image src={item.photo} alt={"employee photo"}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.teamSwiper}>
                <button ref={setPrevBtn} className={styles.swiperLeftBtn} onClick={goPrev}>
                    <Icon name={"arrow-down"} width={""} height={""} className={styles.buttonIcon}/>
                </button>
                <button ref={setNextBtn} className={styles.swiperRightBtn} onClick={goNext}>
                    <Icon name={"arrow-down"} width={""} height={""} className={styles.buttonIcon}/>
                </button>
                <Swiper
                    loop={true}
                    spaceBetween={"40"}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: prevBtn,
                        nextEl: nextBtn,
                    }}
                    initialSlide={0}
                    grabCursor={true}
                    centeredSlides={true}
                    className="team-swiper"
                >
                    {teamPhotos.map(({id, photo}) => (
                        <SwiperSlide key={id}>
                            <Image src={photo} alt={"team photo"}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.employeesCardContainer}>
                {employees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee}/>
                ))}
            </div>
            {/*<TeamCarousel data={otherEmployees}/>*/}
            <div className={styles.otherEmployeeSliderContainer}>
                <div className={clsx(styles.gradient, styles.left)}/>
                <div className={clsx(styles.gradient, styles.right)}/>
                <Swiper
                    className={"other-employee-swiper"}
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    loop={true}
                    centeredSlides={true}
                    rewind={true}
                    lazyPreloadPrevNext={4}
                    speed={3500}
                    autoplay={{
                        delay: 0,
                    }}
                    modules={[Autoplay]}
                    allowTouchMove={false}
                    simulateTouch={false}
                >
                    {otherEmployees.map(item => (
                        <SwiperSlide key={item.id} className={styles.otherEmployeeSlide}>
                            <Image src={item.photo} alt={"employee photo"}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
});

EmployeesSection.displayName = "EmployeesSection";