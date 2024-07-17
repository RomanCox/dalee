"use client";

import {memo, useEffect, useState} from "react";
import {useWindowWidth} from "@react-hook/window-size";

import {TRequestSection} from "@/types/request.type";
import {TAboutCard} from "@/types/about-card.type";
import {AboutUsMobile} from "@/components/pages/about-us/about-us-mobile";
import {AboutUsDesktop} from "@/components/pages/about-us/about-us-desktop";
import {IAboutUsData} from "@/constants/about-us";



interface AboutUsProps {
    requestSection?: TRequestSection;
    aboutUsCards?: TAboutCard[];
    aboutUsData: IAboutUsData;
}

export const AboutUs = memo(({requestSection, aboutUsCards, aboutUsData}: AboutUsProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const width = useWindowWidth();

    useEffect(() => {
        if (width > 767) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }, [width]);

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