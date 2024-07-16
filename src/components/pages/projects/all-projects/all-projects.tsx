"use client";

import {memo, useEffect, useState} from "react";
import {useWindowWidth} from "@react-hook/window-size";

import {TitleSection} from "@/components/pages/projects/all-projects/title-section/title-section";
import {ProjectsSection} from "@/components/pages/projects/all-projects/projects-section/projects-section";
import {RequestSection} from "@/components/widgets/request-section/request-section";

import {TRequestSection} from "@/types/request.type";

interface AllProjectsProps {
    requestSection?: TRequestSection;
}

export const AllProjects = memo(({requestSection}: AllProjectsProps) => {
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
            <TitleSection isMobile={isMobile}/>
            <ProjectsSection/>
            {!isMobile && <RequestSection requestSection={requestSection}/>}
        </>
    )
});

AllProjects.displayName = "AllProjects";