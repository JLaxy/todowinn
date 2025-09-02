import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Gets all projects
  async getAllProjects() {
    return await this.databaseService.projects.findMany();
  }

  // Gets specific project
  async getProject(id: number) {
    try {
      const retrievedProject =
        await this.databaseService.projects.findUniqueOrThrow({
          where: {
            id,
          },
        });

      return retrievedProject;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025')
        throw new NotFoundException(`project with id ${id} not found!`);
      throw error;
    }
  }

  // Creates new project
  async createProject(createProjectDTO: CreateProjectDTO) {
    return this.databaseService.projects.create({
      data: {
        name: createProjectDTO.name,
        date_created: new Date(createProjectDTO.dateCreated),
      },
    });
  }

  // Update project
  async updateProject(id: number, updateProjectDTO: UpdateProjectDTO) {
    // Iterate through projects
    return this.databaseService.projects.update({
      data: {
        name: updateProjectDTO.name,
        date_created: updateProjectDTO.dateCreated
          ? new Date(updateProjectDTO.dateCreated)
          : new Date(),
      },
      where: {
        id,
      },
    });
  }

  // Delete project
  async deleteProject(id: number) {
    return this.databaseService.projects.delete({
      where: {
        id,
      },
    });
  }
}
