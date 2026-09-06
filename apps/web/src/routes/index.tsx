import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { HomePage } from "@/components/pages/home/home";
import { HomeService } from "@/services/home-page";
import { ProjectsService } from "@/services/projects";
import { AboutCardsService } from "@/services/about-cards";
import { RequestSectionService } from "@/services/request";
import { ServicesService } from "@/services/services";
import { CommonService } from "@/services/common";

import { TProject } from "@/types/projects.type";
import { TCommon } from "@/types/common.type";
import { THomePage } from "@/types/home-page.type";
import { TService } from "@/types/service.type";
import { TAboutCard } from "@/types/about-card.type";
import { TRequestSection } from "@/types/request.type";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [commonData, setCommonData] = useState<TCommon>();
  const [homeData, setHomeData] = useState<THomePage>();
  const [servicesCards, setServicesCards] = useState<TService[]>([]);
  const [projects, setProjects] = useState<TProject[]>();
  const [aboutCards, setAboutCards] = useState<TAboutCard[]>();
  const [requestSection, setRequestSection] = useState<TRequestSection>();

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      CommonService.getAll(),
      HomeService.getAll(),
      ServicesService.getAll(),
      ProjectsService.getAll(),
      AboutCardsService.getAll(),
      RequestSectionService.getAll(),
    ]).then(
      ([
        commonResponse,
        homeResponse,
        servicesResponse,
        projectsResponse,
        aboutCardsResponse,
        requestSectionResponse,
      ]) => {
        if (cancelled) return;

        setCommonData(commonResponse.data);
        setHomeData(homeResponse.data);
        setServicesCards(
          [...servicesResponse.data].sort((a, b) => a.position - b.position),
        );

        const transformedProjects: TProject[] = projectsResponse.data
          .filter((project) => !project.onlyShowOnProjectsPage)
          .map((project) => ({
            ...project,
            project_categories: project.project_categories?.map(
              (category) => category.title,
            ),
            teammates: project.teammates?.map((teammate) => teammate.name),
          }))
          .sort((a, b) => a.homePageOrder - b.homePageOrder)
          .map((item) => ({ ...item, id: item.homePageOrder }))
          .map((item) => ({
            ...item,
            id:
              item.title === "Светлоград" || item.title === "Европа Сити"
                ? item.id + 1
                : item.id,
          }));

        transformedProjects.unshift({
          id: 0,
          empty: true,
          title: "Все\nпроекты",
          homePageOrder: 0,
          projectsPageOrder: 0,
          slug: "/",
          sections: [],
        });

        const lastTwoProjects = transformedProjects.slice(-2);
        const remainingProjects = transformedProjects.slice(0, -2);
        setProjects([...lastTwoProjects, ...remainingProjects]);

        setAboutCards(
          aboutCardsResponse.data
            .filter((card) => !card.onlyShowOnAboutUsPage)
            .sort((a, b) => a.homePageOrder - b.homePageOrder)
            .map((card) => ({
              id: card.homePageOrder,
              title: card.title,
              type: card.type,
              description: card.description,
              homePageOrder: card.homePageOrder,
            })),
        );

        setRequestSection(requestSectionResponse.data);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  if (!commonData) return null;

  return (
    <HomePage
      commonData={commonData}
      homeData={homeData}
      servicesCards={servicesCards}
      projects={projects}
      aboutCards={aboutCards}
      requestSection={requestSection}
    />
  );
}
