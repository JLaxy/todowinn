import api from "@/lib/axios";
import { Project } from "@/types/project";
import { normalizeApiError } from "@/utils/api-error-normalizer";

// API service for projects
export const projectsService = {
  // Retrieve all projects
  getProjects: async () => {
    try {
      const res = await api.get("/projects");
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  // Create project
  createProject: async (project: Project) => {
    try {
      const res = await api.post(`/projects/`, {
        name: project.name,
        description: project.description,
        dateTarget: project?.date_target,
        remarks: project?.remarks,
      });
      console.log(`successfully created project: ${project.name}`);
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },

  // Update project
  updateProject: async (project: Project) => {
    try {
      const res = await api.patch(`/projects/${project.project_id}`, {
        name: project.name,
        description: project.description,
        dateTarget: project?.date_target,
        remarks: project?.remarks,
        dateFinished: project?.date_finished,
        status: project?.status,
      });
      console.log(`successfully updated project: ${project.name}`);
      return res;
    } catch (error) {
      throw normalizeApiError(error);
    }
  },
};
