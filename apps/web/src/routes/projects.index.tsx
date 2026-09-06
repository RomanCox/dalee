import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AllProjects } from "@/components/pages/projects/all-projects/all-projects";
import { RequestSectionService } from "@/services/request";
import { TRequestSection } from "@/types/request.type";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [requestSection, setRequestSection] = useState<TRequestSection>();

  useEffect(() => {
    let cancelled = false;

    RequestSectionService.getAll().then((response) => {
      if (cancelled) return;
      setRequestSection(response.data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <AllProjects requestSection={requestSection} />;
}
