import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectMapper } from './project.mapper';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseProjectDTO } from './dto/response-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all projects of user
  async getAllProjects(member_id: number) {
    return this.databaseService.projects.findMany({
      where: { member_id },
    });
  }

  // Retrieve specific proejct
  async getProject(project_id: number) {
    const project = await this.databaseService.projects.findUnique({
      where: { project_id },
    });

    // Throw exception if it does not exist
    if (!project)
      throw new NotFoundException(
        `Project with id ${project_id} does not exist!`,
      );

    return project;
  }

  // Create project
  async createProject(member_id: number, createProjectDTO: CreateProjectDTO) {
    const project = await this.databaseService.projects.create({
      data: ProjectMapper.toCreateEntity(member_id, createProjectDTO),
    });

    return plainToInstance(ResponseProjectDTO, project, {
      excludeExtraneousValues: true,
    });
  }

  // Update project
  async updateProject(project_id: number, updateProjectDTO: UpdateProjectDTO) {
    // First check if project exists
    const project = await this.getProject(project_id);

    // Copy date finished
    if (project.date_finished)
      updateProjectDTO.dateFinished = project.date_finished;

    const updatedProject = await this.databaseService.projects.update({
      data: ProjectMapper.toUpdateEntity(updateProjectDTO),
      where: { project_id },
    });

    return plainToInstance(ResponseProjectDTO, updatedProject, {
      excludeExtraneousValues: true,
    });
  }
}
