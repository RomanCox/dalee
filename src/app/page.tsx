import { HomePage } from "@/components/pages/home/home";

import styles from "./page.module.scss";
import { HomeService } from "@/services/home-page";
import { ProjectsService } from "@/services/projects";
import { AboutCardsService } from "@/services/about-cards";
import { RequestSectionService } from "@/services/request";
import { ServicesService } from "@/services/services";
import { CommonService } from "@/services/common";
import {TProjectWithId} from "@/types/projects.type";

const Home = async () => {
  const [
    commonResponse,
    homeResponse,
    servicesResponse,
    projectsResponse,
    aboutCardsResponse,
    requestSectionResponse,
  ] = await Promise.all([
    CommonService.getAll(),
    HomeService.getAll(),
    ServicesService.getAll(),
    ProjectsService.getAll(),
    AboutCardsService.getAll(),
    RequestSectionService.getAll(),
  ]);

  const servicesCards = servicesResponse.data.map((card) => ({
    id: card.id,
    title: card.attributes.title,
    type: card.attributes.type,
    description: card.attributes.description,
    imageUrl: card.attributes.imageUrl,
  }));

  const transformedProjects: TProjectWithId[] = projectsResponse.data.map(
    (item, index) => ({...item.attributes, id: index + 1}),
  );

  transformedProjects.unshift({
      id: 0,
      empty: true,
      title: "Все\nпроекты",
    });

  const lastTwoProjects = transformedProjects.slice(-2);
  const remainingProjects = transformedProjects.slice(0, -2);
  const finalProjects = [...lastTwoProjects, ...remainingProjects];

  const aboutCards = aboutCardsResponse.data
    .sort((a, b) => a.id - b.id)
    .map((card) => ({
      id: card.id,
      title: card.attributes.title,
      type: card.attributes.type,
      description: card.attributes.description,
    }));

  return (
    <main className={styles.main}>
      <HomePage
        commonData={commonResponse.data.attributes}
        homeData={homeResponse.data.attributes}
        servicesCards={servicesCards}
        projects={finalProjects}
        aboutCards={aboutCards}
        requestSection={requestSectionResponse.data.attributes}
      />
    </main>
  );
};

export default Home;
