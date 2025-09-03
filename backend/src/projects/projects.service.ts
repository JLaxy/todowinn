import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectMapper } from './projects.mapper';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Gets all projects
  async getAllProjects() {
    return await this.databaseService.projects.findMany();
  }

  // Gets specific project
  async getProject(id: number) {
    return await this.databaseService.projects.findUniqueOrThrow({
      where: { id },
    });
  }

  // Creates new project
  async createProject(createProjectDTO: CreateProjectDTO) {
    return await this.databaseService.projects.create({
      // Map DTO values to match prisma entity
      data: ProjectMapper.toCreateEntity(createProjectDTO),
    });
  }

  // Update project
  async updateProject(id: number, updateProjectDTO: UpdateProjectDTO) {
    return await this.databaseService.projects.update({
      data: ProjectMapper.toUpdateEntity(updateProjectDTO),
      where: {
        id,
      },
    });
  }

  // Delete project
  async deleteProject(id: number) {
    return await this.databaseService.projects.delete({
      where: {
        id,
      },
    });
  }
}
