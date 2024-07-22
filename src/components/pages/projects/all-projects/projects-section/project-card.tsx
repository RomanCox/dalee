import {memo, useMemo, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import {useOnScreen} from "@/shared/hooks/use-on-screen";

import {IProject} from "@/components/pages/projects/all-projects/projects-section/projects-section";

import styles from "./project-card.module.scss";

interface ProjectCardProps {
    project: IProject;
    index: number;
    isMobile?: boolean;
}

export const ProjectCard = memo(({project, index, isMobile}: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0,
    };

    const {isIntersecting} = useOnScreen(cardRef, observerOptions);

    const cardMods = {
        [styles.leftCard]: index % 3 === 0,
        [styles.rightCard]: (index + 1) % 3 === 0,
    };

    const glowImageMods = useMemo(() =>
            isMobile ?
                {
                    [styles.activeCard]: isIntersecting,
                } : {
                    [styles.glowImageVisible]: isHovered
                },
        [isHovered, isIntersecting, isMobile]);

    const imageMods = useMemo(() =>
            isMobile ?
                {
                    [styles.activeImage]: isIntersecting,
                } : {},
        [isIntersecting, isMobile]);

    return (
        <div className={clsx(styles.projectCard, cardMods)} ref={cardRef}>
            <Image
                src={project.image}
                alt={project.title}
                className={clsx(styles.glowImage, glowImageMods)}
            />
            <Link
                className={styles.projectCardLink}
                href={"/projects/patriki"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src={project.image} alt={project.title} className={clsx(styles.image, imageMods)}/>
                <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectStatus}>{project.status}</p>
                    <p className={styles.projectYear}>{project.year}</p>
                </div>
            </Link>
        </div>
    )
});

ProjectCard.displayName = "ProjectCard";