import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects = [
    {
      id: 0,
      projectName: 'Zav Product Management System',
      dateCreated: '2024-06-30',
    },
    {
      id: 1,
      projectName: 'Margaux Store Management System',
      dateCreated: '2025-08-30',
    },
    {
      id: 2,
      projectName: 'Disdrive',
      dateCreated: '2025-08-05',
    },
    {
      id: 3,
      projectName: 'Todowinn Project Management System',
      dateCreated: '2025-08-27',
    },
  ];

  // Gets all projects
  getAllProjects() {
    return this.projects;
  }

  // Gets specific project
  getProject(id: number) {
    const project = this.projects.find((project) => project.id === id);

    if (project) return project;

    throw new NotFoundException(`Project with id ${id} not found!`);
  }

  // Creates new project
  createProject(project: { projectName: string; dateCreated: string }) {
    const newProject = {
      id: this.projects.length,
      ...project,
    };

    this.projects.push(newProject);

    return newProject;
  }

  // Update project
  updateProject(
    id: number,
    updatedProject: {
      projectName?: string;
      dateCreated?: string;
    },
  ) {
    // Iterate through projects
    this.projects = this.projects.map((project) => {
      if (project.id === id) {
        // Get old info, then overwrite
        return { ...project, ...updatedProject };
      }
      return project;
    });

    return this.getProject(id);
  }

  // Delete project
  deleteProject(id: number) {
    const deleted = this.getProject(id);

    this.projects = this.projects.filter((project) => project.id !== id);

    return deleted;
  }
}
