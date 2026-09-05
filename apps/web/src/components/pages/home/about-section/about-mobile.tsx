"use client";

import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { AboutCard } from "@/components/pages/home/about-section/about-card";

import { Text } from "@/shared/ui/text/text";

import { TAboutCard } from "@/types/about-card.type";
import styles from "./about-section.module.scss";
import {Pagination} from "swiper/modules";

export const AboutMobile = memo(
  ({ aboutCards }: { aboutCards: TAboutCard[] }) => {
    aboutCards = aboutCards.filter((item) => item.type !== "title");

    return (
      <>
        <Text
          title={"О НАС"}
          titleTag={"h2"}
          text={
            "в реальность, создавая уникальныеУзнайте, как превращаем идеи Узнайте, как превращаем идеи в реальность, создавая уникальные в реальность, создавая уникальные."
          }
          textTag={"p"}
          className={styles.titleWrapper}
        />
        <Swiper
          slidesPerView={"auto"}
          initialSlide={0}
          spaceBetween={10}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          pagination={true}
          lazyPreloadPrevNext={4}
          rewind={true}
                modules={[Pagination]}
          className="about-us-swiper">
          {aboutCards.map((item, index) => (
            <SwiperSlide key={index}>
              <AboutCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  },
);

AboutMobile.displayName = "AboutMobile";
