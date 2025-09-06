import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectMapper } from './project.mapper';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all projects of user
  async getAllProjects(member_id: number) {
    return this.databaseService.projects.findMany({
      where: { member_id },
    });
  }

  private async getProject(project_id: number) {
    return this.databaseService.projects.findUniqueOrThrow({
      where: { project_id },
    });
  }

  async createProject(member_id: number, createProjectDTO: CreateProjectDTO) {
    return await this.databaseService.projects.create({
      data: ProjectMapper.toCreateEntity(createProjectDTO, member_id),
    });
  }

  async updateProject(project_id: number, updateProjectDTO: UpdateProjectDTO) {
    // First check if project exists
    const project = await this.getProject(project_id);
    // Copy date finished
    if (project.date_finished)
      updateProjectDTO.dateFinished = project.date_finished;

    return await this.databaseService.projects.update({
      data: ProjectMapper.toUpdateEntity(updateProjectDTO),
      where: { project_id },
    });
  }
}
