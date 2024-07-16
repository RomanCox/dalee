"use client";

import {memo, useEffect, useState} from "react";
import {useWindowWidth} from "@react-hook/window-size";

import {TRequestSection} from "@/types/request.type";
import {TAboutCard} from "@/types/about-card.type";
import {AboutUsMobile} from "@/components/pages/about-us/about-us-mobile";
import {AboutUsDesktop, IAboutUsData} from "@/components/pages/about-us/about-us-desktop";



interface AboutUsProps {
    requestSection?: TRequestSection;
    aboutCards?: TAboutCard[];
    aboutData: IAboutUsData;
}

export const AboutUs = memo(({requestSection, aboutCards}: AboutUsProps) => {
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
                <AboutUsMobile requestSection={requestSection} aboutCards={aboutCards}/>
            ) : (
                <AboutUsDesktop requestSection={requestSection} aboutCards={aboutCards} />
            )}
        </>
    )
});

AboutUs.displayName = "AboutUs";