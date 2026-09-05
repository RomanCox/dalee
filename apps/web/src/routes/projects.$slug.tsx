import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ProjectDescription } from "@/components/pages/projects/[slug]/projectDescription/project-description";
import { projectData } from "@/constants/project";
import { RequestSectionService } from "@/services/request";
import { TRequestSection } from "@/types/request.type";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPage,
});

function ProjectPage() {
  // NB: как и в исходном Next-приложении, страница пока не фетчит проект по
  // slug — контент захардкожен в constants/project.ts (проект "патрики").
  const [requestSection, setRequestSection] = useState<TRequestSection>();

  useEffect(() => {
    let cancelled = false;

    RequestSectionService.getAll().then((response) => {
      if (cancelled) return;
      setRequestSection(response.data.attributes);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <ProjectDescription projectData={projectData} requestSection={requestSection} />;
}
