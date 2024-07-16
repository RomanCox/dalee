"use client";

import {memo, useState} from "react";
import Image, {StaticImageData} from "next/image";
import clsx from "clsx";

import offices from "/public/images/projects/projectsPage/offices.png";
import elizePark from "/public/images/projects/projectsPage/elize-park.png";
import patriki from "/public/images/projects/projectsPage/patriki.png";
import area8 from "/public/images/projects/projectsPage/8-area.png";
import coloredBoulevard from "/public/images/projects/projectsPage/colored-boulevard.png";
import origami from "/public/images/projects/projectsPage/origami.png";
import arctic from "/public/images/projects/projectsPage/arctic.png";
import dune from "/public/images/projects/projectsPage/dune.png";
import svetlograd from "/public/images/projects/projectsPage/svetlograd.png";

import styles from "./projects-section.module.scss";
import Link from "next/link";

enum FilterType {
    ALL = "все проекты",
    ARCHITECTURE = "архитектура",
    INTERIORS = "интерьеры",
}

enum StatusType {
    CONCEPT = "концепция",
    REALIZATION = "реализация",
    IMPLEMENTED = "реализован",
}

interface IProject {
    id: number;
    image: StaticImageData;
    title: string;
    status?: StatusType;
    year?: string;
}

interface ProjectsSectionProps {
    projects?: IProject[];
}

const defaultProjects: IProject[] = [
    {
        id: 0,
        image: offices,
        title: "офисный квартал",
        status: StatusType.CONCEPT,
        year: "2022",
    },
    {
        id: 1,
        image: elizePark,
        title: "жк елизаветинский парк",
        status: StatusType.CONCEPT,
        year: "2022",
    },
    {
        id: 2,
        image: patriki,
        title: "жк патрики",
        status: StatusType.REALIZATION,
        year: "2022",
    },
    {
        id: 3,
        image: area8,
        title: "жк 8 квартал",
        status: StatusType.REALIZATION,
        year: "2022",
    },
    {
        id: 4,
        image: coloredBoulevard,
        title: "жк цветной бульвар",
        status: StatusType.REALIZATION,
        year: "2022",
    },
    {
        id: 5,
        image: origami,
        title: "ним «оригами»",
        status: StatusType.CONCEPT,
        year: "2022",
    },
    {
        id: 6,
        image: arctic,
        title: "ниц «арктика»",
        status: StatusType.CONCEPT,
        year: "2022",
    },
    {
        id: 7,
        image: dune,
        title: "центр помощи «Дюна»",
        status: StatusType.CONCEPT,
        year: "2024",
    },
    {
        id: 8,
        image: svetlograd,
        title: "жк светлоград",
        status: StatusType.IMPLEMENTED,
        year: "2023",
    },
]

export const ProjectsSection = memo(({projects = defaultProjects}: ProjectsSectionProps) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);

    const filters: FilterType[] = Object.values(FilterType);

    return (
        <section className={styles.sectionWrapper} id={"projects"}>
            <div className={styles.filtersWrapper}>
                {filters.map(filter => (
                    <div
                        key={filter}
                        className={clsx(styles.filter, {[styles.activeFilter]: filter === activeFilter})}
                        onClick={() => setActiveFilter(filter)}
                    >
                        <p>{filter}</p>
                    </div>
                ))}
            </div>

            <div className={styles.projectsWrapper}>
                {projects.map((project) => (
                    <Link key={project.id} className={styles.projectCard} href={"/projects/patriki"}>
                        <Image src={project.image} alt={project.title}/>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectStatus}>{project.status}</p>
                            <p className={styles.projectYear}>{project.year}</p>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    )
});

ProjectsSection.displayName = "ProjectsSection";