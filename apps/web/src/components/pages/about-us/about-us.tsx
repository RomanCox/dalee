"use client";

import {memo} from "react";

import {TRequestSection} from "@/types/request.type";
import {TAboutCard} from "@/types/about-card.type";
import {AboutUsMobile} from "@/components/pages/about-us/about-us-mobile";
import {AboutUsDesktop} from "@/components/pages/about-us/about-us-desktop";
import {IAboutUsData} from "@/constants/about-us";
import {useMediaQuery} from "@/shared/hooks/use-match-media";

interface AboutUsProps {
    requestSection?: TRequestSection;
    aboutUsCards?: TAboutCard[];
    aboutUsData: IAboutUsData;
}

export const AboutUs = memo(({requestSection, aboutUsCards, aboutUsData}: AboutUsProps) => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            {isMobile ? (
                <AboutUsMobile aboutCards={aboutUsCards} aboutUsData={aboutUsData}/>
            ) : (
                <AboutUsDesktop requestSection={requestSection} aboutUsCards={aboutUsCards} aboutUsData={aboutUsData}/>
            )}
        </>
    )
});

AboutUs.displayName = "AboutUs";