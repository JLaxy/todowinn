"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import { Project } from "@/types/project";
import { Status } from "@/types/status";
import "@/styles/ui/projects-accordion.css";

export default function ProjectsAccordion({
  fetchTasks,
}: {
  fetchTasks: (p: number) => void;
}) {
  const { userProjects, setSelectedProject, setIsSidebarOpen } =
    useTodowinnContext();

  const handleProjectClick = (project: Project) => {
    setIsSidebarOpen(false);
    setSelectedProject(project);
    fetchTasks(project.project_id);
  };

  // group projects by status
  const groupedProjects: Record<Status, Project[]> = {
    [Status.TODO]: [],
    [Status.IN_PROGRESS]: [],
    [Status.FINISHED]: [],
    [Status.CANCELLED]: [],
  };

  userProjects?.forEach((project) => {
    groupedProjects[project.status].push(project);
  });

  // if no projects at all
  if (!userProjects || userProjects.length === 0) {
    return (
      <div className="projects-list-div text-gray-500 italic p-4">
        No projects available.
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      className="projects-list-div"
      collapsible
      defaultValue={Status.TODO}
    >
      {Object.entries(groupedProjects).map(([status, projects]) => (
        <AccordionItem key={status} value={status}>
          <AccordionTrigger className="accordion-trigger">
            <span className="capitalize">
              {status.replace("_", " ")} ({projects.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="accordion-content">
              {projects.map((project) => (
                <button
                  key={project.project_id}
                  className="project-div"
                  onClick={() => handleProjectClick(project)}
                >
                  <h4 className="project-div-title">{project.name}</h4>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
