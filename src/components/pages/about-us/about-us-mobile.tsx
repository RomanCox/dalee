import {memo} from "react";
import {TRequestSection} from "@/types/request.type";
import {TAboutCard} from "@/types/about-card.type";
import {TitleSection} from "@/components/pages/about-us/title-section/title-section";
import {CardsSlider} from "@/components/pages/about-us/cards-slider/cards-slider";
import {quoteSectionData} from "@/constants/quote";
import {QuoteSection} from "@/components/pages/about-us/quote-section/quote-section";
import {EmployeesSection} from "@/components/pages/about-us/employees-section/employees-section";

interface AboutUsMobileProps {
    requestSection?: TRequestSection;
    aboutCards?: TAboutCard[];
}

export const AboutUsMobile = memo(({requestSection, aboutCards}: AboutUsMobileProps) => {
    return (
        <>
            <TitleSection aboutCards={aboutCards} isMobile/>
            <CardsSlider aboutCards={aboutCards}/>
            <QuoteSection quoteSectionData={quoteSectionData}/>
            <EmployeesSection isMobile/>
        </>
    )
});

AboutUsMobile.displayName = "AboutUsMobile";