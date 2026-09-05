import {memo} from "react";
import {TAboutCard} from "@/types/about-card.type";
import {TitleSection} from "@/components/pages/about-us/title-section/title-section";
import {CardsSlider} from "@/components/pages/about-us/cards-slider/cards-slider";
import {quoteSectionData} from "@/constants/quote";
import {QuoteSection} from "@/components/pages/about-us/quote-section/quote-section";
import {EmployeesSection} from "@/components/pages/about-us/employees-section/employees-section";
import {IAboutUsData} from "@/constants/about-us";

interface AboutUsMobileProps {
    aboutCards?: TAboutCard[];
    aboutUsData: IAboutUsData;
}

export const AboutUsMobile = memo(({aboutCards, aboutUsData}: AboutUsMobileProps) => {
    return (
        <>
            <TitleSection aboutUsCards={aboutCards} aboutUsData={aboutUsData} isMobile/>
            <CardsSlider aboutCards={aboutCards}/>
            <QuoteSection quoteSectionData={quoteSectionData}/>
            <EmployeesSection isMobile/>
        </>
    )
});

AboutUsMobile.displayName = "AboutUsMobile";