import {memo} from "react";
import {AboutCard} from "@/components/pages/home/about-section/about-card";
import {TAboutCard} from "@/types/about-card.type";

export const AboutDesktop = memo(
    ({aboutCards}: { aboutCards: TAboutCard[] }) => {

        return (
            <>
                {aboutCards.map((item, index) => (
                    <AboutCard item={item} key={index}/>
                ))}
            </>
        );
    },
);

AboutDesktop.displayName = "AboutDesktop";
