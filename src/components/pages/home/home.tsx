"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { memo, useEffect, useState } from "react";

import { AboutSection } from "@/components/pages/home/about-section/about-section";
import HeroSection from "@/components/pages/home/hero-section/hero-section";
import { MissionSection } from "@/components/pages/home/mission-section/mission-section";
import { ProjectsSection } from "@/components/pages/home/projects-section/projects-section";
import { ServicesSection } from "@/components/pages/home/services-section/services-section";
import { RequestSection } from "@/components/widgets/request-section/request-section";

import { missionData } from "@/constants/mission";
import { THomePage } from "@/types/home-page.type";
import { TProjectWithId } from "@/types/projects.type";
import { TAboutCard } from "@/types/about-card.type";
import { TRequestSection } from "@/types/request.type";
import { TService } from "@/types/service.type";
import { TCommon } from "@/types/common.type";

interface HomePageProps {
  commonData: TCommon;
  homeData?: THomePage;
  servicesCards: TService[];
  projects?: TProjectWithId[];
  aboutCards?: TAboutCard[];
  requestSection?: TRequestSection;
}

export const HomePage = memo(
  ({
    commonData,
    homeData,
    servicesCards,
    projects,
    aboutCards,
    requestSection,
  }: HomePageProps) => {
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
        {homeData && (
          <HeroSection commonData={commonData} homeData={homeData} />
        )}
        <MissionSection missionData={missionData} />
        <ServicesSection servicesCards={servicesCards} />
        {projects && <ProjectsSection slidesData={projects} />}
        {aboutCards && <AboutSection aboutCards={aboutCards} />}
        {!isMobile && <RequestSection requestSection={requestSection} />}
      </>
    );
  },
);

HomePage.displayName = "HomePage";
