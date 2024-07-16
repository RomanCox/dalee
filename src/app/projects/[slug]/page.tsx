import {ProjectDescription} from "@/components/pages/projects/[slug]/projectDescription/project-description";

import { projectData } from "@/constants/project";
import { RequestSectionService } from "@/services/request";

const ProjectPage = async () => {
    const [
        requestSectionResponse,
    ] = await Promise.all([
        RequestSectionService.getAll(),
    ]);

    return (
        <main>
            <ProjectDescription projectData={projectData} requestSection={requestSectionResponse.data.attributes}/>
        </main>
    );
}

export default ProjectPage;