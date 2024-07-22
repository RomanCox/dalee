import {memo, useMemo} from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import {TAboutCard} from "@/types/about-card.type";

import "swiper/css";
import {AboutCardMobile} from "@/components/pages/about-us/cards-slider/about-card-mobile";

interface CardsSliderProps {
    aboutCards?: TAboutCard[];
}

export const CardsSlider = memo(({aboutCards}: CardsSliderProps) => {
    const cards = useMemo(() => aboutCards?.filter(card => card.type !== "title"), [aboutCards]);

    return (
        <Swiper
            id={"cards"}
            slidesPerView={"auto"}
            initialSlide={2}
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            lazyPreloadPrevNext={6}
            rewind={true}
            className="about-us-page-swiper"
        >
            {cards?.map(card => (
                <SwiperSlide key={card.id}>
                    <AboutCardMobile item={card} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
});

CardsSlider.displayName = "CardsSlider";