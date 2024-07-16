"use client";

import {memo, useEffect, useState} from "react";
import {useWindowWidth} from "@react-hook/window-size";

import {RequestSection} from "@/components/widgets/request-section/request-section";

import {TitleSection} from "@/components/pages/about-us/title-section/title-section";
import {QuoteSection} from "@/components/pages/about-us/quote-section/quote-section";
import {EmployeesSection} from "@/components/pages/about-us/employees-section/employees-section";

import {quoteSectionData} from "@/constants/quote";

import {TRequestSection} from "@/types/request.type";
import {TAboutCard} from "@/types/about-card.type";
import {IAboutUsData} from "@/constants/about-us";



interface AboutUsDesktopProps {
    requestSection?: TRequestSection;
    aboutCards?: TAboutCard[];
    aboutUsData: IAboutUsData;
}

export const AboutUsDesktop = memo(({requestSection, aboutCards, aboutUsData}: AboutUsDesktopProps) => {

    return (
        <>
            <TitleSection aboutCards={aboutCards} aboutUsData={aboutUsData}/>
            <QuoteSection quoteSectionData={quoteSectionData}/>
            <EmployeesSection />
            <RequestSection requestSection={requestSection}/>
        </>
    )
});

AboutUsDesktop.displayName = "AboutUsDesktop";