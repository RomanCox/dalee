"use client";

import {memo} from "react";

import {
    ProjectDescriptionMobile
} from "@/components/pages/projects/[slug]/projectDescription/project-description-mobile";
import {
    ProjectDescriptionDesktop
} from "@/components/pages/projects/[slug]/projectDescription/project-description-desktop";

import {IProjectData} from "@/constants/project";
import {TRequestSection} from "@/types/request.type";
import { useMediaQuery } from "@/shared/hooks/use-match-media";

interface ProjectDescriptionProps {
    projectData: IProjectData;
    requestSection?: TRequestSection;
}

export const ProjectDescription = memo(({projectData, requestSection}: ProjectDescriptionProps) => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    if (isMobile) {
        return (<ProjectDescriptionMobile projectData={projectData}/>)
    }

    return (
        <ProjectDescriptionDesktop projectData={projectData} requestSection={requestSection}/>
    )
});

ProjectDescription.displayName = "ProjectDescription";