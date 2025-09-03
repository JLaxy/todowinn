import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  // Get all projects
  @Get()
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }

  // Get specific project
  @Get(':id')
  async getProject(@Param('id', ParseIntPipe) id: number) {
    // return this.projectService.getProject(id);
    try {
      const retrievedProject = await this.projectService.getProject(id);
      return retrievedProject;
    } catch (error) {
      // else, throw error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025')
        throw new NotFoundException(`project with id ${id} not found!`);
      throw error;
    }
  }

  // Create new project
  @Post()
  async createProject(
    @Body()
    createProjectDTO: CreateProjectDTO,
  ) {
    return await this.projectService.createProject(createProjectDTO);
  }

  // Update project
  @Patch(':id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateProjectDTO: UpdateProjectDTO,
  ) {
    return await this.projectService.updateProject(id, updateProjectDTO);
  }

  @Delete(':id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.deleteProject(id);
    } catch (error) {
      // else, throw error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025')
        throw new NotFoundException(`project with id ${id} not found!`);
      throw error;
    }
  }
}
