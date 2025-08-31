import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  // Get all projects
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  // Get specific project
  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProject(+id);
  }

  // Create new project
  @Post()
  createProject(
    @Body()
    project: {
      projectName: string;
      dateCreated: string;
    },
  ) {
    return this.projectService.createProject(project);
  }

  // Update project
  @Patch(':id')
  updateProject(
    @Param('id') id: string,
    @Body()
    updatedInfo: {
      projectName?: string;
      dateCreated?: string;
    },
  ) {
    return this.projectService.updateProject(+id, updatedInfo);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(+id);
  }
}
