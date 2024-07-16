import {AllProjects} from "@/components/pages/projects/all-projects/all-projects";
import {RequestSectionService} from "@/services/request";

const ProjectsPage = async () => {
    const [
        requestSectionResponse,
    ] = await Promise.all([
        RequestSectionService.getAll(),
    ]);

    return (
        <main>
            <AllProjects
                requestSection={requestSectionResponse.data.attributes}
            />
        </main>
    );
}

export default ProjectsPage;